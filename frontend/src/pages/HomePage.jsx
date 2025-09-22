import React from 'react';
// import { CallToAction } from '../components/CallToAction';
// import RecipesCarousel from '../components/RecipesCarousel';
// import FeaturesSection from '../components/FeaturesSection';
// import HeroSection from '../components/HeroSection';
// import RecipesAvailable from "../components/RecipesAvailable";
import GoogleLogin from "../components/GoogleSignIn";

export default function HomePage() {

  return (
      <main className="min-h-screen bg-black p-4 md:p-8">
        {/*<HeroSection />*/}
        {/*<FeaturesSection />*/}
        {/*<RecipesAvailable />*/}
        <GoogleLogin />
      </main>
  )
}
