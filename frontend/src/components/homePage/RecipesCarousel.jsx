import { useMemo } from 'react';

function importAll(r) {
  return r.keys().map((fileName) => ({
    src: r(fileName),
    name: fileName.split("/").pop().split(".")[0],
  }));
}

const recipeImages = importAll(
    require.context("../../assets/images/homePage/recipes", false, /\.(png|jpe?g|svg|webp)$/)
);

export default function RecipesCarousel() {
  // Duplique une seule fois pour boucle parfaite
  const imagesLoop = useMemo(() => [...recipeImages, ...recipeImages], []);

  return (
      <div className="relative p-6 overflow-hidden carousel-container">
        {/* Masques dégradés pour une fin/début plus doux */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-neutral-900/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-neutral-900/80 to-transparent" />

        <div className="relative">
          <div className="flex gap-4 carousel-scroll">
            {imagesLoop.map((img, i) => (
                <div
                    key={i}
                    className="flex-shrink-0 w-48 flex flex-col items-center rounded-xl bg-white/5 backdrop-blur-md pb-2
                    border border-white/10 shadow-lg hover:shadow-amber-300/20 transition-shadow duration-300 cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-48 h-32 overflow-hidden rounded-t-xl">
                    <img
                        src={img.src}
                        alt={img.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                  </div>
                  <div className="text-center mt-2 text-xs md:text-sm font-semibold text-white/90 px-2 line-clamp-1">
                    {img.name.replace(/-/g, " ")}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}
