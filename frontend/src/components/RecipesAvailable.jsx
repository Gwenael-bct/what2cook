import { useState } from "react";
import CurrentUser from "./CurrentUser";
import Category from "./Category";
import {useNavigate} from "react-router-dom";

export function RecipesAvailable() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
      <div className="bg-cyan-950 bg-opacity-75 w-full flex justify-center py-8">
        <div className="container mx-auto flex flex-col md:flex-row gap-8 bg-stone-100 rounded-xl">

          {/*Colonne Catégorie */}
          <div className="flex-1 md:flex-[1] p-4">
            <h2 className="font-bold text-black pb-4 pt-8">Vos ingrédients</h2>

            <div className="rounded-xl p-2 bg-white shadow-2xl grid grid-cols-1 table-auto">
              {/* Fetch du user via CurrentUser */}
              <CurrentUser onUserLoaded={setUser} />

              {/* Affichage sécurisé */}
               <Category userId={user?.id} />

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
          </div>

        </div>
      </div>
  );
}
