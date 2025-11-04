import React from 'react';
import Header from '../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import CurrentUser from "../components/CurrentUser";
import UserIngredients from "../components/Inventory/UserIngredients";
import ReloadUser from "../services/ReloadUser";
import IngredientSearch from "../components/searchIngredient";

export default function Inventory() {
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleIngredientAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
      <main className="min-h-screen bg-[#121212] p-4 md:p-8">

        <Header />

        <CurrentUser onUserLoaded={setUser} />

        <div className="mt-24 rounded-2xl shadow-xl bg-[#1E1E1E] px-20 py-8 m-48">

          {user &&
            <p className="text-white font-bold text-center text-4xl">Bienvenue {user.username.split(" ")[0]}</p>
          }

          {/* Titre + ajout d'ingrédient */}
          <div className="flex justify-between py-8">
            <div className="text-white font-bold text-4xl">Gérer Mon Inventaire</div>

            <div className="grid grid-cols-1 gap-4">
              <div className="text-gray-200 font-semibold text-4xl">Ajouter un ingrédient</div>

              {/* Champ ingrédient */}
              <IngredientSearch icon={SearchIcon} user={user} onIngredientAdded={handleIngredientAdded} />

              {/* //TODO Créer la logique quantité à l'utilisateur */}
              {/* Champ quantité */}
              {/*<div className="flex items-center bg-white/10 rounded-xl px-5 py-2">*/}
              {/*  <SearchIcon className="text-gray-400" />*/}
              {/*  <input*/}
              {/*      placeholder="Quantité"*/}
              {/*      type="number"*/}
              {/*      className="text-gray-100 font-medium flex-1 bg-transparent p-2 outline-none"*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
          </div>

          {user &&
              <div className="p-4">
                <UserIngredients userId={user?.id} key={refreshKey} />
              </div>
          }

          <div className="text-center text-white font-medium gap-2 text-xl pt-8">
            <ReloadUser onUserLoaded={setUser} colorButton="bg-white/10" />

          </div>
        </div>
      </main>
  );
}

