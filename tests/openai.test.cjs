const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, "../app/api/chat/openai.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const helper = {};
new Function("exports", "require", compiled)(helper, require);

function scenario(responses) {
  const delays = [];
  let calls = 0;
  return {
    delays,
    get calls() { return calls; },
    run: () => helper.requestOpenAI("fake-test-key", "test-model", "{}", {
      random: () => 0,
      sleep: async ms => { delays.push(ms); },
      fetch: async (url, options) => {
        assert.ok(!url.includes("fake-test-key"));
        assert.equal(options.headers.Authorization, "Bearer fake-test-key");
        const response = responses[calls++];
        if (response instanceof Error) throw response;
        return response;
      },
    }),
  };
}
const success = () => Response.json({ output: [{ type: "reasoning", content: [{ text: "internal" }] }, { type: "message", content: [{ type: "output_text", text: "Olá" }, { type: "output_text", text: "!" }] }] });

test("503 waits progressively and recovers; excludes thinking text", async () => {
  const s = scenario([new Response(null, { status: 503 }), new Response(null, { status: 503 }), success()]);
  assert.deepEqual(await s.run(), { reply: "Olá!" });
  assert.deepEqual(s.delays, [1000, 2000]);
  assert.equal(s.calls, 3);
});
test("invalid credentials are not retried", async () => {
  const s = scenario([new Response(null, { status: 403 })]);
  assert.equal((await s.run()).status, 403);
  assert.equal(s.calls, 1);
  assert.deepEqual(s.delays, []);
});
test("honors Retry-After when within the response budget", async () => {
  const s = scenario([new Response(null, { status: 429, headers: { "Retry-After": "3" } }), success()]);
  assert.equal((await s.run()).reply, "Olá!");
  assert.deepEqual(s.delays, [3000]);
});
test("long quota cooldown returns immediately rather than ignoring Retry-After", async () => {
  const s = scenario([new Response(null, { status: 429, headers: { "Retry-After": "60" } })]);
  assert.equal((await s.run()).status, 429);
  assert.equal(s.calls, 1);
});
test("persistent outage stops after three attempts", async () => {
  const s = scenario(Array.from({ length: 3 }, () => new Response(null, { status: 503 })));
  assert.deepEqual(await s.run(), { error: "OpenAI HTTP 503", status: 503, attempts: 3 });
  assert.equal(s.calls, 3);
});
test("network errors recover without exposing upstream error details", async () => {
  const s = scenario([new TypeError("fetch failed"), success()]);
  assert.equal((await s.run()).reply, "Olá!");
  assert.deepEqual(s.delays, [1000]);
});
test("empty or blocked content is not retried", async () => {
  const s = scenario([Response.json({ promptFeedback: { blockReason: "SAFETY" } })]);
  assert.equal((await s.run()).status, 502);
  assert.equal(s.calls, 1);
});
