import { readdir, readFile } from "node:fs/promises";
import { join, sep } from "node:path";

// Único lugar donde se permiten colores literales.
const ALLOWED_DIR = join("src", "styles", "theme") + sep;
const ROOTS = ["src", "index.html"];
const EXTENSIONS = [".vue", ".ts", ".css", ".html"];
// Los nombres de color solo se buscan en estilos y plantillas: los datos contienen prosa.
const NAMED_EXTENSIONS = [".vue", ".css", ".html"];

const literal =
  /#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix)\(/i;
const named =
  /(?:[:=]\s*["']?)[^;"']*\b(?:white|black|red|green|blue|yellow|orange|purple|gray|grey|pink|brown|navy|teal|silver|gold)\b/i;

async function collect(path) {
  const entries = await readdir(path, { withFileTypes: true }).catch(
    () => null,
  );
  if (!entries) return [path];

  const nested = await Promise.all(
    entries.map((entry) => collect(join(path, entry.name))),
  );
  return nested.flat();
}

const files = (await Promise.all(ROOTS.map(collect)))
  .flat()
  .filter((file) => EXTENSIONS.some((extension) => file.endsWith(extension)))
  .filter((file) => !file.startsWith(ALLOWED_DIR));

const violations = [];

for (const file of files) {
  const checkNames = NAMED_EXTENSIONS.some((extension) =>
    file.endsWith(extension),
  );
  const content = await readFile(file, "utf8");

  content.split(/\r?\n/).forEach((line, index) => {
    if (literal.test(line) || (checkNames && named.test(line)))
      violations.push(`${file}:${index + 1}: ${line.trim()}`);
  });
}

if (violations.length) {
  console.error(
    `Colores literales fuera de ${ALLOWED_DIR}. Usa tokens --jnv-* o --pf-*:\n` +
      violations.join("\n"),
  );
  process.exitCode = 1;
} else {
  console.log(`Sin colores literales en ${files.length} archivos.`);
}
