"use client";

import Script from "next/script";

export default function NetlifyIdentity() {
  return (
    <Script
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        const ni = (window as any).netlifyIdentity;
        if (ni) {
          ni.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      }}
    />
  );
}
