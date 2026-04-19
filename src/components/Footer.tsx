import Image from "next/image";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

interface GeneralConfig {
  nombre: string;
  slogan: string;
  direccion: string;
  telefono: string;
  email: string;
  horario: string;
  horario_domingo: string;
  facebook: string;
  instagram: string;
  tiktok: string;
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer({ config }: { config: GeneralConfig }) {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Centro Comercial Bolívar Plaza"
              width={140}
              height={42}
              className="h-10 w-auto object-contain brightness-0 invert mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {config.slogan} Más de 20 años siendo el punto de encuentro de Pereira.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={config.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Bolívar Plaza"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8fc74a] flex items-center justify-center transition-colors"
              >
                <FacebookIcon size={15} />
              </a>
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Bolívar Plaza"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8fc74a] flex items-center justify-center transition-colors"
              >
                <InstagramIcon size={15} />
              </a>
              <a
                href={config.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Bolívar Plaza"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8fc74a] flex items-center justify-center transition-colors"
              >
                <TikTokIcon size={15} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="font-semibold text-white text-sm uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Explora
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Directorio de tiendas", href: "#tiendas" },
                { label: "Gastronomía", href: "#gastronomia" },
                { label: "Cartelera de cine", href: "#cine" },
                { label: "Eventos", href: "#eventos" },
                { label: "Arrendar un local", href: "#contacto" },
                { label: "PQR", href: "#contacto" },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#8fc74a] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3
              className="font-semibold text-white text-sm uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Visítanos
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-white/60">
                <MapPin size={16} className="text-[#8fc74a] flex-shrink-0 mt-0.5" />
                <span>{config.direccion}</span>
              </li>
              <li className="flex gap-3 text-sm text-white/60">
                <Clock size={16} className="text-[#8fc74a] flex-shrink-0 mt-0.5" />
                <div>
                  <p>{config.horario}</p>
                  <p>{config.horario_domingo}</p>
                </div>
              </li>
              <li className="flex gap-3 text-sm text-white/60">
                <Phone size={16} className="text-[#8fc74a] flex-shrink-0 mt-0.5" />
                <a href={`tel:${config.telefono}`} className="hover:text-[#8fc74a] transition-colors">
                  {config.telefono}
                </a>
              </li>
              <li className="flex gap-3 text-sm text-white/60">
                <Mail size={16} className="text-[#8fc74a] flex-shrink-0 mt-0.5" />
                <a href={`mailto:${config.email}`} className="hover:text-[#8fc74a] transition-colors">
                  {config.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} {config.nombre}. Todos los derechos reservados.
          </p>
          <p className="text-white/30 text-xs">
            Built with Claude Web Builder by{" "}
            <a
              href="https://tododeia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Tododeia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
