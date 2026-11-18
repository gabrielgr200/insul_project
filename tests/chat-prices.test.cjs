const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function load(file, imports = {}) {
  const output = ts.transpileModule(fs.readFileSync(path.join(__dirname, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  new Function("exports", "require", output)(exports, name => {
    if (!(name in imports)) throw new Error(`Unexpected dependency: ${name}`);
    return imports[name];
  });
  return exports;
}
const catalog = load("../app/api/chat/priceCatalog.ts");

test("Campeira Java selects only its own store listing, including aliases", () => {
  for (const message of ["Qual o preço da Campeira Java?", "valor da java", "Cerca Java", "campeira-java"]) {
    const matches = catalog.findPriceMatches(message);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].label, "Cerca Campeira Java Insul");
    assert.ok(matches[0].slug.startsWith("cerca-pronta-campeira-java-"));
  }
});
test("specific products do not select generic alternatives", () => {
  assert.deepEqual(catalog.findPriceMatches("campeira maxx").map(item => item.label), ["Cerca Campeira Maxx"]);
  assert.deepEqual(catalog.findPriceMatches("morada leve").map(item => item.label), ["Tela Morada Leve"]);
  assert.equal(catalog.findPriceMatches("javali").length, 0);
});
test("comparisons retain separate explicit mentions", () => {
  const matches = catalog.findPriceMatches("Compare campeira java e campeira");
  assert.equal(matches.length, 2);
  assert.ok(matches.some(item => item.label === "Cerca Campeira"));
});
test("follow-up pricing retains the product and prioritizes the newly requested height", () => {
  const query = catalog.resolvePriceQuery("E quanto custa em 1,80m?", [{ text: "Campeira Java de 1,20m" }]);
  assert.ok(query.startsWith("E quanto custa em 1,80m?"));
  assert.equal(catalog.findPriceMatches(query)[0].label, "Cerca Campeira Java Insul");
  assert.equal(catalog.resolvePriceQuery("Obrigado", [{ text: "Campeira Java" }]), "Obrigado");
  assert.equal(catalog.resolvePriceQuery("preço da titan", [{ text: "Campeira Java" }]), "preço da titan");
});
test("Puter context includes Java live prices and never calls the generic Campeira listing", async () => {
  const oldFetch = global.fetch;
  const oldProvider = process.env.CHAT_PROVIDER;
  process.env.CHAT_PROVIDER = "puter";
  let requests = 0;
  global.fetch = async url => {
    requests++;
    assert.ok(String(url).includes("cerca-pronta-campeira-java-"));
    return Response.json({ conteudo: {
      precos: { por: 800, vista: 760 },
      atributos: { simples: { nome: "Altura", valores: [
        { label: "1,20m", precos: { por: 800, vista: 760 } },
        { label: "1,80m", precos: { por: 1000, vista: 950 } },
      ] } },
    } });
  };
  try {
    const route = load("../app/api/chat/route.ts", {
      "../_lib/security": load("../app/api/_lib/security.ts", { "node:crypto": require("node:crypto") }),
      "./priceCatalog": catalog,
      "./openai": { requestOpenAI: () => { throw new Error("Puter must not call OpenAI"); } },
      "../../assets/data": { cercasProntas: [], soldadasHexagonais: [], gradilModels: [] },
    });
    const response = await route.POST(new Request("http://localhost/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Quanto custa em 1,80m?", history: [{ role: "user", text: "Campeira Java" }] }),
    }));
    const result = await response.json();
    assert.equal(response.status, 200);
    assert.equal(result.provider, "puter");
    const context = result.messages[0].content;
    assert.match(context, /Cerca Campeira Java Insul \(altura 1,80m\)/);
    assert.match(context, /R\$ 950,00/);
    assert.equal(requests, 1);
  } finally {
    global.fetch = oldFetch;
    if (oldProvider === undefined) delete process.env.CHAT_PROVIDER;
    else process.env.CHAT_PROVIDER = oldProvider;
  }
});
