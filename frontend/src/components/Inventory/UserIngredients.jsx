import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { motion } from "framer-motion";
import {deleteUserIngredient} from "../../services/DeleteUserIngredientService";

export default function UserIngredients({ userId, onIngredientDeleted }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const request = `http://localhost:5000/categories/user/${userId}`;
    fetch(request)
        .then(res => res.json())
        .then((data) => {
          const categoriesWithImages = (data || []).map((category) => ({
            ...category,
            ingredients: (category.ingredients || []).map((ingredient, i) => ({
              ...ingredient,
              imageUrl: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                  ingredient.name_en
              )}-Small.png`,
              _key: ingredient.id ?? i,
            })),
          }));
          setCategories(categoriesWithImages);
        })
        .catch((err) => console.error(err));
  }, [userId]);

  return (
      <>
        {/* Version Desktop - Tableau */}
        <div className="hidden md:block rounded-xl overflow-hidden shadow-md bg-[#F5F5F5]">
          <table className="table-auto w-full">
            <thead className="bg-[#ECECEC]">
            <tr>
              <th className="pl-6 py-4 text-left text-base lg:text-lg font-semibold text-gray-800">Ingrédient</th>
              <th className="text-center py-4 text-base lg:text-lg font-semibold text-gray-800">Actions</th>
            </tr>
            </thead>
            <tbody>
            {categories.map((category) =>
                category.ingredients.map((ingredient, index) => (
                    <tr key={ingredient._key} className="border-b border-gray-200 hover:bg-white/50 transition-colors">
                      <td className="p-4 lg:p-6 align-center">
                        <div className="flex items-center gap-3 lg:gap-4">
                          <img
                              src={ingredient.imageUrl}
                              alt={ingredient.name}
                              className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover bg-white saturate-150 shadow-sm"
                          />
                          <div>
                            <div className="font-medium text-gray-900 text-sm lg:text-base">{ingredient.name}</div>
                            <div className="text-xs lg:text-sm text-gray-500">{category.name}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 lg:p-6 text-center">
                        <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 150 }}
                            className="inline-block"
                        >
                          <DeleteIcon fontSize="large"
                                      className="text-[#EF4444] cursor-pointer"
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        const result = await deleteUserIngredient(ingredient.id);
                                        if (result.success && onIngredientDeleted) onIngredientDeleted();
                                      }}
                          />
                        </motion.div>
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>

        {/* Version Mobile - Cartes */}
        {/* Version Mobile - Grille 2 colonnes */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {categories.map((category) =>
              category.ingredients.map((ingredient, index) => (
                  <motion.div
                      key={ingredient._key}
                      className="bg-[#F5F5F5] rounded-xl p-3 shadow-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      {/* Image ingrédient */}
                      <img
                          src={ingredient.imageUrl}
                          alt={ingredient.name}
                          className="h-10 w-10 rounded-full object-cover bg-white saturate-150 shadow-sm"
                      />

                      {/* Info ingrédient */}
                      <div className="flex-1 min-w-0 w-full">
                        <div className="font-semibold text-gray-900 text-sm truncate">{ingredient.name}</div>
                        <div className="text-xs text-gray-500 truncate">{category.name}</div>
                      </div>

                      {/* Action delete */}
                      <motion.div
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 150 }}
                      >
                        <DeleteIcon fontSize="small"
                                    className="text-[#EF4444] cursor-pointer"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      const result = await deleteUserIngredient(ingredient.id);
                                      if (result.success && onIngredientDeleted) onIngredientDeleted();
                                    }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
              ))
          )}
        </div>
      </>
  );
}
