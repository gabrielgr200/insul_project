const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, "../app/utils/voiceMessage.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const helper = {};
new Function("exports", compiled)(helper);

test("formats real durations safely, including WebM non-finite metadata", () => {
  assert.equal(helper.formatVoiceTime(3.9), "0:03");
  assert.equal(helper.formatVoiceTime(125), "2:05");
  for (const value of [Infinity, NaN, -1, 0]) assert.equal(helper.formatVoiceTime(value), "0:00");
});
test("silence and empty audio produce stable flat bars", () => {
  assert.deepEqual(helper.voiceWaveform(new Float32Array(0)), Array(32).fill(3));
  assert.deepEqual(helper.voiceWaveform(new Float32Array(1024)), Array(32).fill(3));
});
test("waveform represents changes in the actual audio without random render changes", () => {
  const samples = new Float32Array(1024);
  samples.fill(0.5, 512);
  const waveform = helper.voiceWaveform(samples);
  assert.deepEqual(waveform, helper.voiceWaveform(samples));
  assert.ok(waveform.slice(0, 16).every(value => value === 3));
  assert.ok(waveform.slice(16).every(value => value === 22));
});

test("playback bars change with the sound at the current playback position", () => {
  const samples = new Float32Array(2000);
  samples.fill(0.25, 1000);
  assert.deepEqual(helper.voicePlaybackBars(samples, 1000, 0), Array(30).fill(4));
  assert.deepEqual(helper.voicePlaybackBars(samples, 1000, 1), Array(30).fill(16));
  assert.deepEqual(helper.voicePlaybackBars(samples, 1000, 3), Array(30).fill(4));
  assert.deepEqual(helper.voicePlaybackBars(samples, 1000, NaN), Array(30).fill(4));
});
