import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
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
        scripts: resolve(__dirname, "assets/js/scripts.js"),
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
          ViteImageOptimizer({
            test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
            gifsicle: { optimizationLevel: 7 },
            mozjpeg: { quality: 85, progressive: true },
            pngquant: { quality: [0.8, 0.9], speed: 4 },
            svgo: {
              plugins: [
                {
                  name: "preset-default",
                  params: { overrides: { removeViewBox: false } },
                },
              ],
            },
            webp: { quality: 85 },
            avif: { quality: 85 },
            cache: true,
            cacheLocation: ".vite-image-optimizer-cache",
            // Configure to optimize files in the output directory
            logStats: true,
          }),
        ]
      : []),
  ],
}));
