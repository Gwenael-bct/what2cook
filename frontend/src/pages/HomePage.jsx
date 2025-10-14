import React from 'react';
// import FeaturesSection from '../components/FeaturesSection';
// import HeroSection from '../components/HeroSection';
import {RecipesAvailable} from "../components/RecipesAvailable";
import GoogleLogin from "../components/GoogleSignIn";

export default function HomePage() {

  return (
      <main className="min-h-screen bg-[#121212] p-4 md:p-8">
        {/*<HeroSection />*/}
        {/*<FeaturesSection />*/}
        <RecipesAvailable />
        <GoogleLogin />
      </main>
  )
}
