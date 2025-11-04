import { useState, useEffect } from 'react';
import {searchIngredients} from "../services/searchIngredientService"
import { motion } from "framer-motion";
import {addUserIngredient} from "../services/AddUserIngredientService"

export default function IngredientSearch({ icon: Icon, user, onIngredientAdded }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Détecter la langue du navigateur
  const getBrowserLang = () => {
    const browserLang = navigator.language || navigator.languages[0];
    // Si la langue commence par "fr", utiliser "fr", sinon "en"
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  };

  const [lang] = useState(getBrowserLang());

  useEffect(() => {
    if (!query) {
      setResults([]);
      setError(null);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!user) {
          setError(lang === 'fr' ? 'Connexion requise' : 'Login required');
          setResults([]);
          setIsLoading(false);
          return;
        }

        const data = await searchIngredients(query, lang);
        setResults(data);
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, lang, user]);

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-[#505050] rounded-xl px-5 py-3">
        <Icon className="text-gray-300" />
        <input
          type="text"
          placeholder={lang === 'fr' ? "Rechercher un ingrédient" : "Search for an ingredient"}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="text-white font-medium flex-1 bg-transparent p-2 outline-none placeholder:text-gray-300"
        />
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="absolute z-10 w-full mt-2 bg-red-900/50 rounded-xl shadow-xl px-5 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Liste des résultats */}
      {query && results.length > 0 && !error && (
        <ul className="absolute z-10 w-full mt-2 bg-[#3A3A3A] rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden">
          {results.map(ingredient => (
              <li
                  key={ingredient.id}
                  className="relative w-full h-20 [perspective:1200px] group"
              >
                <motion.div
                    className="relative w-full h-full rounded-xl shadow-md transition-transform duration-300 ease-[cubic-bezier(0.4,0.2,0.2,1)] [transform-style:preserve-3d]"
                    whileHover={{ rotateX: 180 }}
                >
                  {/* --- Face avant --- */}
                  <div
                      className="absolute inset-0 flex items-center gap-6 bg-[#3A3A3A] rounded-xl px-6
                              [backface-visibility:hidden]"
                  >
                    <img
                        src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                            ingredient.name_en
                        )}-Small.png`}
                        alt={ingredient.name}
                        className="h-12 w-12 rounded-full object-cover saturate-150"
                    />
                    <span className="text-gray-100 text-lg font-medium text-center flex-1">
                      {lang === "fr" ? ingredient.name_fr : ingredient.name_en}
                    </span>
                  </div>

                  {/* --- Face arrière --- */}
                  <div
                      className="absolute inset-0 flex justify-center items-center bg-[#3A3A3A] rounded-xl
                                [transform:rotateX(180deg)] [backface-visibility:hidden]"
                  >
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-white/10 text-gray-100 font-semibold px-6 py-2 rounded-lg shadow-md border border-white/20 backdrop-blur-sm focus-visible"
                        onClick={async () => {
                          await addUserIngredient(ingredient.id);
                          if (onIngredientAdded) onIngredientAdded();
                          setQuery('');
                        }}
                    >
                      {lang === "fr" ? "Ajouter l'ingrédient" : "Add ingredient"}
                    </motion.button>
                  </div>
                </motion.div>
              </li>
          ))}
        </ul>
      )}

      {isLoading && query && !error && (
        <div className="absolute z-10 w-full mt-2 bg-[#3A3A3A] rounded-xl shadow-xl px-5 py-3 text-gray-300">
          {lang === 'fr' ? 'Recherche en cours...' : 'Searching...'}
        </div>
      )}
    </div>
  );
}
