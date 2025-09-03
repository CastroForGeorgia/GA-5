import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "assets",
  build: {
    outDir: "../assets/dist",
    emptyOutDir: false,
    manifest: true,
    rollupOptions: {
      input: {
        common: resolve(__dirname, "assets/js/common.js"),
        scripts: resolve(__dirname, "assets/js/scripts.js"),
        main: resolve(__dirname, "assets/css/main.css"),
        // style: resolve(__dirname, "_sass/input.css"),
      },
      output: {
        entryFileNames: "js/[name].[hash].js",
        chunkFileNames: "js/[name].[hash].js",
        assetFileNames: "css/[name].[hash].[ext]",
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
