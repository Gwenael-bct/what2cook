import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Recipes({ recipes, onRecipeClick, handleScroll }) {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 16;

  // Calculer les recettes à afficher
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-2 md:p-4">
          {currentRecipes.map((row, index) =>
              row ? (
                  <div
                      key={index}
                      className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md
                      hover:shadow-2xl transform hover:-translate-y-1
                      transition-all duration-300 ease-out group cursor-pointer
                      "
                      onClick={() => {
                        onRecipeClick(row.idMeal);
                        handleScroll();
                      }}
                  >
                    <img
                        src={row.strMealThumb}
                        alt={row.strMeal}
                        className="w-full h-24 sm:h-32 md:h-40 lg:h-48 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />

                    <div
                        className="absolute inset-0 bg-black bg-opacity-0
                        transition-opacity duration-300 ease-out pointer-events-none
                        group-hover:bg-opacity-40"
                    >
                    </div>

                    <div className="flex justify-between items-center p-2 md:p-4 relative z-10">
                      <div className="font-semibold text-gray-900 text-xs md:text-base line-clamp-2">{row.strMeal}</div>
                      <KeyboardArrowRightIcon
                        fontSize="medium"
                        className="text-black group-hover:text-orange-400 transition-colors duration-300 flex-shrink-0 hidden md:block"
                      />
                    </div>
                  </div>
              ) : null
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 mb-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white hover:bg-orange-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeftIcon />
            </button>

            <div className="flex gap-1 md:gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                // Afficher uniquement certaines pages pour éviter trop de boutons
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={index}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-1 md:px-4 md:py-2 rounded-lg font-semibold transition-all text-sm md:text-base ${
                        currentPage === pageNumber
                          ? 'bg-orange-500 text-white'
                          : 'bg-white hover:bg-gray-200'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                // Afficher "..." entre les groupes de pages
                if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return <span key={index} className="px-2 text-gray-500">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white hover:bg-orange-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </div>
  );
}
