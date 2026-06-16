import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      entryRoot: "src",
      outDirs: ["dist"],
      include: ["src"],
      exclude: ["cypress/**", "playwright/**"],
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        cypress: resolve(__dirname, "src/cypress/cypress.ts"),
        playwright: resolve(__dirname, "src/playwright/playwright.ts"),
      },
      name: "e2e-mail",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["cypress", "@playwright", "@playwright/test", "openapi-fetch"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
    minify: true,
    outDir: "dist",
    sourcemap: true,
  },
});
