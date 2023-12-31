const g = require("@esbuild-plugins/node-globals-polyfill");
const m = require("@esbuild-plugins/node-modules-polyfill");

const modules = m.NodeModulesPolyfillPlugin();

const define = { global: "window" };
// To replace process.env calls in middleware with variable values during build time
for (const variable in process.env) {
  define[`process.env.${variable}`] = JSON.stringify(process.env[variable]);
}

// Verify env file is filled out
if (
  !process.env.CONTRACT_ADDRESS ||
  !process.env.CHAIN_URI ||
  !process.env.CHAIN_ID ||
  !process.env.BACKEND_URI
)
  throw new Error("Please ensure you have filled out your .env file");

const global = g.NodeGlobalsPolyfillPlugin({
  process: true,
  buffer: true,
  define: { "process.env.var": '"hello"' }, // inject will override define, to keep env vars you must also pass define here https://github.com/evanw/esbuild/issues/660
});
const esbuild = require("esbuild");
const { dtsPlugin } = require("esbuild-plugin-d.ts");
const config = {
  // JS output from previous compilation step used here instead of index.ts to have more control over the TS build process
  entryPoints: ["build/index.js"],
  bundle: true,
  format: "esm",
  define,
  outfile: "packaged/middleware.js",
  plugins: [global, modules, dtsPlugin()],
  external: ["pg-native"],
};

esbuild.build(config);
