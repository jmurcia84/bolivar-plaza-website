"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  imagen: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[560px] max-h-[800px] overflow-hidden bg-[#1a1a1a] pb-24">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradiente base — fallback cuando no hay imagen */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d3a1e 60%, #1a1a1a 100%)" }}
        />
        <div
          className="absolute top-0 right-0 w-[60%] h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at 80% 20%, #8fc74a 0%, transparent 60%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[40%] h-[60%] opacity-5"
          style={{ background: "radial-gradient(ellipse at 20% 80%, #8fc74a 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#8fc74a 1px, transparent 1px), linear-gradient(90deg, #8fc74a 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Imagen del CMS — empieza debajo del navbar fijo (h-20 md:h-24) */}
        {slide.imagen && (
          <div
            className="absolute inset-x-0 bottom-0 top-20 md:top-24 transition-opacity duration-700"
            style={{
              backgroundImage: `url(${slide.imagen})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>

      {/* Indicadores de slide */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-[#8fc74a]" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Flechas */}
      <button
        onClick={prev}
        aria-label="Diapositiva anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Siguiente diapositiva"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
}
