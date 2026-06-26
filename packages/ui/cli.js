#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = dirname(fileURLToPath(import.meta.url));
const templatesRoot = join(packageRoot, "templates");
const manifestPath = join(templatesRoot, "manifest.json");
const themeCssPath = join(templatesRoot, "theme.css");
const packageJsonPath = join(packageRoot, "package.json");

const themeStart = "/* aspekt:start */";

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
  npx @aspekt/ui list

Commands:
  init                 Add Aspekt theme tokens and install shared dependencies.
  add                  Copy one or more components into your project.
  list                 Show available components.

Options:
  --cwd <path>         Project root. Defaults to the current directory.
  --path <path>        Component output directory. Defaults to components/aspekt.
  --css <path>         CSS file to update during init.
  --all                Add all components.
  -f, --force          Overwrite existing files.
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
    const sourcePath = join(templatesRoot, file.source);
    const target = getTargetPath(file, options);
    const targetPath = resolve(cwd, target);

    if (!existsSync(sourcePath)) {
      fail(`Template source file is missing: ${file.source}.`);
    }

    const sourceContent = readFileSync(sourcePath, "utf8");
    const existingContent = existsSync(targetPath)
      ? readFileSync(targetPath, "utf8")
      : undefined;

    return {
      existingContent,
      isChanged: existingContent !== undefined && existingContent !== sourceContent,
      isUnchanged: existingContent === sourceContent,
      sourceContent,
      sourcePath,
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

  if (current.includes(themeStart)) {
    console.log(`Theme tokens already exist in ${cssPath}.`);
    return;
  }

  const hasTailwindImport = /@import\s+["']tailwindcss["']/.test(current);
  const hasTailwindDirectives = /@tailwind\s+(base|components|utilities)/.test(
    current,
  );
  const needsTailwindImport = !hasTailwindImport && !hasTailwindDirectives;
  const prefix = needsTailwindImport ? '@import "tailwindcss";\n\n' : "";
  const themeCss = loadThemeCss();
  const body = current.trimEnd();
  const next = `${prefix}${body}${body ? "\n\n" : ""}${themeCss}\n`;

  mkdirSync(dirname(cssPath), { recursive: true });
  writeFileSync(cssPath, next);
  console.log(`Updated ${cssPath}.`);
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

function main() {
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
  } else if (command === "init") {
    initProject(manifest, options);
  } else {
    fail(`Unknown command "${command}". Run \`npx @aspekt/ui --help\`.`);
  }
}

main();
