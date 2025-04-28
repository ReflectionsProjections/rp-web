# Reflections | Projections Web Monorepo

Webpages:

- [hype.reflectionsprojections.org](hype.reflectionsprojections.org)

## Development Guide

### Getting Started

1. Clone the repository:

   ```bash
   git clone git@github.com:ReflectionsProjections/rp-web.git
   cd rp-web
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Enable pre-commit hooks:

   ```bash
   yarn prepare
   ```

---

### Scripts Cheat Sheet

All of these assume your current working directory is the root of the monorepo. If your current working directory is instead in of a particular app, you can replace `yarn workspace <app-name>` with `yarn` to run the script for the current app.

| Task                       | Command                                        |
| :------------------------- | :--------------------------------------------- |
| Install dependencies       | `yarn`                                         |
| Start an app               | `yarn workspace <app-name> dev`                |
| Build an app               | `yarn workspace <app-name> build`              |
| Lint an app                | `yarn workspace <app-name> lint`               |
| Format all files           | `yarn format`                                  |
| Add a dependency to an app | `yarn workspace <app-name> add <package-name>` |

---

### Monorepo Structure Overview

The monorepo is organized as follows:

- **`apps/`**  
  Contains all the different websites. Each site is an independent app with its own `package.json`.

- **`apps/template/`**  
  Contains reusable template configuration files that can be copied into new apps.

- **`shared/`**  
  Contains the shared package with code (e.g., components, utilities) that can be used across multiple apps.

  To import from the shared package inside an app:

  ```tsx
  import { <component-name> } from "@rp/shared";
  ```

---

### Environment Variables

You can specify environment variables from a `.env` file at the root of the monorepo.

Example:

```bash
VITE_DEV_JWT=<your-jwt>
```

This value will be shared across all apps.

---

### Running Scripts for a Webpage

There are two ways to run a script (e.g., `dev`, `build`, `lint`) for a specific app.

**Option 1: From the root of the monorepo using `workspace`:**

```bash
yarn workspace <app-name> <script-name>
```

Example:

```bash
yarn workspace @rp/hype dev
```

**Option 2: From the app directory:**

```bash
cd apps/<app-name>
yarn <script-name>
```

Example:

```bash
cd apps/hype
yarn dev
```

---

### Adding Dependencies to an App

There are two ways to add a dependency to a specific app.

**Option 1: From the root of the monorepo using `workspace`:**

```bash
yarn workspace <app-name> add <dependency-name>
```

Example:

```bash
yarn workspace @rp/hype add is-odd
```

**Option 2: From the app directory:**

```bash
cd apps/<app-name>
yarn add <dependency-name>
```

Example:

```bash
cd apps/hype
yarn add is-odd
```

---

### Using Versions from the Root `package.json`

If the root `package.json` already specifies a version of a dependency, you can inherit that version by using `"*"` as the version in the app's `package.json`:

Example of inheriting the root version:

```json
{
  "dependencies": {
    "react": "*"
  }
}
```

Example of using a specific version:

```json
{
  "dependencies": {
    "react": "^18.2.0"
  }
}
```

---

### Formatting with Prettier

To format the entire codebase, run:

```bash
yarn format
```

---

### Setting Up VSCode Formatting

To make sure VSCode uses the `.prettierrc.json` at the root of the repository:

1. Install the Prettier extension for VSCode if you haven't already.
2. Add the following to your VSCode `settings.json` (either user-level or workspace-level):

```json
{
  "prettier.configPath": ".prettierrc.json"
}
```

This will ensure VSCode respects the project’s formatting rules.

---

### Committing Without Pre-commit Checks

If you ever need to skip pre-commit hooks, you can add the `--no-verify` flag when committing:

```bash
git commit -m "your commit message" --no-verify
```

These checks will still fail on GitHub so do this at your own risk!

---

### Creating a New App

To create a new app:

1. Copy configuration files from the `template` app:

   ```bash
   cp apps/template/eslint.config.mjs apps/<new-app-name>/
   cp apps/template/package.json apps/<new-app-name>/
   cp apps/template/tsconfig.json apps/<new-app-name>/
   cp apps/template/tsconfig.tsbuildinfo apps/<new-app-name>/
   cp apps/template/vite.config.ts apps/<new-app-name>/
   ```

2. Update the `package.json` in the new app:

   - Replace all instances of `@rp/template` with `@rp/<new-app-name>`.
   - Careful! `@rp/template` appears in multiple places in the `package.json`.

3. Ensure dependencies are linked in the new app:

   ```bash
   yarn
   ```
---

**Questions or feedback?**  
Feel free to open a PR or ask the team!
