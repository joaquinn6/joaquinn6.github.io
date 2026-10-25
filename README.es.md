# joaquinn6.github.io

[Read in English](README.md)

Portafolio personal de **Joaquín Núñez Vega**, Ingeniero de Software y Full Stack Developer.

**Sitio en vivo:** https://joaquinn6.github.io

Toda la interfaz está construida con mi librería de componentes Vue 3,
[`@joaquinn6/jnv-ui-components`](https://github.com/joaquinn6/components-vue-3). El portafolio
solo sobrescribe sus tokens CSS (`--jnv-*`), así que también es una demostración real de lo
tematizable que es la librería.

## Stack

- Vue 3.5 (`<script setup>`), TypeScript (estricto) y Vite 8
- `@joaquinn6/jnv-ui-components` en todos los componentes, con un tema propio en
  [`src/styles/theme/portfolio.css`](src/styles/theme/portfolio.css)
- vue-i18n 11 con mensajes JSON precompilados (español e inglés)
- Modos claro y oscuro que siguen `prefers-color-scheme`, sin parpadeo al cargar
- Fuentes Inter y JetBrains Mono autohospedadas
- Vitest, Prettier y verificaciones propias de colores literales y contraste WCAG
- GitHub Actions + GitHub Pages

## Ejecutar en local

Requisitos: Node 22 y pnpm 12 (`corepack enable` toma la versión de `package.json`).

La librería de componentes se publica en **GitHub Packages**, que exige autenticación incluso para
leerla. El [`.npmrc`](.npmrc) versionado solo asocia el scope al registro y no contiene
credenciales:

```ini
@joaquinn6:registry=https://npm.pkg.github.com
```

1. Crea un token clásico de GitHub con **solo** el permiso `read:packages`.
2. Inicia sesión una vez. El token se guarda en el `.npmrc` de tu usuario, nunca en este
   repositorio:

   ```bash
   npm login --scope=@joaquinn6 --auth-type=legacy --registry=https://npm.pkg.github.com
   ```

   Usa tu usuario de GitHub y pega el token cuando se pida la contraseña.

3. Instala y ejecuta:

   ```bash
   pnpm install
   pnpm dev
   ```

| Comando               | Descripción                                          |
| --------------------- | ---------------------------------------------------- |
| `pnpm dev`            | Servidor de desarrollo                               |
| `pnpm build`          | Verifica tipos y compila a `dist/`                   |
| `pnpm preview`        | Sirve el build de producción                         |
| `pnpm check:types`    | Verifica los tipos de la app, los tests y Vite       |
| `pnpm check:colors`   | Falla si hay colores literales fuera del tema        |
| `pnpm check:contrast` | Verifica el contraste WCAG AA de los tokens del tema |
| `pnpm test`           | Pruebas unitarias                                    |
| `pnpm format:check`   | Revisa el formato (`pnpm format` lo corrige)         |

## Estructura

```
src/
├─ components/   componentes de layout, controles y proyectos
├─ sections/     un archivo por sección de la página
├─ composables/  useTheme, useLocale, useLocalized…
├─ data/         contenido tipado (perfil, habilidades, proyectos, experiencia…)
├─ i18n/         configuración de vue-i18n y mensajes es/en
└─ styles/       tema (único lugar con colores literales) y estilos globales
content/cv.md    fuente de verdad del contenido
public/          CV en PDF, favicon y página 404
```

## Agregar contenido

- **Una traducción:** agrega la clave en `src/i18n/locales/es.json` y en `en.json`. `es.json`
  define el esquema; la verificación de tipos y `tests/messages.spec.ts` fallan si falta una clave.
- **El contenido** (perfil, experiencia, proyectos) vive en `src/data/` como valores `{ es, en }`,
  nunca en los componentes.

## Despliegue

Cada push a `master` ejecuta [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
instala con pnpm, corre las verificaciones y las pruebas, compila y publica `dist/` con
`actions/deploy-pages`. El workflow se autentica en GitHub Packages con su propio `GITHUB_TOKEN`
(`packages: read`). Para eso, este repositorio necesita acceso de lectura en la opción **Manage
Actions access** de la configuración del paquete.

## Licencia

Código bajo [licencia MIT](LICENSE). El contenido personal (textos y CV) pertenece a su autor.
