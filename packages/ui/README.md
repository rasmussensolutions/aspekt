# Aspekt CLI

Add Aspekt UI source components to React and Tailwind projects.

```sh
npx @aspekt/ui init --preset square
npx @aspekt/ui add button
npx @aspekt/ui preset round
npx @aspekt/ui update
```

The CLI copies component source into your project, usually under
`components/aspekt`, so you can edit the components directly. The `init`, `add`,
and `update` commands also keep your Aspekt CSS theme block wired to the copied
component directory for Tailwind. Installed component template hashes are
recorded in `.aspekt/components.json`, which lets the CLI detect outdated
components later.

## Commands

```sh
npx @aspekt/ui list
npx @aspekt/ui init --preset round
npx @aspekt/ui add aspect-ratio button input dialog
npx @aspekt/ui preset square
npx @aspekt/ui update
npx @aspekt/ui update button --dry-run
```

Use `--force` to overwrite existing files, `--dry-run` to preview writes, and
`--no-install` to skip package installation. Use `--preset square` or
`--preset round` during init to choose the generated default shape, and
`preset square|round` later to update `components/aspekt/config.ts` without
rewriting installed components. Use `--yes` to apply detected updates without
an interactive confirmation prompt.
