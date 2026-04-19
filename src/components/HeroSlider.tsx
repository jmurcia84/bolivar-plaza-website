"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  imagen: string;
  titulo: string;
  subtitulo: string;
  cta_texto: string;
  cta_link: string;
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
      {/* Background — imagen del CMS o gradiente de fallback */}
      <div className="absolute inset-0 transition-opacity duration-700">
        {slide.imagen ? (
          <>
            <Image
              src={slide.imagen}
              alt={slide.titulo}
              fill
              className="object-cover"
              priority={current === 0}
            />
            {/* Overlay oscuro para legibilidad del texto */}
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #2d3a1e 60%, #1a1a1a 100%)",
              }}
            />
            <div
              className="absolute top-0 right-0 w-[60%] h-full opacity-10"
              style={{
                background: "radial-gradient(ellipse at 80% 20%, #8fc74a 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-[40%] h-[60%] opacity-5"
              style={{
                background: "radial-gradient(ellipse at 20% 80%, #8fc74a 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#8fc74a 1px, transparent 1px), linear-gradient(90deg, #8fc74a 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#8fc74a] text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              Pereira · Risaralda
            </span>

            <h1
              key={slide.id}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-500"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {slide.titulo}
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              {slide.subtitulo}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={slide.cta_link}
                className="inline-flex items-center bg-[#8fc74a] hover:bg-[#7ab33b] text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm"
              >
                {slide.cta_texto}
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center border border-white/30 hover:border-white/60 text-white font-medium px-7 py-3.5 rounded-lg transition-colors text-sm"
              >
                Arrendar local
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
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

      {/* Arrows */}
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
