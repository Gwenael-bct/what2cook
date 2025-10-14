import React from 'react';
import Header from '../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import GoogleLogin from "../components/GoogleSignIn";
import { useState } from "react";
import CurrentUser from "../components/CurrentUser";
import UserIngredients from "../components/Inventory/UserIngredients";

export default function Inventory() {
  const [user, setUser] = useState(null);

  return (
      <main className="min-h-screen bg-[#121212] p-4 md:p-8">
        <Header />
        <div className="mt-24 rounded-2xl shadow-xl bg-[#1E1E1E] px-12 py-8">

          {/* Titre + ajout d'ingrédient */}
          <div className="flex justify-between py-8">
            <div className="text-white font-bold text-4xl">Gérer Mon Inventaire</div>

            <div className="grid grid-cols-1 gap-4">
              <div className="text-gray-200 font-semibold text-xl">Ajouter un ingrédient</div>

              {/* Champ ingrédient */}
              <div className="flex items-center bg-white/5 rounded-xl px-5 py-2">
                <SearchIcon className="text-gray-400" />
                <input
                    placeholder="Nom de l'ingrédient..."
                    className="text-gray-100 font-medium flex-1 bg-transparent p-2 outline-none"
                />
              </div>

              {/* Champ quantité */}
              <div className="flex items-center bg-white/5 rounded-xl px-5 py-2">
                <SearchIcon className="text-gray-400" />
                <input
                    placeholder="Quantité"
                    type="number"
                    className="text-gray-100 font-medium flex-1 bg-transparent p-2 outline-none"
                />
              </div>

              {/* Bouton ajouter */}
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl py-2 shadow-lg shadow-blue-500/20">
                + Ajouter à l’inventaire
              </button>
            </div>
          </div>

          {/* Ici tu affiches ton inventaire utilisateur */}
          <CurrentUser onUserLoaded={setUser} />
          <UserIngredients userId={user?.id} />
          <GoogleLogin />

        </div>
      </main>
  );
}

