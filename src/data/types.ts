export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/** Texto de contenido disponible en todos los idiomas del sitio. */
export type Localized<T = string> = Record<Locale, T>;

/** Fecha ISO parcial con año y mes, por ejemplo "2020-09". */
export type YearMonth = `${number}-${number}${number}`;

export interface Highlight {
  value: Localized;
  label: Localized;
}

export interface Profile {
  name: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
    /** Repositorio de este sitio. */
    source: string;
  };
  /** Ruta pública del CV en PDF para cada idioma. */
  cv: Localized;
  tagline: Localized;
  /** Párrafos de la sección "Sobre mí". */
  about: Localized<string[]>;
  highlights: Highlight[];
}

export type SkillGroupId =
  | "languages"
  | "backend"
  | "frontend"
  | "databases"
  | "devops"
  | "testing"
  | "ai"
  | "tools"
  | "spoken";

/** Un nombre propio (igual en todos los idiomas) o un texto traducido. */
export type SkillItem = string | Localized;

export interface SkillGroup {
  id: SkillGroupId;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: Localized;
  start: YearMonth;
  /** `null` si el puesto sigue vigente. */
  end: YearMonth | null;
  /**
   * Cuántos logros (los primeros del arreglo) se muestran siempre; el resto queda tras "Ver más".
   * Sin valor se muestran todos.
   */
  featured?: number;
  achievements: Localized<string[]>;
  stack: string[];
}

export interface EducationItem {
  id: string;
  degree: Localized;
  institution: string;
  start: number;
  end: number;
  status: Localized;
}

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: Localized;
}

export interface Project {
  slug: string;
  name: string;
  year: number;
  tagline: Localized;
  summary: Localized;
  problem: Localized;
  solution: Localized;
  highlights: Localized<string[]>;
  stack: string[];
  links: {
    repo?: string;
    demo?: string;
  };
  image?: ProjectImage;
}
