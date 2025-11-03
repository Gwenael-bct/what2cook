import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { motion } from "framer-motion";

export default function UserIngredients({ userId }) {
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
      <div className="rounded-xl overflow-hidden shadow-md bg-white">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
          <tr>
            <th className="pl-6 text-left">Catégorie</th>
            <th className="pl-6 text-left">Ingrédient</th>
            {/*<th className="pl-6 text-left">Quantité</th>*/}
            <th className="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          {categories.map((category) =>
              category.ingredients.map((ingredient, index) => (
                  <tr key={ingredient._key}>
                    {index === 0 && (
                        <td rowSpan={category.ingredients.length} className="p-6 border-b align-center">
                          <div className="flex items-center gap-2">
                            {category.image && (
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-14 w-14 rounded-full object-cover bg-gray-100"
                                />
                            )}
                            <span className="pl-4 font-medium">{category.name}</span>
                          </div>
                        </td>
                    )}
                    <td className="p-6 align-center border">
                      <img
                          src={ingredient.imageUrl}
                          alt={ingredient.name}
                          className="h-10 w-10 rounded-full object-cover bg-gray-100"
                      />
                      <span className="font-medium">{ingredient.name}</span>
                    </td>
                    {/*<td className="p-6 border font-medium">*/}
                    {/*  {Math.floor(Math.random() * 500) + 1}*/}
                    {/*</td>*/}
                    <td className="p-6 text-center border-b">
                      <div className="grid grid-cols-2 text-center justify-self-center">
                        {/*<motion.div*/}
                        {/*    whileHover={{ scale: 1.25, color: "#3b82f6" }} // #3b82f6 = Tailwind blue-500*/}
                        {/*    whileTap={{ scale: 0.95 }}*/}
                        {/*    transition={{ type: "spring", stiffness: 200, damping: 8 }}*/}
                        {/*    className="relative cursor-pointer"*/}
                        {/*>*/}
                        {/*  /!* Halo animé *!/*/}
                        {/*  <motion.span*/}
                        {/*      className="absolute inset-0 rounded-full bg-blue-300 opacity-0 blur-md"*/}
                        {/*      whileHover={{ opacity: 0.4, scale: 1.5 }}*/}
                        {/*      transition={{ duration: 0.3 }}*/}
                        {/*  />*/}
                        {/*  <AddIcon fontSize="large" className="text-blue-500 relative z-10" />*/}
                        {/*</motion.div>*/}

                        <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 150 }}
                        >
                          <DeleteIcon fontSize="large" className="text-red-500 cursor-pointer" />
                        </motion.div>
                      </div>
                    </td>
                  </tr>
              ))
          )}
          </tbody>
        </table>
      </div>
  );
}
