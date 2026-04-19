"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const TAMANOS: Record<string, string> = {
  pequeno:   "max-w-[360px]",
  mediano:   "max-w-[480px]",
  grande:    "max-w-[640px]",
  panoramico: "max-w-[800px]",
};

interface PopupConfig {
  activo: boolean;
  imagen: string;
  alt: string;
  tamano?: string;
  link: string;
  link_texto: string;
}

export default function WelcomePopup({ config }: { config: PopupConfig }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!config.activo) return;
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, [config.activo]);

  if (!config.activo || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Anuncio especial"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Modal */}
      <div className={`relative z-10 w-full bg-white rounded-2xl overflow-hidden shadow-2xl ${TAMANOS[config.tamano ?? "mediano"] ?? TAMANOS.mediano}`}>
        <button
          onClick={() => setVisible(false)}
          aria-label="Cerrar anuncio"
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        >
          <X size={18} />
        </button>

        {config.imagen && (
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={config.imagen}
              alt={config.alt || "Anuncio"}
              fill
              className="object-cover"
            />
          </div>
        )}

        {config.link && (
          <div className="p-4 text-center">
            <a
              href={config.link}
              className="inline-block bg-[#8fc74a] hover:bg-[#7ab33b] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
              onClick={() => setVisible(false)}
            >
              {config.link_texto || "Ver más"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
