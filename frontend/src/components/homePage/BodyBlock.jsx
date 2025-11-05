import React, { Suspense, useState, lazy } from "react";
import { RecipesAvailable } from "./RecipesAvailable";
const FeaturesSection = lazy(() => import("./FeaturesSection"));

export default function BodyBlock() {
  const [recipeSelected, setRecipeSelected] = useState(false);

  return (
      <section className="relative min-h-screen bg-white/10 overflow-visible pt-4 md:pt-8">
        <div className="relative mx-4 md:mx-16 my-4 md:my-8">

          <div className="">
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
