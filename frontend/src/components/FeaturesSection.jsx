import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import IconCard from './IconCard';

export default function HeroSection() {
  const icons = [
    {
      icon: ShoppingBasketIcon,
      color: "#34d399",
      text: "Find recipes with your ingredients"
    },
    {
      icon: FavoriteIcon,
      gradientId: "fav-gradient",
      gradient: [
        {offset: "0%", color: "#34d399"},
        {offset: "100%", color: "#ffa67b"},
      ],
      text: "Save your favorite recipes"
    },
    {
      icon: AccessTimeIcon,
      color: "#ffa67b",
      text: "Quick and easy suggestion"
    },
  ]

  return (
      <div className="bg-yellow-50 px-4 py-16 sm:px-8 md:px-12 lg:px-24 bg-opacity-75">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {
              icons.map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-4">
                    <div className="shadow-xl rounded-xl bg-yellow-50 bg-opacity-75 p-3 inline-flex items-center justify-center">
                      <IconCard
                          icon={item.icon}
                          gradientId={item.gradientId}
                          gradient={item.gradient}
                          color={item.color}
                      />
                    </div>
                    <div className="text-center pt-2 text-sm md:text-base font-medium">{item.text}</div>
                  </div>
              ))

            }
        </div>
      </div>
  );
}
