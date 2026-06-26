#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const packageRoot = dirname(fileURLToPath(import.meta.url));
const templatesRoot = join(packageRoot, "templates");
const manifestPath = join(templatesRoot, "manifest.json");
const themeCssPath = join(templatesRoot, "theme.css");
const packageJsonPath = join(packageRoot, "package.json");
const statePath = ".aspekt/components.json";

const themeStart = "/* aspekt:start */";
const themeEnd = "/* aspekt:end */";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function loadManifest() {
  if (!existsSync(manifestPath)) {
    fail(
      "The Aspekt templates are missing. Run `pnpm --filter @aspekt/ui templates:sync` in the Aspekt repo before publishing.",
    );
  }

  return readJson(manifestPath);
}

function loadThemeCss() {
  if (!existsSync(themeCssPath)) {
    fail(
      "The Aspekt theme template is missing. Run `pnpm --filter @aspekt/ui templates:sync` in the Aspekt repo before publishing.",
    );
  }

  return readFileSync(themeCssPath, "utf8").trimEnd();
}

function fail(message) {
  console.error(`aspekt: ${message}`);
  process.exit(1);
}

function printHelp() {
  console.log(`aspekt

Usage:
  npx @aspekt/ui init [options]
  npx @aspekt/ui add <component...> [options]
  npx @aspekt/ui update [component...] [options]
  npx @aspekt/ui list

Commands:
  init                 Add Aspekt theme tokens and install shared dependencies.
  add                  Copy one or more components into your project.
  update               Detect installed components and replace outdated templates.
  list                 Show available components.

Options:
  --cwd <path>         Project root. Defaults to the current directory.
  --path <path>        Component output directory. Defaults to components/aspekt.
  --css <path>         CSS file to update during init.
  --all                Add all components.
  -f, --force          Overwrite existing files.
  -y, --yes            Skip confirmation prompts.
  --dry-run            Print actions without writing files or installing deps.
  --no-install         Skip installing component dependencies.
  -h, --help           Show help.
  -v, --version        Show version.
`);
}

function parseArgv(argv) {
  const [command, ...rest] = argv;
  const args = [];
  const options = {
    cwd: process.cwd(),
    css: undefined,
    dryRun: false,
    force: false,
    install: true,
    path: undefined,
    yes: false,
  };

  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index];

    if (value === "--cwd") {
      options.cwd = resolve(rest[++index] ?? fail("Missing value for --cwd."));
    } else if (value === "--path") {
      options.path = rest[++index] ?? fail("Missing value for --path.");
    } else if (value === "--css") {
      options.css = rest[++index] ?? fail("Missing value for --css.");
    } else if (value === "--all") {
      options.all = true;
    } else if (value === "--dry-run") {
      options.dryRun = true;
    } else if (value === "--no-install") {
      options.install = false;
    } else if (value === "--force" || value === "-f") {
      options.force = true;
    } else if (value === "--yes" || value === "-y") {
      options.yes = true;
    } else if (value === "--help" || value === "-h") {
      options.help = true;
    } else if (value === "--version" || value === "-v") {
      options.version = true;
    } else if (value.startsWith("-")) {
      fail(`Unknown option ${value}.`);
    } else {
      args.push(value);
    }
  }

  return { args, command, options };
}

function getVersion() {
  return readJson(packageJsonPath).version;
}

function hashContent(content) {
  return `sha256-${createHash("sha256").update(content).digest("hex")}`;
}

function getStateFilePath(cwd) {
  return resolve(cwd, statePath);
}

function loadState(cwd) {
  const path = getStateFilePath(cwd);

  if (!existsSync(path)) {
    return {
      components: {},
      path: "components/aspekt",
      version: getVersion(),
    };
  }

  const state = readJson(path);

  return {
    components: state.components ?? {},
    path: state.path ?? "components/aspekt",
    version: state.version ?? getVersion(),
  };
}

