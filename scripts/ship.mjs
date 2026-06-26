#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const noPushIndex = args.indexOf("--no-push");
const shouldPush = noPushIndex === -1;

if (noPushIndex !== -1) {
  args.splice(noPushIndex, 1);
}

const commitMessage = args.join(" ").trim();

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    stdio: options.stdio ?? "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result;
}

function getOutput(command, commandArgs) {
  return run(command, commandArgs, { stdio: "pipe" }).stdout.toString().trim();
}

if (!commitMessage) {
  console.error('Usage: pnpm ship "commit message"');
  console.error('Optional: pnpm ship "commit message" --no-push');
  process.exit(1);
}

run("pnpm", ["cli:sync"]);
run("pnpm", ["--dir", "apps/www", "lint"]);
run("pnpm", ["docs:build"]);

const statusBeforeCommit = getOutput("git", ["status", "--porcelain"]);

if (!statusBeforeCommit) {
  console.log("No changes to commit.");
  process.exit(0);
}

run("git", ["add", "-A"]);
run("git", ["commit", "-m", commitMessage]);

if (shouldPush) {
  run("git", ["push"]);
}
