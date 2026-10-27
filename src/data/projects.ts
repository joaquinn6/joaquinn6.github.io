import type { Project } from "./types";

// Para agregar un proyecto, añade un objeto a este arreglo; no hace falta tocar componentes.
// Fuente de components-vue-3: su README y content/cv.md.
// Fuente de habits: los README de joaquinn6/habits-app y joaquinn6/habits-api.
// Fuente de inventory: los README de ErickRuiz97/inventory-frontend y joaquinn6/inventory-api,
// y lo que contó Joaquín (rol, cliente y uso actual).
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
  {
    slug: "habits",
    name: {
      es: "Control de hábitos",
      en: "Habits control",
    },
    year: 2025,
    tagline: {
      es: "Aplicación full stack para registrar hábitos, fijar metas y ver tu progreso.",
      en: "Full-stack app to track habits, set goals and see your progress.",
    },
    summary: {
      es: "Proyecto personal de aprendizaje para dar el salto de Vue a React: un frontend en React, diseñado mobile-first, que consume una API REST en FastAPI con MongoDB. Se puede explorar con un usuario de prueba.",
      en: "Personal learning project to make the jump from Vue to React: a mobile-first React frontend that consumes a REST API built with FastAPI and MongoDB. It can be explored with a test user.",
    },
    problem: {
      es: "Llevaba trabajando con Vue desde 2020 y quería aprender React para abrirme a otras tecnologías. Además, necesitaba llevar el control de mis hábitos para autoanalizarme y mejorar día a día.",
      en: "I had been working with Vue since 2020 and wanted to learn React to open myself up to other technologies. I also needed to keep track of my habits to self-analyze and improve day by day.",
    },
    solution: {
      es: "Una aplicación con un frontend en React y una API RESTful en FastAPI. Los usuarios crean, editan y eliminan hábitos, les asignan metas, los registran en un calendario y consultan estadísticas de su progreso.",
      en: "An app with a React frontend and a RESTful API built with FastAPI. Users create, edit and delete habits, assign them goals, log them on a calendar and check statistics on their progress.",
    },
    highlights: {
      es: [
        "Calendario interactivo con soporte para eventos y notas, y un tour de usuario que guía la pantalla.",
        "Estadísticas del progreso generadas con agregaciones de MongoDB.",
        "Autenticación con JWT usando python-jose, y contraseñas protegidas con passlib.",
        "Construido mobile-first: pensado primero para usarse desde el celular y adaptado luego a pantallas grandes, con Ant Design, modo claro y oscuro, e instalable en dispositivos móviles.",
        "Estado global con Zustand y consumo de la API con axios.",
        "Frontend desplegado en Vercel y API en Render, con documentación Swagger.",
      ],
      en: [
        "Interactive calendar with support for events and notes, plus a user tour that guides the screen.",
        "Progress statistics generated with MongoDB aggregations.",
        "JWT authentication using python-jose, with passwords secured by passlib.",
        "Built mobile-first: designed first to be used from a phone and then adapted to larger screens, with Ant Design, light and dark mode, and installable on mobile devices.",
        "Global state with Zustand and API consumption with axios.",
        "Frontend deployed on Vercel and API on Render, with Swagger documentation.",
      ],
    },
    stack: [
      "React",
      "Vite",
      "Zustand",
      "Ant Design",
      "Mobile-first",
      "FastAPI",
      "Pydantic",
      "MongoDB",
      "JWT",
      "Vercel",
      "Render",
    ],
    links: {
      repo: "https://github.com/joaquinn6/habits-app",
      apiRepo: "https://github.com/joaquinn6/habits-api",
      apiDocs: "https://habits-api-7wcr.onrender.com/docs",
      demo: "https://habits-three-iota.vercel.app/",
    },
  },
  {
    slug: "inventory",
    name: {
      es: "Sistema de inventario",
      en: "Inventory system",
    },
    year: 2025,
    tagline: {
      es: "Sistema full stack de inventario, compras y ventas para una pyme.",
      en: "Full-stack inventory, purchasing and sales system for a small business.",
    },
    summary: {
      es: "Lo desarrollé para la tienda de tecnología de un amigo, liderando el backend y el frontend junto a dos colegas. Un frontend en Vue 3 con Element Plus consume una API REST en FastAPI con MongoDB. El negocio lo sigue usando.",
      en: "I built it for a friend's tech store, leading the backend and frontend alongside two colleagues. A Vue 3 frontend with Element Plus consumes a REST API built with FastAPI and MongoDB. The business still uses it.",
    },
    problem: {
      es: "La tienda llevaba el inventario, las compras y las ventas en cuaderno, sin saber con certeza el stock disponible ni cómo cambiaban los precios de sus productos.",
      en: "The store tracked its inventory, purchases and sales in a notebook, without knowing for sure the available stock or how its product prices changed.",
    },
    solution: {
      es: "Un sistema web donde cada compra a proveedores y cada venta actualiza el stock y el historial de precios automáticamente, con acceso según el rol de cada usuario. Se priorizó una entrega rápida y funcional para que el negocio empezara a usarlo cuanto antes.",
      en: "A web system where every supplier purchase and every sale updates stock and price history automatically, with access based on each user's role. A fast, functional delivery was prioritized so the business could start using it as soon as possible.",
    },
    highlights: {
      es: [
        "Compras y ventas que actualizan el stock, calculan la tendencia del precio y se pueden anular revirtiendo las unidades.",
        "Recibos de venta en PDF con el logo y los datos de la empresa, generados con fpdf2.",
        "Reportes en Excel de productos, proveedores, usuarios, compras y ventas con pandas y openpyxl.",
        "Dashboard con gráficos de los productos más vendidos y los proveedores con mayor gasto, a partir de agregaciones de MongoDB.",
        "Autenticación con JWT y tres roles (administrador, gerente y ventas) que protegen tanto la API como las rutas del frontend.",
        "Configuración de la empresa, moneda y categorías, y respaldo y restauración de toda la base de datos desde la interfaz.",
        "Frontend desplegado en Netlify y API en Render, con documentación Swagger.",
      ],
      en: [
        "Purchases and sales that update stock, compute the price trend and can be cancelled, rolling back the units.",
        "PDF sale receipts with the company's logo and details, generated with fpdf2.",
        "Excel reports for products, suppliers, users, purchases and sales with pandas and openpyxl.",
        "Dashboard with charts of best-selling products and top-spend suppliers, built from MongoDB aggregations.",
        "JWT authentication and three roles (admin, manager and sales) protecting both the API and the frontend routes.",
        "Company, currency and category settings, plus full database backup and restore from the UI.",
        "Frontend deployed on Netlify and API on Render, with Swagger documentation.",
      ],
    },
    stack: [
      "Vue 3",
      "Vite",
      "Pinia",
      "Element Plus",
      "ECharts",
      "FastAPI",
      "Pydantic",
      "pandas",
      "openpyxl",
      "fpdf2",
      "MongoDB",
      "JWT",
      "Docker",
      "Netlify",
      "Render",
    ],
    links: {
      repo: "https://github.com/ErickRuiz97/inventory-frontend",
      apiRepo: "https://github.com/joaquinn6/inventory-api",
      apiDocs: "https://inventory-api-xetu.onrender.com/docs",
      demo: "https://inventory-ni.netlify.app/",
    },
  },
];
