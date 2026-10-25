import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { LOCALES, type Locale } from "@/data/types";

// Debe coincidir con el script inline de index.html.
export const LOCALE_STORAGE_KEY = "pf-locale";

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

interface LocaleSources {
  pathname: string;
  stored: string | null;
  languages: readonly string[];
}

/**
 * Prioridad: ruta `/en/`, preferencia guardada, idiomas del navegador y, por último, español.
 * La detección no se guarda: solo una elección explícita se recuerda.
 */
export function resolveLocale({
  pathname,
  stored,
  languages,
}: LocaleSources): Locale {
  if (/^\/en(\/|$)/.test(pathname)) return "en";
  if (isLocale(stored)) return stored;

  for (const language of languages) {
    const base = language.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }

  return "es";
}

function readStoredLocale(): string | null {
  try {
    return window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";

  return resolveLocale({
    pathname: window.location.pathname,
    stored: readStoredLocale(),
    languages: window.navigator.languages ?? [window.navigator.language],
  });
}

export function useLocale() {
  const { locale: i18nLocale } = useI18n();

  const locale = computed<Locale>(() =>
    isLocale(i18nLocale.value) ? i18nLocale.value : "es",
  );

  function setLocale(value: Locale) {
    i18nLocale.value = value;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, value);
    } catch {
      // Sin almacenamiento disponible la elección solo dura la sesión.
    }
  }

  function toggleLocale() {
    setLocale(locale.value === "es" ? "en" : "es");
  }

  return { locale, setLocale, toggleLocale };
}
