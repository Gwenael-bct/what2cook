{/* Particules lumineuses */}
export default function Particles() {
  return (
      <div className="absolute inset-0 overflow-hidden z-30 pointer-events-none">
        {[...Array(60)].map((_, i) => (
            <div
                key={i}
                className="absolute rounded-full blur-[80px] opacity-60 animate-float mix-blend-screen"
                style={{
                  background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.2) 70%)`,
                  width: `${Math.random() * 40 + 20}px`,
                  height: `${Math.random() * 40 + 20}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${10 + Math.random() * 10}s`,
                  filter: "blur(30px) brightness(1.5)",
                  mixBlendMode: "lighten",
                }}
            />
        ))}
      </div>
  );
}
