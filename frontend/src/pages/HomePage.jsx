import React from 'react';
import HeroSection from '../components/HeroSection';
import BodyBlock from "../components/homePage/BodyBlock";
import Particles from "../components/elementsDecor/Particles";
import Footer from "../components/layout/Footer";

export default function HomePage() {

  return (
      <main className="bg-[#2B2B2B] relative bg-gradient-to-b from-neutral-900 to-black min-h-screen flex flex-col">

        <Particles />

        <div className="relative z-40">
           <HeroSection />
        </div>

        {/* BodyBlock avec espace sous la HeroSection, espace géré dans BodyBlock */}
        <div className="relative z-50 -mt-8 md:-mt-12">
          <BodyBlock />
        </div>

        {/* Footer */}
        <div className="relative z-50 md:block hidden">
          <Footer />
        </div>
      </main>
  )
}
