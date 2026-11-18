const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, "../app/utils/puterChat.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const helper = {};
new Function("exports", compiled)(helper);

test("extracts string and multipart text, excluding other content", () => {
  assert.equal(helper.puterResponseText({ message: { content: " Olá! " } }), "Olá!");
  assert.equal(helper.puterResponseText({ message: { content: [{ type: "thinking", text: "private" }, { type: "text", text: "Olá" }, { type: "text", text: "!" }] } }), "Olá!");
});
test("rejects empty or invalid model responses", () => {
  assert.throws(() => helper.puterResponseText({}));
  assert.throws(() => helper.puterResponseText({ message: { content: "  " } }));
});
test("starts authentication synchronously and reuses the signed-in session", async () => {
  let signedIn = false;
  let calls = 0;
  global.window = { puter: { auth: { isSignedIn: () => signedIn, signIn: () => { calls++; return Promise.resolve(); } } } };
  const pending = helper.authenticatePuter();
  assert.equal(calls, 1);
  await pending;
  signedIn = true;
  await helper.authenticatePuter();
  assert.equal(calls, 1);
});
test("forwards system context and history to the selected model", async () => {
  const messages = [{ role: "system", content: "Catálogo Insul" }, { role: "user", content: "Qual tela?" }];
  global.window = { puter: { ai: { chat: async (input, options) => {
    assert.deepEqual(input, messages);
    assert.deepEqual(options, { model: "gpt-4.1-mini", max_tokens: 1024 });
    return { message: { content: "Olá!" } };
  } } } };
  assert.equal(await helper.askPuter(messages, "gpt-4.1-mini"), "Olá!");
});

test("uploads an image, passes its file reference, and deletes only that temporary file", async () => {
  let removed;
  const messages = [{ role: "system", content: "Catálogo Insul" }, { role: "user", content: "Qual é esta tela?" }];
  const file = new File(["test image"], "tela.png", { type: "image/png" });
  global.window = { puter: {
    fs: {
      upload: async files => { assert.equal(files.length, 1); assert.ok(files[0].name.endsWith("-tela.png")); return [{ path: "/test/tela.png" }]; },
      delete: async (path, options) => { removed = path; assert.equal(options.recursive, false); },
    },
    ai: { chat: async input => {
      assert.deepEqual(input[0], messages[0]);
      assert.deepEqual(input[1].content, [{ type: "file", puter_path: "/test/tela.png" }, { type: "text", text: "Qual é esta tela?" }]);
      assert.equal(messages[1].content, "Qual é esta tela?");
      return { message: { content: "Uma tela soldada." } };
    } },
  } };
  assert.equal(await helper.askPuter(messages, "gpt-4.1-mini", file), "Uma tela soldada.");
  assert.equal(removed, "/test/tela.png");
});

test("cleans up uploaded image when model fails", async () => {
  let removed = false;
  global.window = { puter: {
    fs: { upload: async () => ({ path: "/test/failed.png" }), delete: async () => { removed = true; } },
    ai: { chat: async () => { throw new Error("unavailable"); } },
  } };
  await assert.rejects(helper.askPuter([{ role: "user", content: "Imagem" }], "gpt-4.1-mini", new File(["test"], "test.png")));
  assert.equal(removed, true);
});

test("transcribes the actual audio with a language hint", async () => {
  const file = new File(["audio"], "audio.webm", { type: "audio/webm" });
  global.window = { puter: { ai: { speech2txt: async (input, options) => {
    assert.equal(input, file);
    assert.deepEqual(options, { language: "pt" });
    return { text: " Preciso de uma cerca para gado. " };
  } } } };
  assert.equal(await helper.transcribePuter(file, "pt-BR"), "Preciso de uma cerca para gado.");
});

test("does not invent a transcript for empty audio recognition", async () => {
  global.window = { puter: { ai: { speech2txt: async () => ({ text: " " }) } } };
  await assert.rejects(helper.transcribePuter(new File(["audio"], "audio.webm"), "pt"));
});
