import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";

const optimizeImages = async () => {
  console.log("Optimizing images...");

  const files = await imagemin(
    ["assets/dist/images/**/*.{jpg,jpeg,png,gif,svg}"],
    {
      destination: "assets/dist/images",
      plugins: [
        imageminMozjpeg({ quality: 85, progressive: true }),
        imageminPngquant({ quality: [0.8, 0.9], speed: 4 }),
        imageminGifsicle({ optimizationLevel: 7 }),
        imageminSvgo({
          plugins: [
            {
              name: "preset-default",
              params: { overrides: { removeViewBox: false } },
            },
          ],
        }),
      ],
    }
  );

  console.log(`Optimized ${files.length} images`);
};

optimizeImages().catch(console.error);
