import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        cypress: resolve(__dirname, "src/cypress/index.ts"),
        playwright: resolve(__dirname, "src/playwright/index.ts"),
      },
      name: "e2e-mail",
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ["cypress", "@playwright", "@playwright/test", "openapi-fetch"],
    },
    outDir: "dist",
    sourcemap: true,
  },
});
