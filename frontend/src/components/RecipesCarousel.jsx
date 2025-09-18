
function importAll(r) {
  return r.keys().map((fileName) => ({
    src: r(fileName),
    name: fileName.split("/").pop().split(".")[0],
  }));
}

const recipeImages = importAll(
    require.context("../assets/images/homePage/recipes", false, /\.(png|jpe?g|svg)$/)
);

export default function RecipesCarousel() {
  return (
      <div className="bg-yellow-50 bg-opacity-75 p-4 overflow-hidden">
        <div className="carousel flex">
          <div className="carousel-inner flex gap-4 animate-scroll">
            {[...recipeImages, ...recipeImages].map((img, i) => (
                <div
                    key={i}
                    className="flex-shrink-0 w-48 flex flex-col items-center shadow-xl rounded-xl bg-yellow-50 bg-opacity-75 p-4"
                >
                  <div className="inline-flex items-center justify-center">
                    <img
                        src={img.src}
                        alt={img.name}
                        className="rounded-lg shadow w-40 h-40 object-cover"
                    />
                  </div>
                  <div className="text-center mt-2 text-sm font-bold">
                    {img.name.replace(/-/g, " ")}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}
