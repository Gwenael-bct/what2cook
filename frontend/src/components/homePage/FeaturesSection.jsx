import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import IconCard from '../IconCard';
import RecipesCarousel from './RecipesCarousel';

export default function FeaturesSection() {
  const icons = [
    { icon: ShoppingBasketIcon, color: "#34d399", text: "Find recipes with your ingredients" },
    { icon: FavoriteIcon, color: "#34d399", text: "Save your favorite recipes" },
    { icon: AccessTimeIcon, color: "#fa823a", text: "Quick and easy suggestion" },
  ];

  return (
      <div className="bg-transparent w-full flex justify-center py-6 md:py-12">
        <div className="container mx-auto flex flex-col md:flex-row gap-6 md:gap-8">

          {/* 🔹 Colonne icônes */}
          {/*<div className="flex-1 md:flex-[1] flex items-center justify-center">*/}
          {/*  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-full">*/}
          {/*    {icons.map((item, i) => (*/}
          {/*        <div key={i} className="flex flex-col items-center p-4">*/}
          {/*          <div className="shadow-xl rounded-xl p-3 inline-flex items-center justify-center">*/}
          {/*            <IconCard icon={item.icon} color={item.color} />*/}
          {/*          </div>*/}
          {/*          <div className="text-center text-white pt-2 text-sm md:text-base font-medium">*/}
          {/*            {item.text}*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* 🔹 Carrousel */}
          <div className="flex-1 md:flex-[2] overflow-x-hidden">
            <RecipesCarousel />
          </div>
        </div>
      </div>
  );
}


