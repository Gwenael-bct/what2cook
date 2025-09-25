import { useState, useEffect } from "react";

export default function ConnectCategory({ userId }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!userId) return; // évite de fetch avant que l'ID existe

    fetch(`http://localhost:5000/categories/user/${userId}`)
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error(err));
  }, [userId]);

  return (
      <>
        {categories.map((row, index) => (
            <>
              <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  key={index}
                  className="flex items-center justify-between w-full border-b border-gray-200 p-2 hover:shadow-md rounded"
                  type="button"
              >
                {/* Groupe image + texte catégorie */}
                <div className="flex items-center gap-3">
                  <div className="h-12 md:h-16 w-12 md:w-16 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                        src={row.image}
                        className="h-full w-full object-cover bg-gray-100"
                    />
                  </div>
                  <span className="text-black text-sm md:text-base font-medium">
                    {row.name}
                  </span>
                </div>

                {/* Flèche dropdown */}
                <svg
                    className="w-4 h-4 text-gray-500 mr-6"
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

              {row.ingredients.map((ingredient, index) => (
                  <div key={index}
                       id="dropdown"
                       className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton">
                      <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{ingredient.name}</a>
                      </li>
                    </ul>
                  </div>
              ))}
            </>
        ))}
      </>
  );
}