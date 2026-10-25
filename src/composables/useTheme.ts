import { computed, readonly, ref, watch } from "vue";

export type Theme = "light" | "dark";

// Debe coincidir con el script inline de index.html.
export const THEME_STORAGE_KEY = "pf-theme";

const SWITCHING_CLASS = "pf-theme-switching";
const SWITCHING_DURATION = 300;

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

const hasDom = typeof window !== "undefined";
const lightQuery =
  hasDom && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;

function systemTheme(): Theme {
  return lightQuery?.matches ? "light" : "dark";
}

// El script inline de index.html ya fijó data-theme; se parte de ese valor.
const preference = ref<Theme | null>(hasDom ? readStoredTheme() : null);
const initial = hasDom ? document.documentElement.dataset.theme : undefined;
const theme = ref<Theme>(
  isTheme(initial) ? initial : (preference.value ?? systemTheme()),
);

if (hasDom) {
  watch(theme, (value) => {
    document.documentElement.dataset.theme = value;
  });

  // Mientras no haya una elección guardada, se sigue al sistema operativo.
  lightQuery?.addEventListener("change", () => {
    if (!preference.value) theme.value = systemTheme();
  });
}

let switchingTimer = 0;

// Activa durante un instante las transiciones de color definidas en base.css.
function animateSwitch() {
  const root = document.documentElement;
  root.classList.add(SWITCHING_CLASS);
  window.clearTimeout(switchingTimer);
  switchingTimer = window.setTimeout(
    () => root.classList.remove(SWITCHING_CLASS),
    SWITCHING_DURATION,
  );
}

export function useTheme() {
  const isDark = computed(() => theme.value === "dark");

  function setTheme(value: Theme) {
    animateSwitch();
    theme.value = value;
    preference.value = value;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      // Sin almacenamiento disponible la elección solo dura la sesión.
    }
  }

  function toggleTheme() {
    setTheme(isDark.value ? "light" : "dark");
  }

  return { theme: readonly(theme), isDark, setTheme, toggleTheme };
}
