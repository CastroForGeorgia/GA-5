import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "assets",
  build: {
    outDir: "../_site/assets",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        common: resolve(__dirname, "assets/js/common.js"),
        scripts: resolve(__dirname, "assets/js/scripts.js"),
        main: resolve(__dirname, "assets/css/main.css"),
        // style: resolve(__dirname, "_sass/input.css"),
      },
      output: {
        entryFileNames: "assets/js/[name].[hash].js",
        chunkFileNames: "assets/js/[name].[hash].js",
        assetFileNames: "assets/css/[name].[hash].[ext]",
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
