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
const registryRoot = join(packageRoot, "registry");
const registryPath = join(registryRoot, "registry.json");
const packageJsonPath = join(packageRoot, "package.json");

const themeStart = "/* aspekt:start */";
const themeEnd = "/* aspekt:end */";

const themeCss = `${themeStart}
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #ffffff;
  --foreground: #171717;
  --background-rgb: 255 255 255;
  --foreground-rgb: 23 23 23;
  --primary: #ff5800;
  --primary-foreground: #ffffff;
  --accent-foreground: #171717;
  color-scheme: light;
}

:root.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --background-rgb: 10 10 10;
  --foreground-rgb: 237 237 237;
  --primary: #ff5800;
  --primary-foreground: #171717;
  --accent-foreground: #ededed;
  color-scheme: dark;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent-foreground: var(--accent-foreground);
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
}
${themeEnd}`;

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function loadRegistry() {
  if (!existsSync(registryPath)) {
    fail(
      "The Aspekt registry is missing. Run `pnpm --filter aspekt registry:sync` in the Aspekt repo before publishing.",
    );
  }

  return readJson(registryPath);
}

function fail(message) {
  console.error(`aspekt: ${message}`);
  process.exit(1);
}

function printHelp() {
  console.log(`aspekt

Usage:
  npx aspekt init [options]
  npx aspekt add <component...> [options]
  npx aspekt list

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

function getPublicItems(registry) {
  return registry.items.filter((item) => item.type !== "registry:base");
}

function getItem(registry, name) {
  return registry.items.find((item) => item.name === name);
}

function listItems(registry) {
  console.log("Available Aspekt components:\n");

  for (const item of getPublicItems(registry)) {
    console.log(`  ${item.name.padEnd(16)} ${item.description ?? ""}`);
  }

  console.log("\nInstall with:");
  console.log("  npx aspekt add button");
}

function getTargetPath(file, options) {
  if (options.path) {
    return join(options.path, basename(file.target));
  }

  return file.target;
}

function collectItems(registry, names) {
  const selectedNames = names.includes("all")
    ? getPublicItems(registry).map((item) => item.name)
    : names;

  const selectedItems = selectedNames.map((name) => {
    const item = getItem(registry, name);
    if (!item) {
      const available = getPublicItems(registry)
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

function addComponents(registry, names, options) {
  const requestedNames = options.all ? ["all"] : names;

  if (requestedNames.length === 0) {
    fail("Pass at least one component name, for example `npx aspekt add button`.");
  }

  const cwd = resolve(options.cwd);
  ensureProject(cwd, options);

  const { dependencies, files, items } = collectItems(registry, requestedNames);
  const writes = files.map((file) => {
    const sourcePath = join(registryRoot, file.source);
    const target = getTargetPath(file, options);
    const targetPath = resolve(cwd, target);

    if (!existsSync(sourcePath)) {
      fail(`Registry source file is missing: ${file.source}.`);
    }

    return {
      sourcePath,
      target,
      targetPath,
    };
  });

  const existingTargets = writes
    .filter((write) => existsSync(write.targetPath))
    .map((write) => write.target);

  if (options.dryRun) {
    console.log("Would add:");
    for (const item of items) console.log(`  ${item.name}`);
    console.log("\nWould write:");
    for (const write of writes) {
      const suffix = existsSync(write.targetPath) ? " (exists)" : "";
      console.log(`  ${write.target}${suffix}`);
    }
    if (dependencies.length > 0) {
      console.log("\nWould install:");
      console.log(`  ${dependencies.join(" ")}`);
    }
    return;
  }

  if (existingTargets.length > 0 && !options.force) {
    fail(
      `Refusing to overwrite existing files: ${existingTargets.join(
        ", ",
      )}. Re-run with --force to overwrite.`,
    );
  }

  for (const write of writes) {
    mkdirSync(dirname(write.targetPath), { recursive: true });
    writeFileSync(write.targetPath, readFileSync(write.sourcePath, "utf8"));
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

function initProject(registry, options) {
  const cwd = resolve(options.cwd);
  ensureProject(cwd, options);

  const targetDir = resolve(cwd, options.path ?? "components/aspekt");
  const cssPath = findCssFile(cwd, options.css);
  const baseItem = getItem(registry, "aspekt-ui");
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
  console.log("  npx aspekt add button");
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

  const registry = loadRegistry();

  if (command === "list") {
    listItems(registry);
  } else if (command === "add") {
    addComponents(registry, args, options);
  } else if (command === "init") {
    initProject(registry, options);
  } else {
    fail(`Unknown command "${command}". Run \`npx aspekt --help\`.`);
  }
}

main();
