import { useMemo, useEffect, useRef, useState } from 'react';

function importAll(r) {
  return r.keys().map((fileName) => ({
    src: r(fileName),
    name: fileName.split("/").pop().split(".")[0],
  }));
}

const recipeImages = importAll(
    require.context("../../assets/images/homePage/recipes", false, /\.(png|jpe?g|svg|webp)$/)
);

export default function RecipesCarousel() {
  // Triple les images pour une boucle ultra-fluide
  const imagesLoop = useMemo(() => [
    ...recipeImages,
    ...recipeImages,
    ...recipeImages
  ], []);

  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Calcul précis pour une boucle parfaite
    const firstSetWidth = scrollElement.scrollWidth / 3;
    let scrollPosition = 0;
    let animationId;

    const animate = () => {
      // Pause l'animation si hover ou drag
      if (!isHovered && !isDragging) {
        scrollPosition += 0.5; // Vitesse (0.3 = lent, 1.0 = rapide)

        // Reset parfait sans saut visuel
        if (scrollPosition >= firstSetWidth) {
          scrollPosition = 0;
        }

        scrollElement.style.transform = `translateX(-${scrollPosition}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  // Gestion du scroll manuel (molette et trackpad)
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;

      const currentTransform = scrollElement.style.transform;
      const currentX = currentTransform ? parseFloat(currentTransform.match(/-?\d+\.?\d*/)?.[0] || 0) : 0;
      const newX = currentX - e.deltaX;

      scrollElement.style.transform = `translateX(${newX}px)`;
    }
  };

  // Gestion du drag (souris et tactile)
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  const handleDragStart = (e) => {
    setIsDragging(true);
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const currentTransform = scrollElement.style.transform;
    const currentX = currentTransform ? parseFloat(currentTransform.match(/-?\d+\.?\d*/)?.[0] || 0) : 0;

    setDragStart({
      x: e.type === 'mousedown' ? e.pageX : e.touches[0].pageX,
      scrollLeft: Math.abs(currentX)
    });
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const walk = (dragStart.x - x) * 1.5; // Multiplicateur de sensibilité
    const newX = -(dragStart.scrollLeft + walk);

    scrollElement.style.transform = `translateX(${newX}px)`;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
      <div
          className="relative p-3 md:p-6 overflow-hidden carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        {/* Masques dégradés plus larges et plus opaques */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-neutral-800 via-neutral-800/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-neutral-800 via-neutral-800/80 to-transparent" />

        <div
            className="relative overflow-hidden"
            onWheel={handleWheel}
        >
          {/* Container avec optimisations GPU */}
          <div
              ref={scrollRef}
              className="flex gap-3 md:gap-4 px-4 md:px-8 cursor-grab active:cursor-grabbing"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                perspective: 1000,
                userSelect: 'none'
              }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
          >
            {imagesLoop.map((img, i) => (
                <div
                    key={i}
                    className="flex-shrink-0 w-32 md:w-48 flex flex-col items-center rounded-lg md:rounded-xl bg-white/5 backdrop-blur-md pb-1 md:pb-2
                    border border-white/10 shadow-lg hover:shadow-amber-300/20 transition-shadow duration-300 cursor-pointer"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)'
                    }}
                >
                  <div className="inline-flex items-center justify-center w-32 h-20 md:w-48 md:h-32 overflow-hidden rounded-t-lg md:rounded-t-xl">
                    <img
                        src={img.src}
                        alt={img.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                          pointerEvents: 'none'
                        }}
                    />
                  </div>
                  <div className="text-center mt-1 md:mt-2 text-[10px] md:text-sm font-semibold text-white/90 px-1 md:px-2 line-clamp-1">
                    {img.name.replace(/-/g, " ")}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}
