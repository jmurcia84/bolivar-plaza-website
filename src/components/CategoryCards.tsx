"use client";

import { useRef } from "react";
import Link from "next/link";
import { Shirt, UtensilsCrossed, Sparkles, Wrench, ArrowRight } from "lucide-react";

const CATEGORIAS = [
  {
    nombre: "Moda",
    slug: "Moda",
    descripcion: "Ropa, calzado y accesorios",
    icon: <Shirt size={28} />,
    bg: "linear-gradient(135deg, #d4a853 0%, #8B6914 100%)",
  },
  {
    nombre: "Gastronomía",
    slug: "Gastronomía",
    descripcion: "Restaurantes y cafés",
    icon: <UtensilsCrossed size={28} />,
    bg: "linear-gradient(135deg, #8fc74a 0%, #5a8a2a 100%)",
  },
  {
    nombre: "Entretenimiento",
    slug: "Entretenimiento",
    descripcion: "Cine, juegos y diversión",
    icon: <Sparkles size={28} />,
    bg: "linear-gradient(135deg, #6b5ce7 0%, #3d2fa0 100%)",
  },
  {
    nombre: "Servicios",
    slug: "Servicios",
    descripcion: "Bancos, salud y más",
    icon: <Wrench size={28} />,
    bg: "linear-gradient(135deg, #2d9cdb 0%, #1a6fa0 100%)",
  },
];

export default function CategoryCards() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const glareRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    i: number
  ) => {
    const card = cardRefs.current[i];
    const glare = glareRefs.current[i];
    if (!card || !glare) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateY = ((x - cx) / cx) * 10;
    const rotateX = ((y - cy) / cy) * -10;

    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`;
    card.style.transition = "transform 0.08s ease-out";
    card.style.boxShadow = "0 20px 50px rgba(0,0,0,0.35)";

    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;
    glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
    glare.style.opacity = "1";
  };

  const handleMouseLeave = (i: number) => {
    const card = cardRefs.current[i];
    const glare = glareRefs.current[i];
    if (!card || !glare) return;
    card.style.transform =
      "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.transition =
      "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.55s ease";
    card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
    glare.style.opacity = "0";
  };

  return (
    <div className="relative z-10 -mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIAS.map((cat, i) => (
            <Link
              key={cat.slug}
              ref={(el) => { cardRefs.current[i] = el; }}
              href={`/tiendas?categoria=${encodeURIComponent(cat.slug)}`}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="group relative overflow-hidden rounded-2xl block"
              style={{
                background: cat.bg,
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                willChange: "transform",
              }}
            >
              {/* Glare */}
              <div
                ref={(el) => { glareRefs.current[i] = el; }}
                className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-200"
                style={{ opacity: 0, zIndex: 20 }}
              />

              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />

              {/* Glow orb */}
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/10"
                style={{ transform: "translate(30%, -30%)" }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between p-5 h-40">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
                  {cat.icon}
                </div>
                <div>
                  <h3
                    className="text-white font-bold text-base sm:text-lg leading-tight"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    {cat.nombre}
                  </h3>
                  <p className="text-white/65 text-xs mt-0.5 mb-2">
                    {cat.descripcion}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-white/80 group-hover:text-white text-xs font-semibold group-hover:gap-2 transition-all">
                    Ver tiendas <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
