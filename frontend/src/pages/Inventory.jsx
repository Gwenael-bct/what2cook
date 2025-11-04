import React from 'react';
import Header from '../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import CurrentUser from "../components/CurrentUser";
import UserIngredients from "../components/Inventory/UserIngredients";
import ReloadUser from "../services/ReloadUser";
import IngredientSearch from "../components/searchIngredient";
import Particles from "../components/elementsDecor/Particles";

export default function Inventory() {
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleIngredientAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
      <main className="min-h-screen bg-[#2B2B2B] p-2 sm:p-4 md:p-8">

        <Header />

        <CurrentUser onUserLoaded={setUser} />

        <div className="mt-16 sm:mt-20 md:mt-24 rounded-xl md:rounded-2xl shadow-xl bg-[#3A3A3A] px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 mx-2 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
          <Particles />

          {user &&
            <p className="text-white font-bold text-center text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
              Bienvenue {user.username.split(" ")[0]}
            </p>
          }

          {/* Titre + ajout d'ingrédient */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8 py-4 sm:py-6 md:py-8">
            {/* Titre principal */}
            <div className="flex-1">
              <div className="text-white font-bold text-3xl sm:text-4xl md:text-5xl">Gérer Mon Inventaire</div>
            </div>

            {/* Section ajout ingrédient */}
            <div className="flex-1 lg:max-w-md">
              <div className="text-white font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Ajouter un Ingrédient Rapide</div>
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
              <div className="py-4 sm:py-6">
                <UserIngredients userId={user?.id} key={refreshKey} />
              </div>
          }

          <div className="text-center text-white font-medium gap-2 text-base sm:text-lg md:text-xl pt-6 sm:pt-8">
            <ReloadUser onUserLoaded={setUser} colorButton="bg-white/10" />
          </div>
        </div>
      </main>
  );
}

