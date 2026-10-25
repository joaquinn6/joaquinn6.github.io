import { describe, expect, it } from "vitest";

import en from "@/i18n/locales/en.json";
import es from "@/i18n/locales/es.json";

type Messages = { [key: string]: string | Messages };

function flatten(messages: Messages, prefix = ""): Record<string, string> {
  return Object.entries(messages).reduce<Record<string, string>>(
    (result, [key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof value === "string"
        ? { ...result, [path]: value }
        : { ...result, ...flatten(value, path) };
    },
    {},
  );
}

const flatEs = flatten(es);
const flatEn = flatten(en);

describe("mensajes de i18n", () => {
  it("es y en tienen exactamente las mismas claves", () => {
    expect(Object.keys(flatEn).sort()).toEqual(Object.keys(flatEs).sort());
  });

  it("ningún mensaje está vacío", () => {
    const empty = Object.entries({ ...flatEs, ...flatEn }).filter(
      ([, value]) => !value.trim(),
    );
    expect(empty).toEqual([]);
  });
});
