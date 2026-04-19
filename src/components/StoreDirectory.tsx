"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, MapPin } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.508A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.006-1.374l-.36-.214-3.762.895.956-3.668-.234-.375A9.818 9.818 0 012.182 12C2.182 6.577 6.577 2.182 12 2.182S21.818 6.577 21.818 12 17.423 21.818 12 21.818z"/>
    </svg>
  );
}

interface Tienda {
  nombre: string;
  categoria: string;
  descripcion: string;
  numero_local: string;
  piso: string;
  logo: string;
  foto_local: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  tiktok: string;
  web: string;
}

const CATEGORIAS = ["Todas", "Moda", "Gastronomía", "Entretenimiento", "Servicios"];

export default function StoreDirectory({ tiendas }: { tiendas: Tienda[] }) {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filtered =
    activeCategory === "Todas"
      ? tiendas
      : tiendas.filter((t) => t.categoria === activeCategory);

  return (
    <section id="tiendas" className="py-20 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[#8fc74a] text-sm font-semibold tracking-widest uppercase">
            Directorio
          </span>
          <h2
            className="font-heading text-3xl sm:text-4xl font-bold text-[#1a1a1a] mt-2 mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Nuestras tiendas
          </h2>
          <p className="text-[#717171] text-base max-w-xl">
            Más de 120 locales agrupados por categoría. Encuentra exactamente lo que buscas.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#8fc74a] text-white"
                  : "bg-[#f5f5f0] text-[#717171] hover:bg-[#e8e8e2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Store grid */}
        {filtered.length === 0 ? (
          <p className="text-[#717171] py-12 text-center">
            Próximamente más tiendas en esta categoría.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tienda, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-[#e8e8e2] hover:shadow-md transition-shadow"
              >
                {/* Store photo */}
                <div className="relative h-44 bg-[#f5f5f0]">
                  {tienda.foto_local ? (
                    <Image
                      src={tienda.foto_local}
                      alt={`Local de ${tienda.nombre}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#8fc74a]/15 flex items-center justify-center">
                        <span
                          className="text-2xl font-bold text-[#8fc74a]"
                          style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                          {tienda.nombre.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-white/90 text-[#1a1a1a] text-xs font-semibold px-2.5 py-1 rounded-full">
                    {tienda.categoria}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    {/* Logo thumbnail */}
                    {tienda.logo && (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#e8e8e2] flex-shrink-0">
                        <Image
                          src={tienda.logo}
                          alt={`Logo ${tienda.nombre}`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    )}
                    <div>
                      <h3
                        className="font-semibold text-[#1a1a1a] text-base leading-tight"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {tienda.nombre}
                      </h3>
                      <span className="flex items-center gap-1 text-xs text-[#717171] mt-0.5">
                        <MapPin size={11} />
                        Local {tienda.numero_local} · Piso {tienda.piso}
                      </span>
                    </div>
                  </div>

                  {tienda.descripcion && (
                    <p className="text-sm text-[#717171] leading-relaxed mb-4 line-clamp-2">
                      {tienda.descripcion}
                    </p>
                  )}

                  {/* Social links */}
                  {(tienda.instagram || tienda.facebook || tienda.whatsapp || tienda.web) && (
                    <div className="flex gap-3 pt-3 border-t border-[#e8e8e2]">
                      {tienda.whatsapp && (
                        <a
                          href={`https://wa.me/${tienda.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp de ${tienda.nombre}`}
                          className="text-[#717171] hover:text-[#25D366] transition-colors"
                        >
                          <WhatsAppIcon size={16} />
                        </a>
                      )}
                      {tienda.instagram && (
                        <a
                          href={tienda.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Instagram de ${tienda.nombre}`}
                          className="text-[#717171] hover:text-[#8fc74a] transition-colors"
                        >
                          <InstagramIcon size={16} />
                        </a>
                      )}
                      {tienda.facebook && (
                        <a
                          href={tienda.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Facebook de ${tienda.nombre}`}
                          className="text-[#717171] hover:text-[#1877F2] transition-colors"
                        >
                          <FacebookIcon size={16} />
                        </a>
                      )}
                      {tienda.web && (
                        <a
                          href={tienda.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Sitio web de ${tienda.nombre}`}
                          className="text-[#717171] hover:text-[#8fc74a] transition-colors"
                        >
                          <Globe size={16} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
