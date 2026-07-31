import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the Melt & Sprinkle storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Melt &amp; Sprinkle — Make every snack worth sharing<\/title>/i);
  assert.match(html, /Make every snack/);
  assert.match(html, /Cheese Powder/);
  assert.match(html, /Cash on Delivery/);
  assert.match(html, /cheese-seasoning-front\.png/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/);
});

test("renders checkout and thank-you routes", async () => {
  for (const path of ["/checkout", "/thank-you?orderId=HGF-TEST-1234"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Melt &amp; Sprinkle|melt &amp; sprinkle/i);
  }
});
