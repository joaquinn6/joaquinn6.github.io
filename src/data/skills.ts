import type { SkillGroup } from "./types";

// Fuente: content/cv.md, sección "Habilidades". Los títulos de grupo están en i18n (skills.groups).
export const skills: SkillGroup[] = [
  { id: "languages", items: ["Python", "JavaScript", "SQL"] },
  {
    id: "backend",
    items: [
      "FastAPI",
      "Node.js",
      { es: "APIs REST", en: "REST APIs" },
      { es: "Microservicios", en: "Microservices" },
      "Jinja2",
      "pandas",
      "NumPy",
    ],
  },
  {
    id: "frontend",
    items: [
      "Vue.js 3",
      "Pinia",
      "Vite",
      {
        es: "Microfrontends (Module Federation)",
        en: "Microfrontends (Module Federation)",
      },
      "React",
      "HTML",
      "CSS",
      "Bootstrap",
      "Chart.js",
    ],
  },
  { id: "databases", items: ["PostgreSQL", "MongoDB", "SQL Server"] },
  {
    id: "devops",
    items: [
      "Docker",
      "Kubernetes",
      "Azure Blob Storage",
      "Bitbucket Pipelines",
      "GitHub Actions",
    ],
  },
  { id: "testing", items: ["Pytest", "Vitest"] },
  {
    id: "ai",
    items: [
      "Claude Code",
      "Codex",
      "Cursor",
      {
        es: "Servidores MCP (Chrome DevTools MCP)",
        en: "MCP servers (Chrome DevTools MCP)",
      },
    ],
  },
  {
    id: "tools",
    items: [
      "Git",
      "GitHub",
      "Bitbucket",
      "Jira",
      "npm",
      "Postman",
      "FileZilla",
    ],
  },
  {
    id: "spoken",
    items: [
      { es: "Español (nativo)", en: "Spanish (native)" },
      { es: "Inglés (conversacional)", en: "English (conversational)" },
    ],
  },
];
