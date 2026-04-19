import { MapPin, Clock, Film, UtensilsCrossed, Baby } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import WelcomePopup from "@/components/WelcomePopup";
import CategoryCards from "@/components/CategoryCards";
import LogosSlider from "@/components/LogosSlider";
import EventosPreview from "@/components/EventosPreview";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import {
  readJson,
  readJsonDir,
  type GeneralConfig,
  type Evento,
  type PopupConfig,
  type SlideItem,
} from "@/lib/content";

export default function Home() {
  const general = readJson<GeneralConfig>("content/config/general.json");
  const slider = readJson<{ slides: SlideItem[] }>("content/config/slider.json");
  const popup = readJson<PopupConfig>("content/config/popup.json");
  const marcas = readJson<{ marcas: { nombre: string; logo: string }[] }>(
    "content/config/marcas.json"
  );
  const eventos = readJsonDir<Evento>("content/eventos");

  return (
    <>
      <WelcomePopup config={popup} />
      <Navbar />

      <main>
        {/* ── Hero Slider ──────────────────────────────────────── */}
        <HeroSlider slides={slider.slides} />

        {/* ── Category cards — overlap hero ───────────────────── */}
        <CategoryCards />

        {/* ── Brand logos marquee ──────────────────────────────── */}
        <div className="pt-10">
          <LogosSlider marcas={marcas.marcas} />
        </div>

        {/* ── Events preview ───────────────────────────────────── */}
        <EventosPreview eventos={eventos} />

        {/* ── Cinema ───────────────────────────────────────────── */}
        <section id="cine" className="py-20 bg-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="text-[#8fc74a] text-sm font-semibold tracking-widest uppercase">
                Cine
              </span>
              <h2
                className="font-heading text-3xl sm:text-4xl font-bold text-[#1a1a1a] mt-2"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Cartelera de la semana
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#e8e8e2] shadow-sm bg-white">
              <iframe
                src="https://cinemasroyalfilms.com/cartelera/pereira"
                title="Cartelera Cinemasroyalfilms Pereira"
                width="100%"
                height="860"
                className="block w-full"
                style={{ border: "none" }}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ── Por qué visitarnos — fondo oscuro ────────────────── */}
        <section className="py-20 bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#8fc74a] text-sm font-semibold tracking-widest uppercase">
                  Por qué visitarnos
                </span>
                <h2
                  className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2 mb-6 leading-snug"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Todo lo que necesitas,<br />a un paso de casa.
                </h2>
                <p className="text-white/60 text-base leading-relaxed mb-8">
                  Bolívar Plaza está en el centro de Pereira — porque la ciudad tiene un centro
                  y ese centro eres tú. Desde hace más de 20 años, familias, amigos y vecinos
                  se encuentran aquí.
                </p>
                <a
                  href="/tiendas"
                  className="inline-flex items-center bg-[#8fc74a] hover:bg-[#7ab33b] text-white font-semibold px-7 py-3 rounded-lg transition-colors text-sm"
                >
                  Ver directorio de tiendas
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <MapPin size={22} className="text-[#8fc74a]" />,
                    titulo: "Ubicación céntrica",
                    desc: "En el corazón de Pereira, fácil de llegar en transporte público o vehículo propio.",
                  },
                  {
                    icon: <UtensilsCrossed size={22} className="text-[#8fc74a]" />,
                    titulo: "Gastronomía",
                    desc: "Restaurantes y cafés con opciones para todos los gustos y momentos del día.",
                  },
                  {
                    icon: <Baby size={22} className="text-[#8fc74a]" />,
                    titulo: "Zona de niños",
                    desc: "Un espacio seguro y divertido para que los más pequeños disfruten.",
                  },
                  {
                    icon: <Film size={22} className="text-[#8fc74a]" />,
                    titulo: "Cine",
                    desc: "Las mejores películas con la mayor pantalla y comodidad de Pereira.",
                  },
                ].map((item) => (
                  <div
                    key={item.titulo}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#8fc74a]/15 rounded-xl flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3
                      className="font-semibold text-white text-sm mb-2"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {item.titulo}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Social proof ─────────────────────────────────────── */}
        <section className="py-16 bg-[#8fc74a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Más de 20 años siendo el centro de Pereira.
            </p>
            <p className="text-white/80 text-base max-w-xl mx-auto">
              Generaciones de familias pereiranas han elegido Bolívar Plaza como su lugar de
              encuentro. Eso no es marketing — eso es historia.
            </p>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contacto" className="py-20 bg-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="text-[#8fc74a] text-sm font-semibold tracking-widest uppercase">
                  Contacto
                </span>
                <h2
                  className="font-heading text-3xl sm:text-4xl font-bold text-[#1a1a1a] mt-2 mb-6"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  ¿Cómo podemos ayudarte?
                </h2>
                <p className="text-[#717171] text-base leading-relaxed mb-8">
                  ¿Interesado en arrendar un local? ¿Tienes una petición, queja o reclamo?
                  Completa el formulario y te responderemos a la brevedad.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#8fc74a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-[#8fc74a]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a]">Dirección</p>
                      <p className="text-sm text-[#717171]">{general.direccion}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#8fc74a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-[#8fc74a]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a]">Horario</p>
                      <p className="text-sm text-[#717171]">{general.horario}</p>
                      <p className="text-sm text-[#717171]">{general.horario_domingo}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-[#e8e8e2]">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer config={general} />
    </>
  );
}
