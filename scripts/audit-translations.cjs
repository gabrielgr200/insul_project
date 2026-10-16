const ts = require("typescript"), fs = require("fs"), path = require("path");
function loadDictionary(locale) {
  const code = ts.transpileModule(fs.readFileSync(`app/i18n/${locale}.ts`, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function("exports", "require", "module", code)(module.exports, require, module);
  return module.exports.default;
}
const dictionaries = ["pt", "en", "es"].map(loadDictionary);
const normalize = (value) => value.replace(/\s+/g, " ").trim();
const known = new Set();
function flatten(value) {
  if (typeof value === "string") known.add(normalize(value));
  else if (value && typeof value === "object") Object.values(value).forEach(flatten);
}
flatten(dictionaries[0]);
const visibleFields = new Set(["name", "label", "title", "subtitle", "description", "paragraph", "shortDescription", "text", "badge", "eyebrow", "caption", "alt", "heading", "detailName", "detailDescription", "placeholder"]);
const remaining = new Map();
const files = ["app/assets/data.ts", ...["app/components", "app/pages"].flatMap((dir) => fs.readdirSync(dir).filter((file) => file.endsWith(".tsx")).map((file) => path.join(dir, file)))];
for (const file of files) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  function add(text) {
    text = normalize(text);
    if (!/[A-Za-zÀ-ÿ]{3}/.test(text) || text.startsWith("/") || known.has(text)) return;
    if (/^(?:Insul\.?|INSUL|Casa das Cercas|WhatsApp|Facebook|Youtube|Instagram|Guilherme|Fenix|Campeira(?: Maxx| Boi)?|G\d+|BWG \d+|reel-\d+|contato@.*)$/.test(text)) return;
    if (/^(?:Tela|Cerca|Gradil) (?:[A-Z]|Fênix)/.test(text) && text.length < 60 && !/[.,]/.test(text)) return;
    if (!remaining.has(text)) remaining.set(text, []);
    remaining.get(text).push(file);
  }
  function visit(node) {
    if (ts.isJsxText(node)) add(node.text);
    if (ts.isPropertyAssignment(node) && visibleFields.has(node.name.getText(source).replace(/["']/g, "")) && ts.isStringLiteral(node.initializer)) add(node.initializer.text);
    if (ts.isCallExpression(node) && node.expression.getText(source) === "translateText" && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) add(node.arguments[0].text);
    if (ts.isJsxAttribute(node) && visibleFields.has(node.name.getText(source)) && node.initializer && ts.isStringLiteral(node.initializer)) add(node.initializer.text);
    ts.forEachChild(node, visit);
  }
  visit(source);
}
const results = [...remaining].map(([text, files]) => ({ text, files: [...new Set(files)] }));
if (process.argv.includes("--write")) fs.writeFileSync("scripts/untranslated-copy.json", JSON.stringify(results, null, 2));
console.log(`${results.length} additional source strings need review.`);
const offset = Number(process.argv.find((arg) => /^--offset=/.test(arg))?.split("=")[1] ?? 0);
console.log(results.slice(offset, offset + 70).map(({ text }, index) => `${offset + index}: ${text}`).join("\n"));

function parity(source, target, trail = "") {
  if (Array.isArray(source) && source.every((value) => typeof value === "string")) return;
  for (const key of Object.keys(source)) {
    if (!(key in target)) throw new Error(`Missing translation: ${trail}${key}`);
    if (source[key] && typeof source[key] === "object") parity(source[key], target[key], `${trail}${key}.`);
  }
}
parity(dictionaries[0], dictionaries[1], "en.");
parity(dictionaries[0], dictionaries[2], "es.");
console.log("English and Spanish keys match Portuguese.");
