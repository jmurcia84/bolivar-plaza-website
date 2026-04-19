"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

// Ancho máximo del modal según tamaño configurado en CMS
const TAMANOS: Record<string, string> = {
  pequeno:    "max-w-[360px]",
  mediano:    "max-w-[480px]",
  grande:     "max-w-[640px]",
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
    const identityTokens = ["invite_token", "confirmation_token", "recovery_token", "access_token"];
    if (identityTokens.some((t) => window.location.hash.includes(t))) return;
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, [config.activo]);

  if (!config.activo || !visible) return null;

  const maxW = TAMANOS[config.tamano ?? "mediano"] ?? TAMANOS.mediano;

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

      {/*
        Modal: ancho limitado por tamano, alto limitado al 90% del viewport.
        La imagen determina la altura real del popup — si es pequeña,
        el popup se encoge; si es grande, queda acotada por max-h.
      */}
      <div
        className={`relative z-10 w-full ${maxW} max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col`}
      >
        {/* Botón cerrar */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Cerrar anuncio"
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        >
          <X size={18} />
        </button>

        {config.imagen && (
          /*
            Imagen completa sin recorte:
            - next/image con width/height=0 + sizes deja que CSS controle el tamaño
            - width: 100% llena el ancho del modal
            - height: auto mantiene la proporción original
            - max-height: 90vh evita que desborde la pantalla
            - object-contain garantiza que nunca se recorte
          */
          <div className="flex-1 overflow-hidden flex items-center justify-center">
            <Image
              src={config.imagen}
              alt={config.alt || "Anuncio"}
              width={0}
              height={0}
              sizes="(max-width: 480px) 100vw, (max-width: 640px) 640px, 800px"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "calc(90vh - 56px)", // 56px reservados para el botón CTA si existe
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        )}

        {config.link && (
          <div className="flex-shrink-0 p-4 text-center bg-white">
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
