import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => ({
  root: "assets",
  build: {
    outDir: "../assets/dist",
    emptyOutDir: false,
    manifest: true,
    rollupOptions: {
      input: {
        common: resolve(__dirname, "assets/js/common.js"),
        main: resolve(__dirname, "assets/css/main.css"),
      },
      output: {
        entryFileNames: "js/[name].[hash].js",
        chunkFileNames: "js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0];
          if (fileName && fileName.endsWith(".css")) {
            return "css/[name].[hash].css";
          }
          if (fileName && /\.(gif|jpe?g|png|svg|webp|avif)$/i.test(fileName)) {
            return "images/[name].[hash][extname]";
          }
          return "assets/[name].[hash][extname]";
        },
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [
    // Only copy and optimize images in production
    ...(mode === "production"
      ? [
          viteStaticCopy({
            targets: [
              {
                src: "images/**/*",
                dest: "images",
              },
            ],
          }),
        ]
      : []),
  ],
}));
