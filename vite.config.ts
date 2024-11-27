/// <reference types="vitest"/>
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTest.ts",
    globals: true,
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@http": "/src/http",
      "@lib": "/src/lib",
      "@pages": "/src/pages",
      "@src": "/src",
    },
  },
});
