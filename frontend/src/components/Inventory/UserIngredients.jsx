import { useState, useEffect } from "react";

export default function UserIngredients({ userId }) {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(true);

  const request = `http://localhost:5000/categories/user/${userId}`;

  useEffect(() => {
    fetch(request)
        .then((res) => res.json())
        .then((data) => {
          // Ajout de l'image directement dans chaque ingrédient
          const categoriesWithImages = (data || []).map((category) => ({
            ...category,
            ingredients: (category.ingredients || []).map((ingredient, i) => ({
              ...ingredient,
              imageUrl: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                  ingredient.name_en
              )}-Small.png`,
              _key: ingredient.id ?? i, // fallback pour clé unique
            })),
          }));
          setCategories(categoriesWithImages);
        })
        .catch((err) => console.error(err));
  }, [userId]);

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
      <>
        {categories.map((row, index) =>
            row ? (
                <div key={row.id ?? index}>
                  <button
                      id={`dropdownButton-${row.id ?? index}`}
                      data-dropdown-toggle={`dropdown-${row.id ?? index}`}
                      className="flex items-center justify-between w-full border-b border-gray-200 p-2 hover:shadow-md rounded"
                      type="button"
                      onClick={() => toggleCategory(row.id ?? index)}
                  >
                    {/* Groupe image + texte catégorie */}
                    <div className="flex items-center gap-3">
                      <div className="h-12 md:h-16 w-12 md:w-16 rounded-full overflow-hidden flex items-center justify-center">
                        <img
                            src={row.image}
                            alt={row.name}
                            className="h-full w-full object-cover bg-gray-100"
                            loading="lazy"
                        />
                      </div>
                      <span className="text-black text-sm md:text-base font-medium">
                  {row.name}
                </span>
                    </div>

                    {/* Flèche dropdown */}
                    <svg
                        className={`w-4 h-4 text-gray-500 mr-6 transform transition-transform duration-300 ${
                            openCategory === (row.id ?? index) ? "rotate-180" : "rotate-0"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                      <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  {/* Dropdown ingrédients */}
                  {userId && openCategory === row.id && row?.ingredients?.length > 0 && (
                      <div
                          id={`dropdown-${row.id ?? index}`}
                          className="z-10 bg-white border-gray-200 p-2"
                      >
                        <ul
                            className="py-2 text-sm grid grid-cols-2 gap-4 justify-items-center border border-xl rounded rounded-xl bg-gray-200"
                            aria-labelledby={`dropdownButton-${row.id ?? index}`}
                        >
                          {row.ingredients.map((ingredient) => (
                              <li key={ingredient._key} className="gap-2 my-1 hover:shadow-md rounded rounded-xl">

                                <div className="flex flex-col items-center w-full max-w-full rounded rounded-xl">
                                  <img
                                      src={ingredient.imageUrl}
                                      alt={ingredient.name}
                                      className="h-10 md:h-12 w-10 md:w-12 rounded-full object-cover bg-gray-100"
                                      loading="lazy"
                                  />
                                  <span className="text-black text-sm md:text-base font-medium">
                                    {ingredient.name}
                                  </span>
                                </div>

                              </li>
                          ))}
                        </ul>
                      </div>
                  )}
                </div>
            ) : null
        )}
      </>
  );
}
