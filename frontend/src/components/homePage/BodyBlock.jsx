import React, { Suspense, useState, lazy } from "react";
import { RecipesAvailable } from "./RecipesAvailable";
const FeaturesSection = lazy(() => import("./FeaturesSection"));

export default function BodyBlock() {
  const [recipeSelected, setRecipeSelected] = useState(false);

  return (
      <section className="relative min-h-screen bg-white/10 overflow-visible pt-8">
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl mx-4 md:mx-16 my-16 border border-white/10">

          <div className="bg-neutral-900">
            <div className={`transition-opacity duration-500 content-auto ${recipeSelected ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <Suspense fallback={<div className="h-40" />}> 
                <FeaturesSection />
              </Suspense>
            </div>
            <RecipesAvailable onRecipeSelected={setRecipeSelected} />
          </div>
        </div>
      </section>
  );
}
