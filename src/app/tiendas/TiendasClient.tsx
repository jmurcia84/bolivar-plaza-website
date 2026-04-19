"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Globe, ArrowLeft, Search } from "lucide-react";
import type { Tienda } from "@/lib/content";

const CATEGORIAS = ["Todas", "Moda", "Gastronomía", "Entretenimiento", "Servicios"];

const CATEGORY_COLORS: Record<string, string> = {
  Moda: "#d4a853",
  Gastronomía: "#8fc74a",
  Entretenimiento: "#6b5ce7",
  Servicios: "#2d9cdb",
};

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.508A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.006-1.374l-.36-.214-3.762.895.956-3.668-.234-.375A9.818 9.818 0 012.182 12C2.182 6.577 6.577 2.182 12 2.182S21.818 6.577 21.818 12 17.423 21.818 12 21.818z"/>
    </svg>
  );
}

function TiendaGrid({ tiendas, categoria }: { tiendas: Tienda[]; categoria: string }) {
  const [busqueda, setBusqueda] = useState("");

  const filtradas = tiendas
    .filter((t) => categoria === "Todas" || t.categoria === categoria)
    .filter((t) =>
      busqueda.trim() === "" ||
      t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <>
      {/* Search */}
      <div className="relative max-w-sm mb-8">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#717171]" />
        <input
          type="search"
          placeholder="Buscar tienda..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e8e8e2] bg-white text-sm text-[#1a1a1a] placeholder:text-[#b0b0a8] focus:outline-none focus:ring-2 focus:ring-[#8fc74a]/40 focus:border-[#8fc74a] transition"
        />
      </div>

      {filtradas.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#1a1a1a] font-medium mb-1" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Sin resultados
          </p>
          <p className="text-[#717171] text-sm">Intenta con otro término o categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtradas.map((tienda, i) => {
            const color = CATEGORY_COLORS[tienda.categoria] || "#8fc74a";
            return (
              <article
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-[#e8e8e2] hover:shadow-md transition-shadow"
              >
                {/* Store photo / placeholder */}
                <div
                  className="relative h-44 flex items-center justify-center"
                  style={{ background: `${color}18` }}
                >
                  {tienda.foto_local ? (
                    <Image
                      src={tienda.foto_local}
                      alt={`Local de ${tienda.nombre}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span
                      className="text-5xl font-bold opacity-20"
                      style={{
                        color,
                        fontFamily: "var(--font-playfair), serif",
                      }}
                    >
                      {tienda.nombre.charAt(0)}
                    </span>
                  )}
                  {/* Category tag */}
                  <span
                    className="absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: color }}
                  >
                    {tienda.categoria}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className="font-semibold text-[#1a1a1a] text-base leading-tight"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {tienda.nombre}
                    </h3>
                    {tienda.logo && (
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#e8e8e2] flex-shrink-0">
                        <Image
                          src={tienda.logo}
                          alt={`Logo ${tienda.nombre}`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    )}
                  </div>

                  <p className="flex items-center gap-1 text-xs text-[#717171] mb-3">
                    <MapPin size={11} />
                    Local {tienda.numero_local} · Piso {tienda.piso}
                  </p>

                  {tienda.descripcion && (
                    <p className="text-sm text-[#717171] leading-relaxed mb-4 line-clamp-2">
                      {tienda.descripcion}
                    </p>
                  )}

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
                          <WhatsAppIcon size={15} />
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
                          <InstagramIcon size={15} />
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
                          <FacebookIcon size={15} />
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
                          <Globe size={15} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

function TiendasContent({ tiendas }: { tiendas: Tienda[] }) {
  const searchParams = useSearchParams();
  const categoriaParam = searchParams.get("categoria") || "Todas";
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIAS.includes(categoriaParam) ? categoriaParam : "Todas"
  );

  useEffect(() => {
    const cat = searchParams.get("categoria") || "Todas";
    setActiveCategory(CATEGORIAS.includes(cat) ? cat : "Todas");
  }, [searchParams]);

  const counts = CATEGORIAS.reduce(
    (acc, cat) => {
      acc[cat] =
        cat === "Todas"
          ? tiendas.length
          : tiendas.filter((t) => t.categoria === cat).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-[#8fc74a] text-white shadow-sm"
                : "bg-[#f5f5f0] text-[#717171] hover:bg-[#e8e8e2]"
            }`}
          >
            {cat}
            <span
              className={`ml-1.5 text-xs ${
                activeCategory === cat ? "text-white/80" : "text-[#b0b0a8]"
              }`}
            >
              ({counts[cat]})
            </span>
          </button>
        ))}
      </div>

      <TiendaGrid tiendas={tiendas} categoria={activeCategory} />
    </div>
  );
}

export default function TiendasClient({ tiendas }: { tiendas: Tienda[] }) {
  return (
    <Suspense fallback={<div className="text-[#717171] py-12 text-center text-sm">Cargando tiendas...</div>}>
      <TiendasContent tiendas={tiendas} />
    </Suspense>
  );
}
