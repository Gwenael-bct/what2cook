import { useState } from "react";
import CurrentUser from "../CurrentUser";
import Category from "../Category";
import {useNavigate} from "react-router-dom";
import ReloadUser from "../../services/ReloadUser";
import { RecipesByMainIngredient, getRecipesCache } from '../../services/RecipesByMainIngredient';
import Recipes from "./Recipes"
import { RecipeDetailsService, getRecipeDetailsCache } from '../../services/RecipeDetails';
import RecipeDetails from "./RecipeDetails";
import { useRef } from "react";

export function RecipesAvailable({ onRecipeSelected }) {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const targetRef = useRef(null);

  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClickRecipe = async (id) => {
    setLoading(true);
    await RecipeDetailsService(id);
    const details = getRecipeDetailsCache();
    setRecipeDetails(details[0]);
    setLoading(false);

    if (onRecipeSelected) {
      onRecipeSelected(true);
    }
  };

  const handleCloseRecipe = () => {
    setRecipeDetails(null);
    if (onRecipeSelected) onRecipeSelected(false);
  };

  const handleClickIngredient = async (ingredient) => {
    setLoading(true); // on affiche le loader
    try {
      await RecipesByMainIngredient(ingredient);
      setRecipes(getRecipesCache());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // on cache le loader
    }
  };

  return (
      <>
        <div className="grid grid-cols-1 bg-neutral-900 w-full justify-center py-8 relative">
          <div className="container mx-auto flex flex-col md:flex-row gap-8 bg-stone-100 rounded-xl relative">
            {/* RecipeDetails collé par le bas au haut du container blanc */}
            {recipeDetails && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-full md:w-3/4 px-4 z-50"
                   ref={targetRef}
              >
                <RecipeDetails recipeDetails={recipeDetails} onClose={handleCloseRecipe} />
              </div>
            )}

            {/*Colonne Catégorie */}
            <div className="flex-1 md:flex-[1] p-4">
              <h2 className="font-bold text-black pb-4 pt-8">Vos ingrédients</h2>

              <div className="rounded-xl p-2 bg-white shadow-2xl grid grid-cols-1 table-auto">
                {/* Fetch du user via CurrentUser */}
                <CurrentUser onUserLoaded={setUser} />

                {/* Affichage sécurisé */}
                <Category userId={user?.id} handleClick={handleClickIngredient} />

                {/* Bouton navigation vers l'inventaire */}
                <button
                    onClick={() => navigate("/inventaire")}
                    className="hover:bg-orange-500 text-white  bg-black justify-self-center rounded-full mt-4 p-4"
                >
                  Ajouter/Supprimer des ingrédients
                </button>
              </div>
            </div>

            {/* Colonne recettes */}
            <div className="flex-1 md:flex-[2] p-4 relative">
              <h2 className="font-bold text-black pb-4 pt-8">Recettes possibles</h2>

              {/* Affichage du loader */}
              {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-400 rounded-full animate-spin"></div>
                  </div>
              )}

              <div>
                <Recipes recipes={recipes} onRecipeClick={handleClickRecipe} handleScroll={handleScroll} />
              </div>
            </div>
          </div>
          <div className="container mx-auto flex flex-col md:flex-row py-8 rounded-xl justify-center">
            <ReloadUser onUserLoaded={setUser} colorButton="bg-stone-100" />
          </div>
        </div>
      </>
  );
}
