import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  title: "Centro Comercial Bolívar Plaza — Donde el centro eres tú",
  description:
    "El lugar de encuentro de Pereira. Más de 120 tiendas, gastronomía, cine y zona de niños en el corazón de la ciudad.",
  keywords:
    "centro comercial, Pereira, Bolívar Plaza, tiendas, gastronomía, cine, Risaralda",
  openGraph: {
    title: "Centro Comercial Bolívar Plaza",
    description:
      "Donde el centro eres tú. Más de 120 tiendas en el corazón de Pereira.",
    url: "https://www.ccbolivarplaza.com",
    siteName: "Centro Comercial Bolívar Plaza",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Netlify Identity widget — necesario para procesar tokens de invite/recovery en la raíz */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">{`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", function(user) {
              if (!user) {
                window.netlifyIdentity.on("login", function() {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `}</Script>
      </body>
    </html>
  );
}
