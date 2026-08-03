import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("map route renders the timeline and Mylae state", async () => {
  const response = await render("/map");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /ROMAN CAMPAIGN ATLAS/);
  assert.match(html, /Campaign year/);
  assert.match(html, /264 BCE/);
  assert.match(html, /Battle of Messana/);
  const panelSource = await readFile(new URL("../components/map/BattlePanel.tsx", import.meta.url), "utf8");
  assert.match(panelSource, /href=\{`\/battles\/\$\{battle\.slug\}`\}/);
});

test("Mylae detail route renders the full data-driven account", async () => {
  const response = await render("/battles/mylae");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Battle of Mylae/);
  assert.match(html, /What remains uncertain/);
  assert.match(html, /Ancient testimony/);
  assert.match(html, /Return to campaign map/);
});
