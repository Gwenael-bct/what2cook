import { useState, useEffect } from "react";

export default function Category({ userId, handleClick}) {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  const request = userId
      ? `http://localhost:5000/categories/user/${userId}`
      : "http://localhost:5000/categories/all";

  const handleIngredientClick = (ingredient) => {
    handleClick(ingredient);
  };

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
                      <div className="mt-2 p-2 bg-gray-50 rounded-lg shadow-inner">
                        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
                          {row.ingredients.map((ingredient) => (
                              <li key={ingredient._key}>
                                <div
                                    className="flex flex-col items-center gap-2 cursor-pointer group"
                                    onClick={() => handleIngredientClick(ingredient.name_en)}
                                >
                                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-full overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                                    <img
                                        src={ingredient.imageUrl}
                                        alt={ingredient.name}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform saturate-150 duration-200"
                                    />
                                  </div>
                                  <span className="text-xs md:text-sm text-center font-medium text-gray-800">
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
