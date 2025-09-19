import React from 'react';
// import { CallToAction } from '../components/CallToAction';
// import RecipesCarousel from '../components/RecipesCarousel';
import FeaturesSection from '../components/FeaturesSection';
import HeroSection from '../components/HeroSection';
import RecipesAvailable from "../components/RecipesAvailable";

export default function HomePage() {

  return (
      <main className="min-h-screen bg-black p-4 md:p-8">
        <HeroSection />
        <FeaturesSection />
        <RecipesAvailable />


        {/*<div className="container rounded-lg bg-gray-100 shadow-md p-4 md:p-8">*/}

        {/*  <div className="max-w-6xl mx-auto">*/}
        {/*    /!*<RecipesCarousel />*!/*/}
        {/*    /!*<CallToAction />*!/*/}
        {/*  </div>*/}
        {/*</div>*/}

      </main>
  )
}
