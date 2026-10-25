import type { Project } from "./types";

// Para agregar un proyecto, añade un objeto a este arreglo; no hace falta tocar componentes.
// Fuente de components-vue-3: su README y content/cv.md.
export const projects: Project[] = [
  {
    slug: "components-vue-3",
    name: "JNV UI Components",
    year: 2026,
    tagline: {
      es: "Librería de componentes Vue 3 tematizables, accesibles y tipados.",
      en: "Themeable, accessible and typed Vue 3 component library.",
    },
    summary: {
      es: "Más de 30 componentes para portales y formularios reales, sin un solo color dentro: la apariencia sale de tokens CSS. Este portafolio está construido con ella.",
      en: "Over 30 components for real-world portals and forms, without a single hardcoded color: the look comes from CSS tokens. This portfolio is built with it.",
    },
    problem: {
      es: "Las pantallas nuevas se desarrollaban desde cero, repitiendo controles, formularios y tablas en cada proyecto.",
      en: "New screens were built from scratch, repeating controls, forms and tables in every project.",
    },
    solution: {
      es: "Una librería publicada como paquete npm con versionado semántico, donde los componentes solo consumen tokens semánticos --jnv-*. Cada proyecto elige su tema y reutiliza los componentes en lugar de reescribirlos.",
      en: "A library published as an npm package with semantic versioning, where components only consume semantic --jnv-* tokens. Each project picks its theme and reuses the components instead of rewriting them.",
    },
    highlights: {
      es: [
        "Más de 30 componentes: formularios, fecha y hora, tablas con ordenamiento, paginación y CRUD, búsqueda con filtros, stepper, diálogos y firma.",
        "Temas oscuro y claro de serie; un script verifica en cada cambio que ningún componente declare colores literales.",
        "Accesible: HTML semántico, navegación completa por teclado, foco visible, estados ARIA sincronizados y regiones aria-live.",
        "Textos y etiquetas ARIA configurables por props, y declaraciones TypeScript públicas para props, modelos y eventos.",
        "Playground con recarga en caliente, desplegado en GitHub Pages con GitHub Actions.",
      ],
      en: [
        "Over 30 components: forms, date and time inputs, tables with sorting, pagination and CRUD, filtered search, stepper, dialogs and signature capture.",
        "Dark and light themes out of the box; a script checks on every change that no component declares literal colors.",
        "Accessible: semantic HTML, full keyboard navigation, visible focus, synced ARIA states and aria-live regions.",
        "Visible and ARIA texts configurable through props, plus public TypeScript declarations for props, models and events.",
        "Hot-reloading playground, deployed to GitHub Pages with GitHub Actions.",
      ],
    },
    stack: [
      "Vue 3",
      "TypeScript",
      "Vite",
      "CSS custom properties",
      "GitHub Actions",
      "GitHub Packages",
    ],
    links: {
      repo: "https://github.com/joaquinn6/components-vue-3",
      demo: "https://joaquinn6.github.io/components-vue-3/",
    },
  },
];
