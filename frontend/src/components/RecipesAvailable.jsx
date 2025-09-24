export default function RecipesAvailable() {
  return (
      <div className="bg-cyan-950 bg-opacity-75 w-full flex justify-center py-8">
        <div className="container mx-auto flex flex-col md:flex-row gap-8 bg-stone-100 rounded-xl">

          {/* Colonne ingrédients */}
          <div className="flex-1 md:flex-[1] p-4">
            <h2 className="font-bold text-black pb-4 pt-8">Vos ingrédients</h2>
            <div className="rounded-xl p-2 bg-white shadow-2xl grid grid-cols-1 table-auto">

              {Array.from({ length: 5 }).map((_, i) => (
                  <div className="flex items-center justify-center border-b border-b-gray-200 h-10">

                    <span
                        key={i}
                        className="text-center text-black text-sm md:text-base font-medium"
                    >
                      {i}
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
