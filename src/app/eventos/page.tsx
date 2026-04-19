import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventosClient from "./EventosClient";
import { readJson, readJsonDir, type GeneralConfig, type Evento } from "@/lib/content";

export const metadata: Metadata = {
  title: "Eventos — Centro Comercial Bolívar Plaza",
  description:
    "Agenda de eventos en Bolívar Plaza. Ferias, shows, actividades familiares y más en el corazón de Pereira.",
};

export default function EventosPage() {
  const general = readJson<GeneralConfig>("content/config/general.json");
  const eventos = readJsonDir<Evento>("content/eventos");

  return (
    <>
      <Navbar />

      {/* Page header */}
      <header className="pt-28 pb-12 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Inicio
          </Link>
          <span className="block text-[#8fc74a] text-sm font-semibold tracking-widest uppercase mb-2">
            Agenda
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Eventos
          </h1>
          <p className="text-white/60 text-base mt-3 max-w-xl">
            Siempre hay algo nuevo en Bolívar Plaza. Selecciona un día en el calendario para ver los eventos programados.
          </p>
        </div>
      </header>

      <main className="py-16 bg-[#fafaf8] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventosClient eventos={eventos} />
        </div>
      </main>

      <Footer config={general} />
    </>
  );
}
