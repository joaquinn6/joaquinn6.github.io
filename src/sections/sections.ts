/** Secciones de la página, en orden. Cada id es el ancla y la clave de `nav.*` en i18n. */
export const SECTION_IDS = [
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
