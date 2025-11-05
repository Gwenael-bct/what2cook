import React, { useEffect, useMemo, useState } from "react";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';

function CreateButton({ icon: Icon, text }) {
  return (
      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all text-sm font-medium shadow-md hover:shadow-lg">
        <Icon fontSize="small" />
        <span>{text}</span>
      </button>
  );
}

export default function RecipeDetails({ recipeDetails, onClose }) {
  const [visible, setVisible] = useState(false);

  const ingredients = useMemo(() => {
    if (!recipeDetails) return [];
    const items = [];
    for (let i = 1; i <= 20; i += 1) {
      const ing = recipeDetails[`strIngredient${i}`];
      const qty = recipeDetails[`strMeasure${i}`];
      if (ing && ing.trim()) items.push({name: ing, qty: qty || ""});
    }
    return items;
  }, [recipeDetails]);

  useEffect(() => {
    if (recipeDetails) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [recipeDetails]);

  if (!recipeDetails) return null;

  const instructions = recipeDetails.strInstructions
      ?.replace(/\r\n/g, "\n")
      .split(/\n+/)
      .map((step) => step.trim())
      .filter((step) => step.length > 0) || [];

  return (
      <div
          className={`w-full z-40 transition-all duration-500 ease-out mt-6 ${
              visible ? "opacity-95 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
      >
        <div
            className="relative bg-white rounded-3xl w-full overflow-hidden shadow-2xl max-h-[82vh] overflow-y-auto scroll-smooth overscroll-contain"
        >
          {/* Header avec image de fond */}
          <div className="sticky top-0 z-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4 py-6 md:px-8 md:py-10 relative overflow-hidden">
            {/* Image de fond avec overlay */}
            <div className="absolute inset-0 opacity-20">
              <img
                  src={recipeDetails.strMealThumb}
                  alt=""
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
            </div>

            <button
                onClick={onClose}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-20 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <CloseIcon fontSize="medium"/>
            </button>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center max-w-6xl mx-auto">
              {/* Titre */}
              <div>
                <h1 className="font-bold text-2xl md:text-4xl text-white mb-2">
                  {recipeDetails.strMeal}
                </h1>
                <p className="text-gray-300 text-sm md:text-base">
                  Transformez vos ingrédients en plats extraordinaires
                </p>
              </div>

              {/* Image centrale */}
              <div className="hidden md:flex justify-center">
                <img
                    src={recipeDetails.strMealThumb}
                    alt={recipeDetails.strMeal}
                    className="h-44 w-44 object-cover rounded-2xl ring-4 ring-orange-500/50 shadow-2xl"
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col gap-2.5">
                <CreateButton icon={TaskAltIcon} text="Recette terminée"/>
                <CreateButton icon={SendIcon} text="Partager"/>
                <CreateButton icon={FavoriteBorderIcon} text="Ajouter aux favoris"/>
              </div>
            </div>
          </div>

          {/* Contenu scrollable */}
          <div className="overflow-y-auto bg-gray-50 h-full scrollbar-hide">
            <div className="px-4 py-6 md:px-8 md:py-8">
              {/* Layout Desktop: 2 colonnes / Mobile: 1 colonne */}
              <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 max-w-6xl mx-auto">
                {/* Colonne gauche - Ingrédients */}
                <div>
                  <h2 className="font-bold text-2xl text-gray-900 mb-4">Ingrédients</h2>
                  <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2">
                    {ingredients.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all hover:shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center shadow-sm">
                              <img
                                  src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                                      item.name
                                  )}-Small.png`}
                                  alt={item.name}
                                  className="h-10 w-10 rounded-lg object-cover saturate-150 flex-shrink-0"
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">
                                {item.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {recipeDetails.strCategory || 'Ingredient'}
                              </div>
                            </div>
                          </div>
                          <div className="text-orange-600 font-bold text-sm bg-orange-50 px-3 py-1 rounded-lg">
                            {item.qty}
                          </div>
                        </div>
                    ))}
                  </div>

                  {/* Informations supplémentaires */}
                  <div className="mt-6 space-y-3">
                    <h3 className="font-bold text-xl text-gray-900">Informations</h3>
                    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 text-sm font-medium">Catégorie</span>
                        <span className="font-semibold text-gray-900 text-sm bg-gray-100 px-3 py-1 rounded-lg">
                        {recipeDetails.strCategory}
                      </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm font-medium">Origine</span>
                        <span className="font-semibold text-gray-900 text-sm bg-gray-100 px-3 py-1 rounded-lg">
                        {recipeDetails.strArea}
                      </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonne droite - Préparation */}
                <div>
                  <h2 className="font-bold text-2xl text-gray-900 mb-4">Préparation</h2>
                  <div className="space-y-4">
                    {instructions.map((step, idx) => (
                        <div
                            key={idx}
                            className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
                        >
                          <div
                              className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                            {idx + 1}
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed pt-1.5">
                            {step}
                          </p>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
