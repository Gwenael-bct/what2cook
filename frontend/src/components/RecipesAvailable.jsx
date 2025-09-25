import { useState, useEffect } from "react";
import CurrentUser from "./CurrentUser";
import ConnectCategory from "./ConnectCategory";
import NotConnectedCategory from "./NotConnectedCategory";

export function RecipesAvailable() {
  const [user, setUser] = useState(null);

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
              <div>{user ? user.id : "Loading..."}</div>

              {user ? (
                  // Si user connecté → affiche ses catégories
                  <ConnectCategory userId={user.id} />
              ) : (
                  // Sinon → affiche composants pour non-connecté
                  <NotConnectedCategory />
              )}
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
