import { watch } from "vue";
import { createI18n } from "vue-i18n";

import type { Locale } from "@/data/types";
import { readInitialLocale } from "@/composables/useLocale";

import en from "./locales/en.json";
import es from "./locales/es.json";

/** El español define el esquema: `en` debe tener exactamente las mismas claves. */
export type MessageSchema = typeof es;

declare module "vue-i18n" {
  export interface DefineLocaleMessage extends MessageSchema {}
}

export const i18n = createI18n<[MessageSchema], Locale, false>({
  legacy: false,
  locale: readInitialLocale(),
  fallbackLocale: "es",
  messages: { es, en },
});

// Mantiene <html lang>, el título y la descripción alineados con el idioma activo.
if (typeof document !== "undefined") {
  const { locale, t } = i18n.global;

  watch(
    locale,
    (value) => {
      document.documentElement.lang = value;
      document.title = t("meta.title");
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", t("meta.description"));
    },
    { immediate: true },
  );
}
