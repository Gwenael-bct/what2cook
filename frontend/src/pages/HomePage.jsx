import React from 'react';
// import { CallToAction } from '../components/CallToAction';
import RecipesCarousel from '../components/RecipesCarousel';
import FeaturesSection from '../components/FeaturesSection';
import HeroSection from '../components/HeroSection';

export default function HomePage() {

  return (
      <main className="min-h-screen bg-yellow-900 p-4 md:p-8 bg-opacity-25">
        <div className="container rounded-lg bg-gray-100 shadow-md p-4 md:p-8 bg-opacity-20">
          <div className="max-w-6xl mx-auto">
            <HeroSection />
            <FeaturesSection />
            <RecipesCarousel />
            {/*<CallToAction />*/}
          </div>
        </div>

      </main>
  )
}
