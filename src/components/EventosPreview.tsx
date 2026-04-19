import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Calendar, Users } from "lucide-react";
import type { Evento } from "@/lib/content";

export default function EventosPreview({ eventos }: { eventos: Evento[] }) {
  const proximos = eventos
    .filter((e) => new Date(e.fecha + "T00:00:00") >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 3);

  return (
    <section id="eventos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-[#8fc74a] text-sm font-semibold tracking-widest uppercase">
              Agenda
            </span>
            <h2
              className="font-heading text-3xl sm:text-4xl font-bold text-[#1a1a1a] mt-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Eventos próximos
            </h2>
          </div>
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8fc74a] hover:text-[#7ab33b] transition-colors whitespace-nowrap"
          >
            Ver todos los eventos <ArrowRight size={15} />
          </Link>
        </div>

        {proximos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {proximos.map((evento, i) => {
              const fecha = new Date(evento.fecha + "T00:00:00");
              const dia = fecha.toLocaleDateString("es-CO", { day: "numeric" });
              const mes = fecha.toLocaleDateString("es-CO", { month: "short" }).replace(".", "");
              return (
                <article
                  key={i}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#e8e8e2] hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-44 bg-[#f5f5f0] overflow-hidden">
                    {evento.imagen ? (
                      <Image
                        src={evento.imagen}
                        alt={evento.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <Users size={36} className="text-[#8fc74a]/30" />
                      </div>
                    )}
                    {/* Date badge over image */}
                    <div className="absolute top-3 left-3 bg-[#8fc74a] text-white rounded-xl px-3 py-2 flex flex-col items-center min-w-[44px]">
                      <span
                        className="text-lg font-bold leading-none"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {dia}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-white/80 mt-0.5">
                        {mes}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3
                      className="font-semibold text-[#1a1a1a] text-base leading-snug mb-2 line-clamp-2"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {evento.titulo}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {evento.hora && (
                        <p className="text-xs text-[#717171] flex items-center gap-1.5">
                          <Calendar size={11} /> {evento.hora}
                        </p>
                      )}
                      {evento.lugar && (
                        <p className="text-xs text-[#717171] flex items-center gap-1.5 line-clamp-1">
                          <MapPin size={11} /> {evento.lugar}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#fafaf8] rounded-2xl border border-[#e8e8e2]">
            <p className="text-[#717171] text-sm">Nuevos eventos próximamente.</p>
          </div>
        )}
      </div>
    </section>
  );
}
