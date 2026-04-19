"use client";

import Image from "next/image";

interface Marca {
  nombre: string;
  logo: string;
}

export default function LogosSlider({ marcas }: { marcas: Marca[] }) {
  if (!marcas.length) return null;

  // Duplicate for seamless loop
  const items = [...marcas, ...marcas, ...marcas];

  return (
    <section className="py-10 bg-white border-y border-[#e8e8e2] overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex gap-12 items-center"
          style={{
            animation: `marquee ${Math.max(30, marcas.length * 2)}s linear infinite`,
            width: "max-content",
          }}
        >
          {items.map((marca, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center h-12 px-4"
            >
              {marca.logo ? (
                <Image
                  src={marca.logo}
                  alt={marca.nombre}
                  width={100}
                  height={48}
                  className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                />
              ) : (
                <span
                  className="text-[#b0b0a8] font-semibold text-sm whitespace-nowrap hover:text-[#717171] transition-colors cursor-default"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {marca.nombre}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .flex[style*="marquee"] {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
