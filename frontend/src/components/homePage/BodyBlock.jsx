import React, { useState } from "react";
import { RecipesAvailable } from "./RecipesAvailable";
import FeaturesSection from "./FeaturesSection";

export default function BodyBlock() {
  const [recipeSelected, setRecipeSelected] = useState(false);

  return (
      <section className="relative z-60 min-h-screen bg-gradient-to-b from-neutral-900 via-black to-neutral-950 overflow-hidden">
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl mx-4 md:mx-16 my-16 border border-white/10">
          {!recipeSelected && <FeaturesSection />}
          <RecipesAvailable onRecipeSelected={setRecipeSelected} />
        </div>
      </section>
  );
}
