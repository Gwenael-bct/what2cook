import React from 'react';
import HeroSection from '../components/HeroSection';
import BodyBlock from "../components/homePage/BodyBlock";
import Particles from "../components/elementsDecor/Particles";

export default function HomePage() {

  return (
      <main className="relative bg-gradient-to-b from-neutral-900 to-black min-h-screen z-0">

        <div className="relative z-40">
           <HeroSection />
        </div>

        {/* BodyBlock avec espace sous la HeroSection, espace géré dans BodyBlock */}
        <div className="relative z-50">
          <BodyBlock />
          <Particles />
        </div>
      </main>
  )
}
