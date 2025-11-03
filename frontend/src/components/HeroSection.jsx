import SearchIcon from '@mui/icons-material/Search';
import Header from './Header';
export default function HeroSection() {
  return (
      <div
          className="
          h-screen
          bg-contain relative
          flex flex-col justify-center items-center
        "
          style={{
            backgroundImage: "url('/assets/images/homePage/hero_banner.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'top'
          }}
      >
        <Header />
        <div className="grid-cols-1 flex flex-col justify-center items-center">

          <h1 className="text-3xl m-6 md:text-3xl font-medium text-white">
            Transform your ingredients into extraordinary dishes
          </h1>

          <div
              className="
          w-full max-w-sm transition ease-in-out
          p-2 bg-transparent rounded-xl shadow-lg bg-opacity-75
          flex flex-col gap-2 md:flex-row md:gap-2 md:max-w-lg
          border-amber-100 border-2
        "
          >
            <div className="hidden items-center bg-white rounded-xl px-5 py-2 relative md:flex-1 md:flex">
              <SearchIcon className="text-gray-400"/>
              <input
                  placeholder="Enter your ingredients..."
                  className="
                    flex-1 bg-white
                    p-2 rounded-xl bg-opacity-85
                    outline-none focus:outline-none"
              />
            </div>

            <button
                className="
            bg-orange-500 font-bold text-white
            px-6 py-3 rounded-xl
            whitespace-nowrap
          hover:bg-black bg-opacity-95
          "
            >
              Find Recipes
            </button>
          </div>

        </div>
      </div>
  );
}
