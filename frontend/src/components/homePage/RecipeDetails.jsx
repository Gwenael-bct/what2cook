import React, { useEffect, useState } from "react";

export default function RecipeDetails({ recipeDetails, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (recipeDetails) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [recipeDetails]);

  if (!recipeDetails) return null;

  return (
      <div className={`w-full transition-opacity duration-500 z-40 ${visible ? "opacity-95" : "opacity-0 pointer-events-none"}`}>
        <div className="relative bg-black/60 bg-gradient-to-b backdrop-blur-2xl from-black/80 to-transparent
         rounded-3xl px-6 py-8 w-full shadow-2xl border border-white/10 pointer-events-auto">
          {/* Bouton fermer */}
          <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-orange-400"
          >
            &times;
          </button>

          {/* Contenu recette */}
          <h3 className="font-bold text-3xl text-white mb-4">{recipeDetails.strMeal}</h3>
          <img
              src={recipeDetails.strMealThumb}
              alt={recipeDetails.strMeal}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-4"
          />
          <p className="text-white mb-4 whitespace-pre-line">{recipeDetails.strInstructions}</p>
          <p className="text-white mb-1"><strong>Catégorie :</strong> {recipeDetails.strCategory}</p>
          <p className="text-white mb-4"><strong>Origine :</strong> {recipeDetails.strArea}</p>
        </div>
      </div>
  );
}
