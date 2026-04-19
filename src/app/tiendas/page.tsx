import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TiendasClient from "./TiendasClient";
import { readJson, readJsonDir, type GeneralConfig, type Tienda } from "@/lib/content";

export const metadata: Metadata = {
  title: "Directorio de Tiendas — Centro Comercial Bolívar Plaza",
  description:
    "Encuentra todas las tiendas de Bolívar Plaza. Moda, gastronomía, entretenimiento y servicios en el corazón de Pereira.",
};

export default function TiendasPage() {
  const general = readJson<GeneralConfig>("content/config/general.json");
  const tiendas = readJsonDir<Tienda>("content/tiendas");

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
            Directorio
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Nuestras tiendas
          </h1>
          <p className="text-white/60 text-base mt-3 max-w-xl">
            Más de 120 locales organizados por categoría. Encuentra exactamente lo que buscas.
          </p>
        </div>
      </header>

      <main className="py-16 bg-[#fafaf8] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiendasClient tiendas={tiendas} />
        </div>
      </main>

      <Footer config={general} />
    </>
  );
}
