import { useLocale } from "./useLocale";

import type { Localized } from "@/data/types";

/** Resuelve un valor de contenido de `src/data/` en el idioma activo. */
export function useLocalized() {
  const { locale } = useLocale();

  function l<T>(value: Localized<T>): T {
    return value[locale.value];
  }

  /** Resuelve un texto que puede ser fijo o traducido. */
  function text(value: string | Localized): string {
    return typeof value === "string" ? value : l(value);
  }

  return { l, text, locale };
}
