import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const outputUrl = new URL("../docs/", import.meta.url);
const clientUrl = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", Date.now().toString());

await rm(outputUrl, { recursive: true, force: true });
await mkdir(outputUrl, { recursive: true });
await cp(clientUrl, outputUrl, { recursive: true });

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://azure-wll.github.io/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static export failed with HTTP ${response.status}`);
}

const html = await response.text();
await writeFile(new URL("index.html", outputUrl), html);
await writeFile(new URL("404.html", outputUrl), html);
await writeFile(new URL(".nojekyll", outputUrl), "");

console.log("GitHub Pages export ready in docs/");
