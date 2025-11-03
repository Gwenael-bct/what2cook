import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Recipes({ recipes, onRecipeClick, handleScroll }) {

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {recipes.map((row, index) =>
            row ? (
                <div
                    key={index}
                    className="relative bg-white rounded-2xl overflow-hidden shadow-md
                    hover:shadow-2xl transform hover:-translate-y-1
                    transition-all duration-300 ease-out group
                    "
                    onClick={() => {
                      onRecipeClick(row.idMeal);
                      handleScroll();
                    }}
                >
                  <img
                      src={row.strMealThumb}
                      alt={row.strMeal}
                      className="w-full h-48 object-cover transition-transform duration-300 ease-out group-hover:scale-105 cursor-pointer group"
                  />

                  <div
                      className="absolute inset-0 bg-black bg-opacity-0
                      transition-opacity duration-300 ease-out pointer-events-none
                      group-hover:bg-opacity-40"
                  >
                  </div>

                  <div className="flex justify-between items-center p-4 relative z-10">
                    <div className="font-semibold text-gray-900 flex">{row.strMeal}</div>
                    <KeyboardArrowRightIcon fontSize="large" className="text-black group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                </div>
            ) : null
        )}
      </div>
  );
}
