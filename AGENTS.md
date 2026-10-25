# Guía para agentes

Este repositorio es el portafolio personal de Joaquín Núñez Vega, publicado en GitHub Pages en
`https://joaquinn6.github.io`. Además de presentar su perfil, demuestra el uso real de su librería
`@joaquinn6/jnv-ui-components` (repositorio `joaquinn6/components-vue-3`). Estas reglas aplican a
todo el proyecto y siguen el mismo criterio que el `AGENTS.md` de la librería.

## Stack y comandos

- Vue 3.5 con `<script setup lang="ts">`, Vite 8, TypeScript 5.9 (estricto) y vue-i18n 11
  (Composition API, mensajes JSON precompilados).
- pnpm 12 (`packageManager` en `package.json`) y Node 22 (`.node-version`).
- Fuentes autohospedadas: Inter Variable y JetBrains Mono (`@fontsource`).

| Comando               | Qué hace                                                      |
| --------------------- | ------------------------------------------------------------- |
| `pnpm dev`            | Servidor de desarrollo.                                       |
| `pnpm build`          | Verifica tipos y compila a `dist/`.                           |
| `pnpm preview`        | Sirve el build de producción.                                 |
| `pnpm check:types`    | `vue-tsc --build` sobre la app, los tests y `vite.config.ts`. |
| `pnpm check:colors`   | Falla si hay colores literales fuera del tema.                |
| `pnpm check:contrast` | Verifica el contraste WCAG AA de los tokens del tema.         |
| `pnpm test`           | Pruebas con Vitest.                                           |
| `pnpm format:check`   | Revisa el formato con Prettier. `pnpm format` lo corrige.     |

## Estructura

- `src/components/{layout,controls,projects}`: componentes del portafolio.
- `src/sections`: una sección de la página por archivo (`XxxSection.vue`).
- `src/composables`: lógica reutilizable (`useXxx.ts`).
- `src/data`: contenido tipado (perfil, habilidades, proyectos, experiencia y educación).
- `src/i18n/locales/{es,en}.json`: textos de la interfaz.
- `src/styles/theme/portfolio.css`: tema (paleta y tokens). `src/styles/base.css`: estilos globales.
- `content/cv.md`: fuente de verdad del contenido. No se publica.
- `public/`: archivos estáticos (CV en PDF, favicon, `404.html`).

## Componentes

- Usa los componentes de `@joaquinn6/jnv-ui-components` antes de crear uno nuevo. Por ejemplo,
  `BaseButton` para acciones, `BaseLink` para enlaces y `BaseHeading`/`BaseText` para tipografía.
- Importa los componentes de forma individual; no los registres globalmente. La directiva
  `v-tooltip` ya está registrada en `main.ts`.
- Si falta algo genérico (un icono, un componente, un token), propónlo en la librería siguiendo su
  contrato; no lo dupliques aquí. Lo específico del portafolio sí vive en `src/components`.
- No dependas de clases internas de la librería (`base-*`) ni sobrescribas sus estilos por
  selector. Ajusta la apariencia con tokens.
- Nombres: componentes en PascalCase (`SiteXxx` para el layout y `XxxSection` para las
  secciones), composables `useXxx`, clases CSS con prefijo `pf-` e ids de ancla en inglés y en
  kebab-case.

## Tema y estilos

- Están prohibidos los colores literales (hexadecimales, `rgb()`, `hsl()`, `color-mix()`,
  `oklch()` y nombres de color) fuera de `src/styles/theme/portfolio.css`. `check:colors` lo
  verifica.
- Los componentes solo consumen tokens semánticos `--jnv-*` y tokens propios `--pf-*`, nunca la
  paleta privada `--pf-palette-*`.
- Un token nuevo se declara en `portfolio.css` con su valor para el modo oscuro (`:root`) y para el
  claro (`:root[data-theme="light"]`). Si tiene un par de contraste relevante, agrégalo a
  `scripts/check-contrast.mjs`.
- El tema se aplica con `data-theme` en `<html>`. El script inline de `index.html` lo fija antes
  del primer pintado; mantenlo sincronizado con `useTheme.ts` (clave `pf-theme`).
- Los estilos de componente van `scoped`. Lo global vive en `base.css`.

## Textos e idiomas

- Ningún texto visible o accesible se escribe en la plantilla: todo sale de i18n, incluidas las
  props de texto y ARIA de la librería (`closeLabel`, `ariaLabel`, `label`…), porque sus valores
  predeterminados están en español.
- Toda clave nueva se agrega a `es.json` y `en.json` en el mismo cambio. `es.json` define el
  esquema y `tests/messages.spec.ts` verifica que las claves coincidan.
- Los mensajes siguen la sintaxis de vue-i18n: escapa `@`, `{`, `}`, `|` y `$` con literales
  (`{'@'}`). Por eso, correos y URLs viven en `src/data`, no en los mensajes.

## Contenido

- El contenido (perfil, habilidades, proyectos, experiencia, educación) vive solo en `src/data/`,
  tipado con `Localized<T>` (`{ es, en }`), y se resuelve con `useLocalized().l(...)`.
- **No inventes información sobre Joaquín.** La fuente es `content/cv.md`. Si falta un dato,
  pregunta. Las traducciones al inglés no deben agregar ni exagerar logros.
- Para agregar un proyecto basta con editar `src/data/projects.ts`; no hace falta tocar componentes.

## Accesibilidad

- HTML semántico: un solo `h1`, jerarquía de encabezados, landmarks (`header`, `nav`, `main`,
  `footer`) y cada `section` con `aria-labelledby`.
- Navegación completa por teclado, foco visible (tokens de foco de la librería) y enlace "Saltar al
  contenido".
- El nombre accesible de un control contiene su texto visible (WCAG 2.5.3). Las acciones que solo
  tienen icono llevan una etiqueta traducida.
- Contraste AA en ambos modos (`check:contrast`).
- Toda animación respeta `prefers-reduced-motion` y el contenido debe verse sin JavaScript de
  animación.

## Rendimiento

Presupuesto de la carga inicial (gzip): JS ≤ 110 kB, CSS ≤ 30 kB y fuentes descargadas ≤ 90 kB.
CLS < 0.05. Objetivo de Lighthouse: 95 o más en todas las categorías. Las imágenes van en
AVIF/WebP con `width`/`height` explícitos y `loading="lazy"` fuera del primer pantallazo. No
agregues dependencias de ejecución sin autorización explícita.

## Seguridad

- Nunca guardes tokens ni secretos en el repositorio. `.npmrc` solo declara el registro
  `@joaquinn6`; la credencial vive en el `.npmrc` del usuario o, en CI, en `~/.npmrc` del runner.
- `patches/` contiene parches de pnpm para dependencias. Elimina un parche cuando la versión
  publicada ya incluya la corrección.

## Definición de terminado

Un cambio está terminado cuando:

1. `pnpm build` compila sin errores de tipos.
2. `pnpm check:colors`, `pnpm check:contrast`, `pnpm test` y `pnpm format:check` pasan.
3. Se revisó en modo claro y oscuro, en español e inglés, a 360, 768 y 1280 px, y solo con teclado.

Si una validación no puede ejecutarse, indícalo claramente en la entrega.
