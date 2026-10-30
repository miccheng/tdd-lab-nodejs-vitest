# NodeJS - Bootstrapping a Vitest Test Suite with TypeScript

This project is ready to go in a [dev container](https://containers.dev/), so you
don't need NodeJS (or npm) installed on your machine at all — the
[ghcr.io/tdd-workshops/devcontainer-js](https://ghcr.io/tdd-workshops/devcontainer-js)
image provides everything needed.

## Getting started

Pick whichever option is easiest for you:

1. **GitHub Codespaces** — on GitHub, click **Code → Create codespace on main**.

2. **VS Code** — install the [Dev Containers] extension, open this folder and
   run **Dev Containers: Reopen in Container**.

3. **Other dev container compatible tools** (Gitpod, Cursor, etc.) — open this
   repository; they pick up `.devcontainer/devcontainer.json` automatically.

The first time the container starts, `npm ci` runs automatically (via
`postCreateCommand`). It installs exactly the dependency tree recorded in
`package-lock.json` into a `node_modules` folder in the workspace, so everyone in
a workshop ends up with the same Vitest, TypeScript and ESLint versions.

## Running the tests

From a terminal inside the dev container:

```shell
npm test
```

This runs the test suite once. You should see something like this:

```shell
 RUN  v5.0.5

 Test Files  1 passed (1)
      Tests  1 passed (1)
```

For watch mode, run:

```shell
npm run test:watch
```

Run `npm run` to list all available scripts (`test`, `test:watch`, `lint` and
`typecheck`).

## Vitest in VS Code

The dev container automatically installs the official [Vitest extension]
(`vitest.explorer`). Open the **Testing** view to run or debug individual tests,
view results inline, or enable continuous runs. The extension uses the same
`vitest.config.ts` and locally installed Vitest version as the command line.

## Project layout

- `sum.ts` — the code under test, with parameter and return types:

  ```typescript
  const sum = (a: number, b: number): number => a + b
  export default sum
  ```

- `sum.test.ts` — the test suite:

  ```typescript
  import { expect, test } from 'vitest'
  import sum from './sum'

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
  ```

- `vitest.config.ts` — Vitest configuration and TypeScript test discovery
- `tsconfig.json` — strict TypeScript configuration; no JavaScript is emitted
- `package.json` — the direct dependencies and npm scripts
- `package-lock.json` — pins the full resolved dependency tree, so every
  attendee installs the same transitive versions
- `eslint.config.mjs` — ESLint flat config with TypeScript support
- `.devcontainer/devcontainer.json` — dev container configuration, including
  the Vitest and ESLint VS Code extensions

Vitest transforms TypeScript and ES modules automatically, so this project does
not need Babel.

## Type checking

Vitest strips TypeScript types to run the tests but does not type-check them.
Run the compiler separately to check the source, tests and Vitest config:

```shell
npm run typecheck
```

The `strict` option in `tsconfig.json` enables TypeScript's strict type checks.
For example, passing a string to `sum` produces an error like this:

```shell
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

## Linting

From a terminal inside the dev container:

```shell
npm run lint
```

The project uses [neostandard], the maintained successor to the old `standard`
ESLint config, via ESLint's flat config file `eslint.config.mjs`. Its `ts: true`
option enables TypeScript parsing and rules. Tests import `test` and `expect`
from `vitest` explicitly, so no test globals need to be configured.

## About Vitest

Vitest is a Vite-native test runner with built-in assertions, TypeScript support
and watch mode. Its assertion API is compatible with the Jest-style matchers used
in this lab:

```typescript
expect(sum(1, 2)).toBe(3)
```

`toBe` compares with `Object.is`, which is what you want for primitives. For
arrays, objects and other structures use `toEqual`, which compares recursively —
and when they differ Vitest shows exactly which part didn't match. For example,
append this to `sum.test.ts`:

```typescript
test('lists are equivalent', () => {
  expect([1]).toEqual([1, 2])
})
```

This gives you the following output:

```shell
 FAIL  sum.test.ts > lists are equivalent
AssertionError: expected [ 1 ] to deeply equal [ 1, 2 ]

- Expected
+ Received

  [
    1,
-   2,
  ]

 ❯ sum.test.ts:9:15
      7|
      8| test('lists are equivalent', () => {
      9|   expect([1]).toEqual([1, 2])
       |               ^
     10| })

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
```

Read more about Vitest's assertions in the [Vitest API documentation].

## About dev containers

Dev containers standardise a project's development environment in a
`.devcontainer/devcontainer.json` file at the root of the repository. Any tool
that understands the [dev container spec](https://containers.dev/) — VS Code,
GitHub Codespaces, Gitpod, and others — will build or reuse the same container
image, so every participant in a workshop gets an identical setup. Dependencies
are declared in `package.json`, resolved once into the committed
`package-lock.json`, and installed by `npm ci`.

[Dev Containers]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
[Vitest extension]: https://marketplace.visualstudio.com/items?itemName=vitest.explorer
[Vitest API documentation]: https://vitest.dev/api/
[neostandard]: https://github.com/neostandard/neostandard
