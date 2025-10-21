import { useState } from "react";
import CurrentUser from "./CurrentUser";
import Category from "./Category";
import {useNavigate} from "react-router-dom";
import ReloadUser from "../services/ReloadUser";
import { RecipesByMainIngredient, getRecipesCache } from '../services/RecipesByMainIngredient';
import Recipes from "./homePage/Recipes"

export function RecipesAvailable() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const handleClick = async (ingredient) => {
    await RecipesByMainIngredient(ingredient);
    setRecipes(getRecipesCache());
  };

  return (
      <div className="grid grid-cols-1 bg-cyan-950 bg-opacity-75 w-full justify-center py-8">
        <div className="container mx-auto flex flex-col md:flex-row gap-8 bg-stone-100 rounded-xl">

          {/*Colonne Catégorie */}
          <div className="flex-1 md:flex-[1] p-4">
            <h2 className="font-bold text-black pb-4 pt-8">Vos ingrédients</h2>

            <div className="rounded-xl p-2 bg-white shadow-2xl grid grid-cols-1 table-auto">
              {/* Fetch du user via CurrentUser */}
              <CurrentUser onUserLoaded={setUser} />

              {/* Affichage sécurisé */}
               <Category userId={user?.id} handleClick={handleClick} />

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
          <div className="flex-1 md:flex-[2] p-4">
            <h2 className="font-bold text-black pb-4 pt-8">Recettes possibles</h2>
            <div>
              <Recipes recipes={recipes} />
            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row py-8 rounded-xl justify-center">
          <ReloadUser onUserLoaded={setUser} colorButton="bg-stone-100" />
        </div>
      </div>
  );
}
