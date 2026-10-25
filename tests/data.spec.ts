import { describe, expect, it } from "vitest";

import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

const LOCALE_KEYS = ["en", "es"];

function isLocalized(value: object): value is Record<"es" | "en", unknown> {
  return (
    !Array.isArray(value) &&
    Object.keys(value).sort().join() === LOCALE_KEYS.join()
  );
}

/** Recorre el contenido y devuelve las rutas de cada valor localizado incompleto. */
function findIncomplete(value: unknown, path: string): string[] {
  if (value === null || typeof value !== "object") return [];

  if (isLocalized(value)) {
    const { es, en } = value;
    if (Array.isArray(es) && Array.isArray(en)) {
      const empty = [...es, ...en].some((item) => !String(item).trim());
      return es.length !== en.length || empty ? [path] : [];
    }
    return String(es ?? "").trim() && String(en ?? "").trim() ? [] : [path];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    findIncomplete(child, `${path}.${key}`),
  );
}

describe("contenido de src/data", () => {
  it.each([
    ["profile", profile],
    ["skills", skills],
    ["experience", experience],
    ["education", education],
    ["projects", projects],
  ])(
    "%s tiene cada texto en es y en, con la misma cantidad de elementos",
    (name, data) => {
      expect(findIncomplete(data, name)).toEqual([]);
    },
  );

  it("los ids y slugs son únicos", () => {
    for (const ids of [
      experience.map((item) => item.id),
      education.map((item) => item.id),
      projects.map((item) => item.slug),
      skills.map((item) => item.id),
    ])
      expect(new Set(ids).size).toBe(ids.length);
  });

  it("la experiencia está ordenada de la más reciente a la más antigua", () => {
    const starts = experience.map((item) => item.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });
});
