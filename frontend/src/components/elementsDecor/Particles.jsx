import { useMemo } from "react";
import { useEffect, useState } from "react";

export default function Particles() {
  const [isMobile, setIsMobile] = useState(false);

  // Détecte si on est sur mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check au chargement
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Génère les particules une seule fois
  const particles = useMemo(() => {
    const count = isMobile ? 30 : 50; // moins sur mobile
    return [...Array(count)].map(() => ({
      size: isMobile
          ? Math.random() * 15 + 10 // taille plus petite mobile
          : Math.random() * 20 + 20, // desktop
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 10 + Math.random() * 10,
    }));
  }, [isMobile]);

  return (
      <div className="absolute inset-0 overflow-hidden z-30 pointer-events-none">
        {particles.map((p, i) => (
            <div
                key={i}
                className="absolute rounded-full blur-[80px] opacity-60 animate-float mix-blend-screen"
                style={{
                  background:
                      "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.2) 70%)",
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                  filter: "blur(15px) brightness(1.5)",
                  mixBlendMode: "lighten",
                }}
            />
        ))}
      </div>
  );
}
