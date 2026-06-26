#!/usr/bin/env node

import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
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
const outputTemplatesTempRoot = join(cliRoot, ".templates-tmp");
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

function hashContent(content) {
  return `sha256-${createHash("sha256").update(content).digest("hex")}`;
}

rmSync(outputTemplatesTempRoot, { recursive: true, force: true });
mkdirSync(join(outputTemplatesTempRoot, "components"), { recursive: true });

const items = sourceManifest.items.map((item) => {
  const files = item.files.map((file) => {
    const sourcePath = join(repoRoot, file.path);
    const content = readFileSync(sourcePath, "utf8");
    const source = file.path.replace(
      /^packages\/components\/src\/components\//,
      "components/",
    );
    const outputPath = join(outputTemplatesTempRoot, source);

    mkdirSync(dirname(outputPath), { recursive: true });
    copyFileSync(sourcePath, outputPath);

    return {
      hash: hashContent(content),
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

writeFileSync(
  join(outputTemplatesTempRoot, "manifest.json"),
  `${JSON.stringify(outputManifest, null, 2)}\n`,
);
writeFileSync(
  join(outputTemplatesTempRoot, "theme.css"),
  `${themeStart}\n${themeCss}\n${themeEnd}\n`,
);

rmSync(outputTemplatesRoot, { recursive: true, force: true });
mkdirSync(dirname(outputTemplatesRoot), { recursive: true });
renameSync(outputTemplatesTempRoot, outputTemplatesRoot);

console.log(
  `Synced ${items.length} template items to ${outputTemplatesRoot.replace(
    `${repoRoot}/`,
    "",
  )}.`,
);