function saveState(cwd, state, options) {
  if (options.dryRun) return;

  const path = getStateFilePath(cwd);
  const next = {
    ...state,
    version: getVersion(),
  };

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(next, null, 2)}\n`);
}

function getPublicItems(manifest) {
  return manifest.items.filter((item) => item.kind !== "base");
}

function getItem(manifest, name) {
  return manifest.items.find((item) => item.name === name);
}

function listItems(manifest) {
  console.log("Available Aspekt components:\n");

  for (const item of getPublicItems(manifest)) {
    console.log(`  ${item.name.padEnd(16)} ${item.description ?? ""}`);
  }

  console.log("\nInstall with:");
  console.log("  npx @aspekt/ui add button");
}

function getTargetPath(file, options) {
  if (options.path) {
    return join(options.path, basename(file.target));
  }

  return file.target;
}

function getTemplate(file) {
  const sourcePath = join(templatesRoot, file.source);

  if (!existsSync(sourcePath)) {
    fail(`Template source file is missing: ${file.source}.`);
  }

  const content = readFileSync(sourcePath, "utf8");

  return {
    content,
    hash: file.hash ?? hashContent(content),
    sourcePath,
  };
}

function collectItemFiles(item, options) {
  return (item.files ?? []).map((file) => {
    const template = getTemplate(file);
    const target = getTargetPath(file, options);

    return {
      hash: template.hash,
      source: file.source,
      sourceContent: template.content,
      sourcePath: template.sourcePath,
      target,
      targetPath: resolve(options.cwd, target),
    };
  });
}

function collectItems(manifest, names) {
  const selectedNames = names.includes("all")
    ? getPublicItems(manifest).map((item) => item.name)
    : names;

  const selectedItems = selectedNames.map((name) => {
    const item = getItem(manifest, name);
    if (!item) {
      const available = getPublicItems(manifest)
        .map((publicItem) => publicItem.name)
        .join(", ");
      fail(`Unknown component "${name}". Available components: ${available}.`);
    }

    return item;
  });

  const files = new Map();
  const dependencies = new Set();

  for (const item of selectedItems) {
    for (const dependency of item.dependencies ?? []) {
      dependencies.add(dependency);
    }

    for (const file of item.files ?? []) {
      files.set(file.target, file);
    }
  }

  return {
    dependencies: [...dependencies],
    files: [...files.values()],
    items: selectedItems,
  };
}

function ensureProject(cwd, options) {
  if (!existsSync(join(cwd, "package.json")) && options.install) {
    fail(
      "No package.json found. Run this from your project root, pass --cwd, or use --no-install.",
    );
  }
}

function rememberInstalledItems(cwd, items, options) {
  const state = loadState(cwd);

  state.path = options.path ?? state.path ?? "components/aspekt";

  for (const item of items) {
    const files = collectItemFiles(item, { ...options, cwd });
    const fileState = {};

    for (const file of files) {
      fileState[file.target] = {
        hash: file.hash,
        source: file.source,
      };
    }

    state.components[item.name] = {
      files: fileState,
      version: getVersion(),
    };
  }

  saveState(cwd, state, options);
}

function addComponents(manifest, names, options) {
  const requestedNames = options.all ? ["all"] : names;

  if (requestedNames.length === 0) {
    fail(
      "Pass at least one component name, for example `npx @aspekt/ui add button`.",
    );
  }

  const cwd = resolve(options.cwd);
  ensureProject(cwd, options);

  const { dependencies, files, items } = collectItems(manifest, requestedNames);
  const writes = files.map((file) => {
    const target = getTargetPath(file, options);
    const targetPath = resolve(cwd, target);
    const template = getTemplate(file);
    const existingContent = existsSync(targetPath)
      ? readFileSync(targetPath, "utf8")
      : undefined;

    return {
      existingContent,
      hash: template.hash,
      isChanged: existingContent !== undefined && existingContent !== template.content,
      isUnchanged: existingContent === template.content,
      source: file.source,
      sourceContent: template.content,
      sourcePath: template.sourcePath,
      target,
      targetPath,
    };
  });

  const changedTargets = writes
    .filter((write) => write.isChanged)
    .map((write) => write.target);

  if (options.dryRun) {
    console.log("Would add:");
    for (const item of items) console.log(`  ${item.name}`);
    console.log("\nWould write:");
    for (const write of writes) {
      const suffix = write.isUnchanged
        ? " (exists, unchanged)"
        : write.isChanged
          ? options.force
            ? " (exists, would overwrite)"
            : " (exists, differs)"
          : "";
      console.log(`  ${write.target}${suffix}`);
    }
    if (dependencies.length > 0) {
      console.log("\nWould install:");
      console.log(`  ${dependencies.join(" ")}`);
    }
    return;
  }

  if (changedTargets.length > 0 && !options.force) {
    fail(
      `Refusing to overwrite changed files: ${changedTargets.join(
        ", ",
      )}. Re-run with --force to overwrite.`,
    );
  }

  for (const write of writes) {
    if (write.isUnchanged) continue;

    mkdirSync(dirname(write.targetPath), { recursive: true });
    writeFileSync(write.targetPath, write.sourceContent);
  }

  rememberInstalledItems(cwd, items, options);

  console.log(
    `Added ${items.map((item) => item.name).join(", ")} to ${cwd}.`,
  );

  if (dependencies.length > 0) {
    installDependencies(cwd, dependencies, options);
  }
}

function findCssFile(cwd, requestedPath) {
  if (requestedPath) return resolve(cwd, requestedPath);

  const candidates = [
    "app/globals.css",
    "src/app/globals.css",
    "src/index.css",
    "src/globals.css",
    "src/styles.css",
    "styles/globals.css",
    "app.css",
  ];

  for (const candidate of candidates) {
    const path = resolve(cwd, candidate);
    if (existsSync(path)) return path;
  }

  return resolve(cwd, "src/index.css");
}

function initProject(manifest, options) {
  const cwd = resolve(options.cwd);
  ensureProject(cwd, options);

  const targetDir = resolve(cwd, options.path ?? "components/aspekt");
  const cssPath = findCssFile(cwd, options.css);
  const baseItem = getItem(manifest, "aspekt-ui");
  const dependencies = baseItem?.dependencies ?? [];

  if (options.dryRun) {
    console.log(`Would create ${targetDir}`);
    console.log(`Would update ${cssPath}`);
    if (dependencies.length > 0) {
      console.log(`Would install ${dependencies.join(" ")}`);
    }
    return;
  }

  mkdirSync(targetDir, { recursive: true });
  updateCssFile(cssPath);
  console.log(`Initialized Aspekt in ${cwd}.`);

  if (dependencies.length > 0) {
    installDependencies(cwd, dependencies, options);
  }

  console.log("\nNext:");
  console.log("  npx @aspekt/ui add button");
}

function updateCssFile(cssPath) {
  const fileExists = existsSync(cssPath);
  const current = fileExists ? readFileSync(cssPath, "utf8") : "";
  const themeCss = loadThemeCss();

  if (current.includes(themeStart)) {
    const themeBlockPattern = new RegExp(
      `${escapeRegExp(themeStart)}[\\s\\S]*?${escapeRegExp(themeEnd)}`,
    );

    if (!themeBlockPattern.test(current)) {
      fail(`Found ${themeStart} in ${cssPath}, but ${themeEnd} is missing.`);
    }

    const next = current.replace(themeBlockPattern, themeCss);

    writeFileSync(cssPath, next.endsWith("\n") ? next : `${next}\n`);
    console.log(`Updated Aspekt theme tokens in ${cssPath}.`);
    return;
  }

  const hasTailwindImport = /@import\s+["']tailwindcss["']/.test(current);
  const hasTailwindDirectives = /@tailwind\s+(base|components|utilities)/.test(
    current,
  );
  const needsTailwindImport = !hasTailwindImport && !hasTailwindDirectives;
  const prefix = needsTailwindImport ? '@import "tailwindcss";\n\n' : "";
  const body = current.trimEnd();
  const next = `${prefix}${body}${body ? "\n\n" : ""}${themeCss}\n`;

  mkdirSync(dirname(cssPath), { recursive: true });
  writeFileSync(cssPath, next);
  console.log(`Updated ${cssPath}.`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getInstalledDependencies(cwd) {
  const packageJson = readJson(join(cwd, "package.json"));
  return new Set([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ]);
}

function detectPackageManager(cwd) {
  if (existsSync(join(cwd, "pnpm-lock.yaml")) || existsSync(join(cwd, "pnpm-workspace.yaml"))) {
    return { args: ["add"], command: "pnpm", name: "pnpm" };
  }

  if (existsSync(join(cwd, "yarn.lock"))) {
    return { args: ["add"], command: "yarn", name: "yarn" };
  }

  if (existsSync(join(cwd, "bun.lock")) || existsSync(join(cwd, "bun.lockb"))) {
    return { args: ["add"], command: "bun", name: "bun" };
  }

  return { args: ["install"], command: "npm", name: "npm" };
}

function installDependencies(cwd, dependencies, options) {
  if (!options.install) return;

  const installed = getInstalledDependencies(cwd);
  const missing = dependencies.filter((dependency) => !installed.has(dependency));

  if (missing.length === 0) {
    console.log("Dependencies are already installed.");
    return;
  }

  const packageManager = detectPackageManager(cwd);
  console.log(`Installing ${missing.join(", ")} with ${packageManager.name}...`);

  const result = spawnSync(
    packageManager.command,
    [...packageManager.args, ...missing],
    {
      cwd,
      stdio: "inherit",
    },
  );

  if (result.status !== 0) {
    fail(
      `Dependency installation failed. Install manually: ${missing.join(" ")}`,
    );
  }
}

function getUpdateItems(manifest, names, options, cwd, state) {
  const publicItems = getPublicItems(manifest);
  const publicNames = new Set(publicItems.map((item) => item.name));

  if (options.all) {
    return publicItems;
  }

  if (names.length > 0) {
    return names.map((name) => {
      const item = getItem(manifest, name);

      if (!item || item.kind === "base") {
        const available = [...publicNames].join(", ");
        fail(`Unknown component "${name}". Available components: ${available}.`);
      }

      return item;
    });
  }

  const detectedNames = new Set(
    Object.keys(state.components).filter((name) => publicNames.has(name)),
  );

  for (const item of publicItems) {
    const primaryFile = item.files?.[0];
    if (!primaryFile) continue;

    const primaryTarget = resolve(cwd, getTargetPath(primaryFile, options));
    if (existsSync(primaryTarget)) {
      detectedNames.add(item.name);
    }
  }

  return publicItems.filter((item) => detectedNames.has(item.name));
}

function analyzeUpdateItem(item, state, options, cwd) {
  const componentState = state.components[item.name];
  const hasTrackedState = Boolean(componentState);
  const primaryFile = item.files?.[0];
  const hasLegacyFile =
    primaryFile &&
    existsSync(resolve(cwd, getTargetPath(primaryFile, options))) &&
    !hasTrackedState;

  if (!hasTrackedState && !hasLegacyFile) {
    return {
      item,
      needsUpdate: false,
      status: "not installed",
      writes: [],
    };
  }

  const files = collectItemFiles(item, { ...options, cwd });
  const writes = [];
  let hasLocalChanges = false;
  let hasLegacyFiles = hasLegacyFile;
  let hasMissingFiles = false;
  let hasNewFiles = false;
  let hasOutdatedFiles = false;
  let hasTrackOnlyFiles = false;

  for (const file of files) {
    const recorded = componentState?.files?.[file.target];
    const exists = existsSync(file.targetPath);
    const currentContent = exists ? readFileSync(file.targetPath, "utf8") : undefined;
    const currentHash = currentContent === undefined ? undefined : hashContent(currentContent);
    const isAlreadyLatest = Boolean(exists && currentHash === file.hash);
    const isLocalChange = Boolean(
      recorded?.hash && exists && currentHash !== recorded.hash && !isAlreadyLatest,
    );
    const isOutdated = Boolean(recorded?.hash && recorded.hash !== file.hash);
    const isTrackedMissing = Boolean(recorded?.hash && !exists);
    const isNewFile = hasTrackedState && !recorded?.hash && !exists;
    const isLegacyDifferent = Boolean(!recorded?.hash && exists && currentHash !== file.hash);
    const isTrackOnly = Boolean(
      (!recorded?.hash && isAlreadyLatest) || (isOutdated && isAlreadyLatest),
    );
    const needsWrite =
      isTrackedMissing ||
      isNewFile ||
      (isOutdated && !isAlreadyLatest) ||
      isLegacyDifferent;

    hasLocalChanges ||= isLocalChange && isOutdated;
    hasMissingFiles ||= isTrackedMissing;
    hasNewFiles ||= isNewFile;
    hasOutdatedFiles ||= (isOutdated && !isAlreadyLatest) || isLegacyDifferent;
    hasTrackOnlyFiles ||= isTrackOnly;

    if (needsWrite) {
      writes.push({
        ...file,
        currentHash,
        isLegacyDifferent,
        isLocalChange,
        isNewFile,
        isOutdated,
        isTrackedMissing,
      });
    }
  }

  const needsUpdate = writes.length > 0;
  const needsTracking = hasTrackOnlyFiles || needsUpdate;
  const status = hasLocalChanges
    ? "local changes"
    : hasLegacyFiles
      ? "legacy install"
      : hasMissingFiles
        ? "missing files"
        : hasNewFiles
          ? "new files"
          : hasOutdatedFiles
            ? "update available"
            : needsTracking
              ? "tracking metadata"
              : "current";

  return {
    hasLocalChanges,
    hasLegacyFiles,
    item,
    needsTracking,
    needsUpdate,
    status,
    writes,
  };
}

function printUpdatePlan(analyses, options) {
  const actionable = analyses.filter((analysis) => analysis.needsUpdate);

  if (actionable.length === 0) {
    console.log("All detected Aspekt components are current.");
    return;
  }

  console.log(options.dryRun ? "Would update:" : "Update available:");

  for (const analysis of actionable) {
    console.log(`  ${analysis.item.name.padEnd(16)} ${analysis.status}`);
    for (const write of analysis.writes) {
      const suffix = write.isLocalChange
        ? " (modified locally)"
        : write.isTrackedMissing
          ? " (missing)"
          : write.isNewFile
            ? " (new)"
            : write.isLegacyDifferent
              ? " (legacy)"
              : "";
      console.log(`    ${write.target}${suffix}`);
    }
  }
}

async function confirmUpdate(analyses, options) {
  if (options.dryRun || options.yes) return true;

  const actionable = analyses.filter((analysis) => analysis.needsUpdate);
  if (actionable.length === 0) return false;

  const risky = actionable.some(
    (analysis) => analysis.hasLocalChanges || analysis.hasLegacyFiles,
  );
  const prompt = risky
    ? "This may overwrite locally edited or legacy-detected files. Continue? [y/N] "
    : "Update these components? [y/N] ";

  if (!process.stdin.isTTY) {
    fail("Update requires confirmation. Re-run with --yes to continue non-interactively.");
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const answer = await rl.question(prompt);
    return /^(y|yes)$/i.test(answer.trim());
  } finally {
    rl.close();
  }
}

function rememberUpdatedItems(cwd, analyses, options) {
  const state = loadState(cwd);
  state.path = options.path ?? state.path ?? "components/aspekt";

  for (const analysis of analyses) {
    if (!analysis.needsUpdate && !analysis.needsTracking) continue;

    const files = collectItemFiles(analysis.item, { ...options, cwd });
    const fileState = {};

    for (const file of files) {
      fileState[file.target] = {
        hash: file.hash,
        source: file.source,
      };
    }

    state.components[analysis.item.name] = {
      files: fileState,
      version: getVersion(),
    };
  }

  saveState(cwd, state, options);
}

async function updateComponents(manifest, names, options) {
  const cwd = resolve(options.cwd);
  ensureProject(cwd, options);

  const state = loadState(cwd);
  const items = getUpdateItems(manifest, names, options, cwd, state);

  if (items.length === 0) {
    console.log("No Aspekt components detected.");
    return;
  }

  const analyses = items.map((item) => analyzeUpdateItem(item, state, options, cwd));
  const installedAnalyses = analyses.filter(
    (analysis) => analysis.status !== "not installed",
  );
  const actionable = analyses.filter((analysis) => analysis.needsUpdate);
  const dependencies = new Set();

  if (installedAnalyses.length === 0) {
    console.log(
      names.length > 0 || options.all
        ? "No selected Aspekt components are installed."
        : "No Aspekt components detected.",
    );
    return;
  }

  printUpdatePlan(analyses, options);

  if (options.dryRun) {
    for (const analysis of actionable) {
      for (const dependency of analysis.item.dependencies ?? []) {
        dependencies.add(dependency);
      }
    }

    if (dependencies.size > 0) {
      console.log("\nWould install:");
      console.log(`  ${[...dependencies].join(" ")}`);
    }

    return;
  }

  if (actionable.length === 0) {
    rememberUpdatedItems(cwd, analyses, options);
    return;
  }

  const shouldUpdate = await confirmUpdate(analyses, options);
  if (!shouldUpdate) {
    console.log("Update cancelled.");
    return;
  }

  for (const analysis of actionable) {
    for (const write of analysis.writes) {
      mkdirSync(dirname(write.targetPath), { recursive: true });
      writeFileSync(write.targetPath, write.sourceContent);
    }

    for (const dependency of analysis.item.dependencies ?? []) {
      dependencies.add(dependency);
    }
  }

  rememberUpdatedItems(cwd, analyses, options);

  console.log(
    `Updated ${actionable.map((analysis) => analysis.item.name).join(", ")} in ${cwd}.`,
  );

  if (dependencies.size > 0) {
    installDependencies(cwd, [...dependencies], options);
  }
}

async function main() {
  const { args, command, options } = parseArgv(process.argv.slice(2));

  if (
    !command ||
    options.help ||
    command === "help" ||
    command === "--help" ||
    command === "-h"
  ) {
    printHelp();
    return;
  }

  if (
    options.version ||
    command === "version" ||
    command === "--version" ||
    command === "-v"
  ) {
    console.log(getVersion());
    return;
  }

  const manifest = loadManifest();

  if (command === "list") {
    listItems(manifest);
  } else if (command === "add") {
    addComponents(manifest, args, options);
  } else if (command === "update") {
    await updateComponents(manifest, args, options);
  } else if (command === "init") {
    initProject(manifest, options);
  } else {
    fail(`Unknown command "${command}". Run \`npx @aspekt/ui --help\`.`);
  }
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
