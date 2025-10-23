import React from 'react';
import HeroSection from '../components/HeroSection';
import BodyBlock from "../components/homePage/BodyBlock";

export default function HomePage() {

  return (
      <main className="relative bg-gradient-to-b from-neutral-900 to-black min-h-screen z-0">
        {/* Particules lumineuses */}
        <div className="absolute inset-0 overflow-hidden z-50 pointer-events-none">
          {[...Array(80)].map((_, i) => (
              <div
                  key={i}
                  className="absolute rounded-full blur-[80px] opacity-60 animate-float mix-blend-screen"
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 70%)`,
                    width: `${Math.random() * 80 + 20}px`,
                    height: `${Math.random() * 80 + 20}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${10 + Math.random() * 10}s`,
                    filter: "blur(40px) brightness(1.2)",
                  }}
              ></div>
          ))}
        </div>
        
        {/* HeroSection occupe un vrai espace */}
        <div className="relative z-10">
          <HeroSection />
        </div>
        
        {/* BodyBlock avec chevauchement sur HeroSection */}
        <div className="relative z-20 -mt-32">
          <BodyBlock />
        </div>
      </main>
  )
}
