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
const sourceManifestPath = join(
  repoRoot,
  "packages",
  "components",
  "manifest.json",
);
const outputTemplatesRoot = join(cliRoot, "templates");
const outputComponentsRoot = join(outputTemplatesRoot, "components");
const outputManifestPath = join(outputTemplatesRoot, "manifest.json");
const outputThemePath = join(outputTemplatesRoot, "theme.css");
const sourceStylesPath = join(
  repoRoot,
  "packages",
  "components",
  "src",
  "styles.css",
);

const themeStart = "/* aspekt:start */";
const themeEnd = "/* aspekt:end */";

const sourceManifest = JSON.parse(readFileSync(sourceManifestPath, "utf8"));

rmSync(outputTemplatesRoot, { recursive: true, force: true });
mkdirSync(outputComponentsRoot, { recursive: true });

const items = sourceManifest.items.map((item) => {
  const files = item.files.map((file) => {
    const sourcePath = join(repoRoot, file.path);
    const source = file.path.replace(
      /^packages\/components\/src\/components\//,
      "components/",
    );
    const outputPath = join(outputTemplatesRoot, source);

    mkdirSync(dirname(outputPath), { recursive: true });
    copyFileSync(sourcePath, outputPath);

    return {
      source,
      target: file.target,
    };
  });

  return {
    ...item,
    files,
  };
});

const themeCss = readFileSync(sourceStylesPath, "utf8")
  .split(/\r?\n/)
  .filter((line) => {
    const trimmed = line.trim();

    return (
      !/^@import\s+["']tailwindcss["'];?$/.test(trimmed) &&
      !/^@source\b/.test(trimmed)
    );
  })
  .join("\n")
  .trim();

const outputManifest = {
  name: sourceManifest.name,
  homepage: sourceManifest.homepage,
  items,
};

writeFileSync(outputManifestPath, `${JSON.stringify(outputManifest, null, 2)}\n`);
writeFileSync(outputThemePath, `${themeStart}\n${themeCss}\n${themeEnd}\n`);

console.log(
  `Synced ${items.length} template items to ${outputTemplatesRoot.replace(
    `${repoRoot}/`,
    "",
  )}.`,
);
