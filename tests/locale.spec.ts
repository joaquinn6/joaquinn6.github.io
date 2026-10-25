import { describe, expect, it } from "vitest";

import { resolveLocale } from "@/composables/useLocale";

const base = { pathname: "/", stored: null, languages: [] as string[] };

describe("resolveLocale", () => {
  it("usa español por defecto", () => {
    expect(resolveLocale(base)).toBe("es");
  });

  it("la ruta /en/ tiene prioridad sobre todo lo demás", () => {
    expect(
      resolveLocale({ pathname: "/en/", stored: "es", languages: ["es-NI"] }),
    ).toBe("en");
    expect(resolveLocale({ ...base, pathname: "/en" })).toBe("en");
    expect(resolveLocale({ ...base, pathname: "/engineering" })).toBe("es");
  });

  it("respeta la preferencia guardada antes que el navegador", () => {
    expect(resolveLocale({ ...base, stored: "en", languages: ["es"] })).toBe(
      "en",
    );
  });

  it("ignora preferencias guardadas no válidas", () => {
    expect(resolveLocale({ ...base, stored: "fr", languages: ["en"] })).toBe(
      "en",
    );
  });

  it("toma el primer idioma soportado del navegador", () => {
    expect(resolveLocale({ ...base, languages: ["fr-FR", "en-US"] })).toBe(
      "en",
    );
    expect(resolveLocale({ ...base, languages: ["de", "fr"] })).toBe("es");
  });
});
