const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const assert = require("node:assert/strict");
const cache = new Map();

function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 } }).outputText;
  const localRequire = (request) => request.startsWith(".")
    ? load(path.resolve(path.dirname(file), request) + ".ts")
    : require(request);
  new Function("exports", "require", "module", code)(module.exports, localRequire, module);
  return module.exports;
}

const pt = load("app/i18n/pt.ts").default;
const en = load("app/i18n/en.ts").default;
const es = load("app/i18n/es.ts").default;
const { translateContentText: translate } = load("app/utils/translateText.ts");
assert.equal(translate("Detalhes da instalação", en), "Installation details");
assert.equal(translate("Detalhes da instalação", es), "Detalles de la instalación");
assert.equal(translate("Vídeo: Poste T de aço", en), "Video: Steel T-post");
assert.equal(translate("Mudar para Batedor manual", es), "Cambiar a Hincapostes manual");
assert.equal(translate("Ver detalhes de Catraca Micro", en), "View details of Micro wire strainer");
assert.equal(translate("  Detalhes da instalação  ", en), "  Installation details  ");
assert.equal(translate("até 4,5m", es), "hasta 4,5 m");
assert.equal(translate("Tela Titan", en), "Titan mesh");
assert.equal(translate("Texto novo ainda não cadastrado", es), "Texto novo ainda não cadastrado");
assert.equal(translate("Detalhes da instalação", pt), "Detalhes da instalação");
const data = { slug: "campeira", src: "/images/campeira.png" };
assert.equal(translate(data, es), data);
assert.equal(translate(12, en), 12);
console.log("Translation rendering checks passed (EN/ES, templates, measurements, model names and PT fallback).");
