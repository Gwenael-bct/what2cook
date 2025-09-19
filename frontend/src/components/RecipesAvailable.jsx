export default function RecipesAvailable() {
  return (
      <div className="bg-cyan-950 bg-opacity-75 w-full flex justify-center py-8">
        <div className="container mx-auto flex flex-col md:flex-row gap-8 bg-stone-100 rounded-xl">

          {/* Colonne ingrédients */}
          <div className="flex-1 md:flex-[1] p-4">
            <h2 className="font-bold text-black pb-4 pt-8">Vos ingrédients</h2>
            <div className="rounded- p-2 bg-white shadow-2xl"></div>
          </div>

          {/* Colonne recettes */}
          <div className="flex-1 md:flex-[2] p-4">
            <div>dzefez</div>
            <div>test</div>
          </div>

        </div>
      </div>
  );
}
