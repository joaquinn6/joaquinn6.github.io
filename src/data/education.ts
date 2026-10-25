import type { EducationItem } from "./types";

// Fuente: content/cv.md, sección "Educación".
export const education: EducationItem[] = [
  {
    id: "unan-leon",
    degree: {
      es: "Ingeniería en Sistemas de Información",
      en: "Information Systems Engineering",
    },
    institution: "Universidad Nacional Autónoma de Nicaragua, León (UNAN-León)",
    start: 2014,
    end: 2019,
    status: { es: "Título obtenido", en: "Degree completed" },
  },
];
