import type { Profile } from "./types";

// Fuente: content/cv.md. No agregues datos que no estén en el CV.
export const profile: Profile = {
  name: "Joaquín Núñez Vega",
  email: "joaquin.software.e@gmail.com",
  links: {
    github: "https://github.com/joaquinn6",
    linkedin: "https://www.linkedin.com/in/joaquin-n6",
    source: "https://github.com/joaquinn6/joaquinn6.github.io",
  },
  cv: {
    es: "/cv/cv-es.pdf",
    en: "/cv/cv-en.pdf",
  },
  tagline: {
    es: "Diseño microservicios, APIs REST y aplicaciones web con Python, Node.js y Vue 3.",
    en: "I design microservices, REST APIs and web applications with Python, Node.js and Vue 3.",
  },
  about: {
    es: [
      "Ingeniero de Software con 7 años de experiencia en desarrollo full stack con Python, JavaScript y Vue.js. Diseño microservicios y APIs REST con FastAPI y Node.js, aplicaciones web y microfrontends con Vue 3 y Vite, e integraciones con plataformas como Shopify, Google Maps y Azure.",
      "He estado a cargo de proyectos con otros desarrolladores bajo mi coordinación, e implementé en el equipo un flujo de desarrollo asistido por IA que redujo el tiempo de arranque de nuevos proyectos de 1 o 2 meses a un máximo de 2 semanas.",
    ],
    en: [
      "Software Engineer with 7 years of full stack experience with Python, JavaScript and Vue.js. I design microservices and REST APIs with FastAPI and Node.js, web applications and microfrontends with Vue 3 and Vite, and integrations with platforms such as Shopify, Google Maps and Azure.",
      "I have led projects with other developers under my coordination, and introduced an AI-assisted development workflow to the team that cut the kickoff time of new projects from 1–2 months to 2 weeks at most.",
    ],
  },
  highlights: [
    {
      value: { es: "7 años", en: "7 years" },
      label: {
        es: "de experiencia en desarrollo full stack",
        en: "of full stack development experience",
      },
    },
    {
      value: { es: "1–2", en: "1–2" },
      label: {
        es: "desarrolladores coordinados por proyecto",
        en: "developers coordinated per project",
      },
    },
    {
      value: { es: "≤ 2 semanas", en: "≤ 2 weeks" },
      label: {
        es: "para arrancar un proyecto nuevo, antes 1 o 2 meses",
        en: "to kick off a new project, down from 1–2 months",
      },
    },
  ],
};
