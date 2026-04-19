"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Tiendas", href: "/tiendas" },
  { label: "Eventos", href: "/eventos" },
  { label: "Gastronomía", href: "/tiendas?categoria=Gastronom%C3%ADa" },
  { label: "Cine", href: "/#cine" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Centro Comercial Bolívar Plaza"
              width={240}
              height={72}
              className="h-[84px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-[#1a1a1a] hover:text-[#8fc74a] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contacto"
              className="ml-2 bg-[#8fc74a] hover:bg-[#7ab33b] text-white text-base font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              Arrendar local
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-[#1a1a1a]"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#e8e8e2] px-4 pb-6 pt-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[#1a1a1a] hover:text-[#8fc74a] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 bg-[#8fc74a] text-white text-sm font-semibold px-5 py-3 rounded-lg text-center"
            >
              Arrendar local
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
