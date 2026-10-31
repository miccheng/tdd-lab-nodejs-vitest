# Node.js Vitest - Gilded Rose Refactoring Kata

This repository contains the TypeScript version of Emily Bache's
[Gilded Rose Refactoring Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata),
using Vitest.

Read [the requirements](GildedRoseRequirements.md), add tests to characterize the
existing behavior, then refactor `GildedRose.updateQuality()` and add support for
Conjured items. Do not alter the `Item` class or the `items` property.

## Getting started

This project is ready to go in a [dev container](https://containers.dev/), so you
don't need Node.js or npm installed on your machine. Pick whichever option is
easiest for you:

1. **GitHub Codespaces** — on GitHub, click **Code → Create codespace on main**.
   To open another branch, first select it from the branch selector above the
   file list. Then click **Code → Codespaces** and choose
   `Create codespace on <branch>`. The codespace will contain that branch's code.
2. **VS Code** — install the [Dev Containers] extension, open this folder and
   run **Dev Containers: Reopen in Container**.
3. **Other dev container compatible tools** (Gitpod, Cursor, etc.) — open this
   repository; they pick up `.devcontainer/devcontainer.json` automatically.

The first time the container starts, `npm ci` installs exactly the dependency
tree recorded in `package-lock.json`. The dev container also installs the
official [Vitest extension], so you can run tests from VS Code's Testing view.

## Running the tests

From a terminal inside the dev container:

```shell
npm test
```

For watch mode, run `npm run test:watch`.

## Type checking and linting

Vitest transforms TypeScript without type-checking it, so run the compiler
separately:

```shell
npm run typecheck
npm run lint
```

The project uses strict TypeScript settings and [neostandard] via ESLint's flat
configuration.

## Project layout

- `gilded-rose.ts` — the legacy `GildedRose` code and the `Item` model
- `gilded-rose.test.ts` — the starting Vitest test
- `gilded-rose.characterisation.test.ts` — the 30-day golden-master test
- `texttests/ThirtyDays/stdout.gr` — the expected characterisation test output
- `GildedRoseRequirements.md` — the kata requirements
- `vitest.config.ts` — Vitest test discovery configuration
- `tsconfig.json` — strict TypeScript configuration
- `package.json` — dependencies and npm scripts
- `package-lock.json` — the pinned dependency tree
- `eslint.config.mjs` — ESLint flat configuration with TypeScript support
- `.devcontainer/devcontainer.json` — dev container configuration

[Dev Containers]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
[Vitest extension]: https://marketplace.visualstudio.com/items?itemName=vitest.explorer
[neostandard]: https://github.com/neostandard/neostandard
