import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import IconCard from './IconCard';
import RecipesCarousel from './RecipesCarousel';

export default function HeroSection() {
  const icons = [
    { icon: ShoppingBasketIcon, color: "#34d399", text: "Find recipes with your ingredients" },
    { icon: FavoriteIcon, color: "#34d399", text: "Save your favorite recipes" },
    { icon: AccessTimeIcon, color: "#fa823a", text: "Quick and easy suggestion" },
  ];

  return (
      <div className="
      bg-cyan-950 bg-opacity-75 w-full flex flex-col md:flex-row items-stretch gap-8"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-stretch gap-8">
          {/* 🔹 Colonne icônes */}
          <div className="
        w-full md:w-1/3 min-w-[320px]
        flex items-center justify-center"
          >

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {icons.map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-4">
                    <div className="shadow-xl rounded-xl p-3 inline-flex items-center justify-center">
                      <IconCard icon={item.icon} color={item.color} />
                    </div>
                    <div className="text-center text-white pt-2 text-sm md:text-base font-medium">
                      {item.text}
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* 🔹 Carrousel */}
          <div className="w-full md:w-2/3">
            <RecipesCarousel />
          </div>
        </div>
      </div>
  );
}

