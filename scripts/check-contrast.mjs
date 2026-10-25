import { readFile } from "node:fs/promises";

// Verifica el contraste WCAG de los pares de tokens principales del tema en ambos modos.
const THEME_FILE = "src/styles/theme/portfolio.css";

const TEXT = 4.5;
const UI = 3;

/** [primer plano, fondo, mínimo] */
const PAIRS = [
  ["--jnv-color-text-heading", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-text-body", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-text-body", "--jnv-color-surface-subtle", TEXT],
  ["--jnv-color-text-muted", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-text-muted", "--jnv-color-surface-subtle", TEXT],
  ["--jnv-color-text-muted", "--jnv-color-surface-muted", TEXT],
  ["--jnv-color-text-muted", "--jnv-color-surface-footer", TEXT],
  ["--jnv-color-brand-primary", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-brand-primary", "--jnv-color-surface-subtle", TEXT],
  ["--jnv-color-brand-primary-hover", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-brand-secondary", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-brand-secondary", "--jnv-color-surface-subtle", TEXT],
  ["--jnv-color-text-on-primary", "--jnv-color-action-primary", TEXT],
  ["--jnv-color-text-on-primary", "--jnv-color-action-primary-hover", TEXT],
  ["--jnv-color-text-inverse", "--jnv-color-surface-inverse", TEXT],
  ["--jnv-color-text-inverse-muted", "--jnv-color-surface-inverse", TEXT],
  ["--jnv-color-state-error", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-state-error", "--jnv-color-state-error-surface", TEXT],
  ["--jnv-color-state-success", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-state-success", "--jnv-color-state-success-surface", TEXT],
  ["--jnv-color-state-warning", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-state-warning", "--jnv-alert-warning-background", TEXT],
  ["--jnv-color-status-info-text", "--jnv-color-surface-page", TEXT],
  ["--jnv-color-status-info-text", "--jnv-alert-info-background", TEXT],
  ["--jnv-color-text-body", "--jnv-color-surface-highlight", TEXT],
  ["--jnv-color-focus-ring", "--jnv-color-surface-page", UI],
  ["--jnv-color-focus-ring", "--jnv-color-surface-subtle", UI],
  ["--jnv-color-border-strong", "--jnv-color-surface-page", 1.5],
];

function parseBlocks(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const blocks = [...clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  const modes = { dark: new Map(), light: new Map() };

  for (const [, selector, body] of blocks) {
    const target = selector.includes('data-theme="light"') ? "light" : "dark";
    for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g))
      modes[target].set(name, value.trim());
  }

  // El modo claro hereda lo que no redefine.
  modes.light = new Map([...modes.dark, ...modes.light]);
  return modes;
}

function resolve(map, name, depth = 0) {
  const value = map.get(name);
  if (!value || depth > 10) return null;
  const reference = value.match(/^var\((--[\w-]+)\)$/);
  return reference ? resolve(map, reference[1], depth + 1) : value;
}

function luminance(hex) {
  const digits = hex.replace("#", "");
  const full =
    digits.length === 3
      ? [...digits].map((digit) => digit + digit).join("")
      : digits;
  const [r, g, b] = [0, 2, 4].map((offset) => {
    const channel = parseInt(full.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const modes = parseBlocks(await readFile(THEME_FILE, "utf8"));
const failures = [];

for (const [mode, map] of Object.entries(modes)) {
  console.log(`\n${mode}`);
  for (const [foreground, background, minimum] of PAIRS) {
    const fg = resolve(map, foreground);
    const bg = resolve(map, background);
    const isHex = (value) => /^#[\da-f]{3}(?:[\da-f]{3})?$/i.test(value ?? "");

    if (!isHex(fg) || !isHex(bg)) {
      failures.push(
        `${mode}: no se pudo resolver ${foreground} / ${background}`,
      );
      continue;
    }

    const ratio = contrast(fg, bg);
    const ok = ratio >= minimum;
    console.log(
      `  ${ok ? "ok " : "BAJO"} ${ratio.toFixed(2).padStart(5)} ≥ ${minimum}  ${foreground} sobre ${background}`,
    );
    if (!ok)
      failures.push(
        `${mode}: ${foreground} sobre ${background} = ${ratio.toFixed(2)} (< ${minimum})`,
      );
  }
}

if (failures.length) {
  console.error(`\nContraste insuficiente:\n${failures.join("\n")}`);
  process.exitCode = 1;
}
