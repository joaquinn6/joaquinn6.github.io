import { useLocale } from "./useLocale";

import type { Localized } from "@/data/types";

/** Resuelve un valor de contenido de `src/data/` en el idioma activo. */
export function useLocalized() {
  const { locale } = useLocale();

  function l<T>(value: Localized<T>): T {
    return value[locale.value];
  }

  return { l, locale };
}
