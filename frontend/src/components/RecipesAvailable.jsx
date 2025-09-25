import { useState, useEffect } from "react";

export default function RecipesAvailable() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data));
  }, []);

  return (
      <div className="bg-cyan-950 bg-opacity-75 w-full flex justify-center py-8">
        <div className="container mx-auto flex flex-col md:flex-row gap-8 bg-stone-100 rounded-xl">

          {/* Colonne ingrédients */}
          <div className="flex-1 md:flex-[1] p-4">
            <h2 className="font-bold text-black pb-4 pt-8">Vos ingrédients</h2>
            <div className="rounded-xl p-2 bg-white shadow-2xl grid grid-cols-1 table-auto">

              {categories.map((row, index) => (
                  <div
                      key={index}
                      className="flex items-center border-b border-gray-200 gap-3 p-2"
                  >
                    <div className="h-12 md:h-16 w-12 md:w-16 rounded-full overflow-hidden flex items-center justify-center">
                      <img
                          src={row.image}
                          className="h-full w-full object-cover bg-gray-200"
                      />
                    </div>
                    <span className="text-black text-sm md:text-base font-medium">
                      {row.name}
                    </span>
                  </div>
              ))}

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
