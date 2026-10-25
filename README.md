# joaquinn6.github.io

[Leer en español](README.es.md)

Personal portfolio of **Joaquín Núñez Vega**, Software Engineer and Full Stack Developer.

**Live site:** https://joaquinn6.github.io

The whole UI is built with my own Vue 3 component library,
[`@joaquinn6/jnv-ui-components`](https://github.com/joaquinn6/components-vue-3). The portfolio
only overrides its CSS design tokens (`--jnv-*`), so it is also a real-world showcase of how
themeable the library is.

## Stack

- Vue 3.5 (`<script setup>`), TypeScript (strict) and Vite 8
- `@joaquinn6/jnv-ui-components` for every component, plus a custom theme in
  [`src/styles/theme/portfolio.css`](src/styles/theme/portfolio.css)
- vue-i18n 11 with precompiled JSON messages (Spanish and English)
- Light and dark modes that follow `prefers-color-scheme`, with no flash on load
- Self-hosted Inter and JetBrains Mono fonts
- Vitest, Prettier and custom checks for literal colors and WCAG contrast
- GitHub Actions + GitHub Pages

## Running locally

Requirements: Node 22 and pnpm 12 (`corepack enable` picks the version from `package.json`).

The component library is published to **GitHub Packages**, which requires authentication even to
read it. The committed [`.npmrc`](.npmrc) only maps the scope to the registry and contains no
credentials:

```ini
@joaquinn6:registry=https://npm.pkg.github.com
```

1. Create a GitHub personal access token (classic) with **only** the `read:packages` scope.
2. Log in once. The token is stored in your user-level `.npmrc`, never in this repository:

   ```bash
   npm login --scope=@joaquinn6 --auth-type=legacy --registry=https://npm.pkg.github.com
   ```

   Use your GitHub username and paste the token when asked for the password.

3. Install and run:

   ```bash
   pnpm install
   pnpm dev
   ```

| Command               | Description                                   |
| --------------------- | --------------------------------------------- |
| `pnpm dev`            | Development server                            |
| `pnpm build`          | Type-check and production build in `dist/`    |
| `pnpm preview`        | Serve the production build                    |
| `pnpm check:types`    | Type-check the app, tests and Vite config     |
| `pnpm check:colors`   | Fail on literal colors outside the theme file |
| `pnpm check:contrast` | Verify WCAG AA contrast of the theme tokens   |
| `pnpm test`           | Unit tests                                    |
| `pnpm format:check`   | Check formatting (`pnpm format` fixes it)     |

## Project structure

```
src/
├─ components/   layout, controls and project components
├─ sections/     one file per page section
├─ composables/  useTheme, useLocale, useLocalized…
├─ data/         typed content (profile, skills, projects, experience…)
├─ i18n/         vue-i18n setup and es/en messages
└─ styles/       theme (only place with literal colors) and global styles
content/cv.md    source of truth for the content
public/          CV PDFs, favicon, 404 page
```

## Adding content

- **A translation:** add the key to both `src/i18n/locales/es.json` and `en.json`. `es.json`
  defines the schema; the type checker and `tests/messages.spec.ts` fail if a key is missing.
- **Content** such as profile, experience or projects lives in `src/data/` as `{ es, en }` values
  and never in components.

## Deployment

Every push to `master` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): it
installs with pnpm, runs the checks and tests, builds, and publishes `dist/` with
`actions/deploy-pages`. The workflow authenticates to GitHub Packages with its own
`GITHUB_TOKEN` (`packages: read`), which requires granting this repository read access under the
package's **Manage Actions access** settings.

## License

Code under the [MIT License](LICENSE). The personal content (texts, CV) belongs to its author.
