"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Clock, ExternalLink, Users } from "lucide-react";
import type { Evento } from "@/lib/content";

const DIAS_SEMANA = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function EventosClient({ eventos }: { eventos: Evento[] }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const cells = buildCalendar(viewYear, viewMonth);

  // days that have events this month
  const eventDays = new Set(
    eventos
      .filter((e) => {
        const d = new Date(e.fecha + "T00:00:00");
        return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
      })
      .map((e) => new Date(e.fecha + "T00:00:00").getDate())
  );

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  };

  const filteredEventos = eventos
    .filter((e) => {
      const d = new Date(e.fecha + "T00:00:00");
      if (selectedDay !== null) {
        return (
          d.getFullYear() === viewYear &&
          d.getMonth() === viewMonth &&
          d.getDate() === selectedDay
        );
      }
      return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
    })
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10">
      {/* Calendar */}
      <aside>
        <div className="bg-white rounded-2xl border border-[#e8e8e2] overflow-hidden sticky top-24">
          {/* Calendar header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#1a1a1a]">
            <button
              onClick={prevMonth}
              aria-label="Mes anterior"
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <h2
              className="text-white font-semibold text-base"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {MESES[viewMonth]} {viewYear}
            </h2>
            <button
              onClick={nextMonth}
              aria-label="Mes siguiente"
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 px-4 pt-4 pb-1">
            {DIAS_SEMANA.map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-[#b0b0a8] py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 px-4 pb-5 gap-y-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const hasEvent = eventDays.has(day);
              const isToday =
                day === today.getDate() &&
                viewMonth === today.getMonth() &&
                viewYear === today.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  aria-label={`${day} de ${MESES[viewMonth]}`}
                  className={`relative flex items-center justify-center text-sm h-9 w-full rounded-lg transition-all font-medium
                    ${isSelected ? "bg-[#8fc74a] text-white" : ""}
                    ${isToday && !isSelected ? "ring-2 ring-[#8fc74a] text-[#8fc74a]" : ""}
                    ${!isSelected && !isToday ? "text-[#1a1a1a] hover:bg-[#f5f5f0]" : ""}
                  `}
                >
                  {day}
                  {hasEvent && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#8fc74a]" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedDay && (
            <div className="px-4 pb-4">
              <button
                onClick={() => setSelectedDay(null)}
                className="w-full text-xs text-[#717171] hover:text-[#1a1a1a] py-2 transition-colors"
              >
                Mostrar todos los eventos del mes
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Events list */}
      <section>
        <h2
          className="text-xl font-bold text-[#1a1a1a] mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {selectedDay
            ? `${selectedDay} de ${MESES[viewMonth]}`
            : `${MESES[viewMonth]} ${viewYear}`}
          <span className="ml-2 text-sm font-normal text-[#717171]">
            ({filteredEventos.length} {filteredEventos.length === 1 ? "evento" : "eventos"})
          </span>
        </h2>

        {filteredEventos.length === 0 ? (
          <div className="text-center py-16 bg-[#fafaf8] rounded-2xl border border-[#e8e8e2]">
            <p
              className="text-[#1a1a1a] font-medium mb-1"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Sin eventos
            </p>
            <p className="text-[#717171] text-sm">
              {selectedDay
                ? "No hay eventos programados para este día."
                : "No hay eventos programados para este mes."}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredEventos.map((evento, i) => {
              const fecha = new Date(evento.fecha + "T00:00:00");
              const dia = fecha.toLocaleDateString("es-CO", { day: "numeric" });
              const mes = fecha
                .toLocaleDateString("es-CO", { month: "short" })
                .replace(".", "");
              return (
                <article
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e8e8e2] hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-[#f5f5f0]">
                    {evento.imagen ? (
                      <Image
                        src={evento.imagen}
                        alt={evento.titulo}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <Users size={40} className="text-[#8fc74a]/25" />
                      </div>
                    )}
                    {/* Date badge */}
                    <div className="absolute top-4 left-4 bg-[#8fc74a] text-white rounded-xl px-3 py-2 flex flex-col items-center min-w-[48px] shadow-md">
                      <span
                        className="text-xl font-bold leading-none"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {dia}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-white/80 mt-0.5">
                        {mes}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="font-bold text-[#1a1a1a] text-xl leading-snug mb-3"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {evento.titulo}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                      {evento.hora && (
                        <span className="flex items-center gap-1.5 text-xs text-[#717171]">
                          <Clock size={12} /> {evento.hora}
                        </span>
                      )}
                      {evento.lugar && (
                        <span className="flex items-center gap-1.5 text-xs text-[#717171]">
                          <MapPin size={12} /> {evento.lugar}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#717171] leading-relaxed">
                      {evento.descripcion}
                    </p>
                    {evento.link && (
                      <a
                        href={evento.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#8fc74a] hover:text-[#7ab33b] transition-colors"
                      >
                        Más información <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
