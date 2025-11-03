import React, { useEffect, useMemo, useState } from "react";
import {CreateButton} from "../createButton";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function RecipeDetails({ recipeDetails, onClose }) {
  const [visible, setVisible] = useState(false);
  const ingredients = useMemo(() => {
    const items = [];
    for (let i = 1; i <= 20; i += 1) {
      const ing = recipeDetails[`strIngredient${i}`];
      const qty = recipeDetails[`strMeasure${i}`];
      if (ing && ing.trim()) items.push({ name: ing, qty: qty || "" });
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

  return (
      <div className={`w-full z-40 transition-all duration-500 ease-out ${visible ? "opacity-95 " +
          "translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <div className="relative bg-black/60 bg-gradient-to-b backdrop-blur-2xl from-black/80 to-transparent
         rounded-3xl px-6 py-8 w-full shadow-2xl border border-white/10 pointer-events-auto
         max-h-[82vh] overflow-y-auto scroll-smooth overscroll-contain sm:max-h-none sm:overflow-visible"
        >
          {/* Bouton fermer */}
          <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-orange-400"
          >
            &times;
          </button>

          <div className="p-6 md:p-8">
            {/* Header recipe Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

              {/* Recipe title */}
              <h2 className="font-bold text-2xl md:text-3xl text-white">{recipeDetails.strMeal}</h2>

              {/* Image recipe */}
              <div className="h-24 md:h-36 w-24 md:w-36 justify-center justify-self-center">
                <img
                    src={recipeDetails.strMealThumb}
                    alt={recipeDetails.strMeal}
                    className="h-full w-full object-cover rounded-full ring-2 ring-white/20 shadow-lg"
                    loading="lazy"
                    decoding="async"
                />
              </div>

              {/* Validate recipe */}
              <div className="grid gap-3">
                <CreateButton icon={TaskAltIcon} text="Recette terminée" />
                <CreateButton icon={SendIcon} text="Partager" />
                <CreateButton icon={FavoriteBorderIcon} text="Ajouter aux favoris" />
              </div>
            </div>

            {/* Instructions recipe */}
            <div className="container mx-auto flex flex-col md:flex-row gap-6 md:gap-8 mt-6"
            >
              {/* Ingredients */}
              <div className="flex-1 md:flex-1">
                <h2 className="font-semibold text-white/90 pb-3">Ingrédients</h2>
                <div className="rounded-2xl p-4 bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl grid grid-cols-1 gap-2">
                  {ingredients.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-white/90 text-sm">
                        <span>{it.name}</span>
                        <span className="text-white/70">{it.qty}</span>
                      </div>
                  ))}
                </div>
              </div>

              {/* Preparation */}
              <div className="flex-1 md:flex-[2]">
                <h2 className="font-semibold text-white/90 pb-3">Préparation</h2>
                <div className="rounded-2xl p-4 bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl grid gap-3
                text-white/90 text-sm max-h-110 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-white/10">
                  {recipeDetails.strInstructions
                      ?.replace(/\r\n/g, "\n")
                      .split(/\n+/)
                      .map((step, i) => step.trim())
                      .filter(step => step.length > 0)
                      .map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full font-medium bg-orange-500 text-white text-md flex items-center justify-center mt-0.5">
                              {i + 1}
                            </div>
                            <p className="leading-relaxed font-bold">{step}</p>
                          </div>
                      ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-white/80 text-sm">
              <div className="bg-white/5 rounded-xl px-3 py-2 border border-white/10"><strong>Catégorie :</strong> {recipeDetails.strCategory}</div>
              <div className="bg-white/5 rounded-xl px-3 py-2 border border-white/10"><strong>Origine :</strong> {recipeDetails.strArea}</div>
            </div>
          </div>
        </div>

      </div>
  );
}
