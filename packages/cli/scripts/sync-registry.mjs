#!/usr/bin/env node

import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(scriptDir, "..");
const repoRoot = join(cliRoot, "..", "..");
const sourceRegistryPath = join(repoRoot, "apps", "registry.json");
const outputRegistryRoot = join(cliRoot, "registry");
const outputComponentsRoot = join(outputRegistryRoot, "components");
const outputRegistryPath = join(outputRegistryRoot, "registry.json");
const outputStylesPath = join(outputRegistryRoot, "styles.css");
const sourceStylesPath = join(repoRoot, "packages", "ui", "src", "styles.css");

const sourceRegistry = JSON.parse(readFileSync(sourceRegistryPath, "utf8"));

rmSync(outputRegistryRoot, { recursive: true, force: true });
mkdirSync(outputComponentsRoot, { recursive: true });

const items = sourceRegistry.items.map((item) => {
  const files = item.files.map((file) => {
    const sourcePath = join(repoRoot, file.path);
    const source = file.path.replace(
      /^packages\/ui\/src\/components\//,
      "components/",
    );
    const outputPath = join(outputRegistryRoot, source);

    mkdirSync(dirname(outputPath), { recursive: true });
    copyFileSync(sourcePath, outputPath);

    return {
      source,
      target: file.target,
      type: file.type,
    };
  });

  return {
    ...item,
    files,
  };
});

const outputRegistry = {
  name: sourceRegistry.name,
  homepage: sourceRegistry.homepage,
  items,
};

writeFileSync(outputRegistryPath, `${JSON.stringify(outputRegistry, null, 2)}\n`);
copyFileSync(sourceStylesPath, outputStylesPath);

console.log(
  `Synced ${items.length} registry items to ${outputRegistryRoot.replace(
    `${repoRoot}/`,
    "",
  )}.`,
);

