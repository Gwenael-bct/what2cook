export default function HeroSection() {
  return (
      <div
          className="
        bg-no-repeat bg-center bg-cover
        flex flex-col justify-center items-center
        px-4 py-16 sm:px-8 md:px-12 lg:px-24
        max-w-6xl mx-auto
      "
          style={{ backgroundImage: "url('/assets/images/homePage/header.png')" }}
      >
        <div
            className="
          w-full max-w-sm transition ease-in-out
          p-4 bg-gray-200 rounded-xl shadow-lg bg-opacity-75
          flex flex-col gap-2 md:flex-row md:gap-4 md:max-w-lg
        "
        >
          <input
              placeholder="Enter your ingredients..."
              className="
            flex-1 bg-white
            p-3 border border-emerald-500 rounded-full bg-opacity-85
            text-center
            focus:outline-none focus:ring-1 focus:ring-emerald-500
          "
          />
          <button
              className="
            bg-orange-400 font-bold text-white
            px-6 py-3 rounded-full
            whitespace-nowrap
            bg-opacity-85 hover:bg-orange-500
          "
          >
            Find Recipes
          </button>
        </div>
      </div>
  );
}
