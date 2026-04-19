"use client";

import Script from "next/script";

export default function NetlifyIdentity() {
  return (
    <Script
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        const ni = (window as any).netlifyIdentity;
        if (!ni) return;

        const redirectToAdmin = () => {
          try { sessionStorage.removeItem("nf_redirect_admin"); } catch (e) {}
          document.location.href = "/admin/";
        };

        // Caso A: login ocurre DESPUÉS de que este listener se registra
        ni.on("login", redirectToAdmin);

        // Caso B: el widget procesó el token tan rápido que login ya disparó
        // antes de que onLoad corriera — si el usuario ya está logueado y
        // vino de un token de invitación, redirigimos desde init
        ni.on("init", (user: unknown) => {
          try {
            if (user && sessionStorage.getItem("nf_redirect_admin")) {
              redirectToAdmin();
            }
          } catch (e) {}
        });
      }}
    />
  );
}
