"use client";

import { useState } from "react";

const TIPOS_SOLICITUD = [
  { value: "", label: "Seleccionar tipo de solicitud" },
  { value: "Cotización", label: "Cotización de local" },
  { value: "Petición", label: "Petición" },
  { value: "Queja", label: "Queja" },
  { value: "Reclamo", label: "Reclamo" },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo: "",
    descripcion: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.tipo) {
      setError("Por favor selecciona un tipo de solicitud.");
      return;
    }
    // TODO: Replace with Formspree or backend endpoint
    // For now, simulate submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#8fc74a]/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-[#8fc74a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3
          className="font-heading text-xl font-bold text-[#1a1a1a] mb-2"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          ¡Mensaje enviado!
        </h3>
        <p className="text-[#717171] text-sm">
          Nos pondremos en contacto contigo pronto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
          >
            Nombre completo <span className="text-[#ed0d08]">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className="w-full px-4 py-3 rounded-lg border border-[#e8e8e2] bg-white text-[#1a1a1a] text-sm placeholder:text-[#b0b0a8] focus:outline-none focus:ring-2 focus:ring-[#8fc74a]/40 focus:border-[#8fc74a] transition"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
          >
            Correo electrónico <span className="text-[#ed0d08]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-3 rounded-lg border border-[#e8e8e2] bg-white text-[#1a1a1a] text-sm placeholder:text-[#b0b0a8] focus:outline-none focus:ring-2 focus:ring-[#8fc74a]/40 focus:border-[#8fc74a] transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="telefono"
            className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
          >
            Teléfono <span className="text-[#ed0d08]">*</span>
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            value={form.telefono}
            onChange={handleChange}
            placeholder="+57 300 000 0000"
            className="w-full px-4 py-3 rounded-lg border border-[#e8e8e2] bg-white text-[#1a1a1a] text-sm placeholder:text-[#b0b0a8] focus:outline-none focus:ring-2 focus:ring-[#8fc74a]/40 focus:border-[#8fc74a] transition"
          />
        </div>

        <div>
          <label
            htmlFor="tipo"
            className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
          >
            Tipo de solicitud <span className="text-[#ed0d08]">*</span>
          </label>
          <select
            id="tipo"
            name="tipo"
            required
            value={form.tipo}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-[#e8e8e2] bg-white text-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#8fc74a]/40 focus:border-[#8fc74a] transition appearance-none"
          >
            {TIPOS_SOLICITUD.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="descripcion"
          className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
        >
          Descripción <span className="text-[#ed0d08]">*</span>
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          required
          rows={5}
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Cuéntanos en qué podemos ayudarte..."
          className="w-full px-4 py-3 rounded-lg border border-[#e8e8e2] bg-white text-[#1a1a1a] text-sm placeholder:text-[#b0b0a8] focus:outline-none focus:ring-2 focus:ring-[#8fc74a]/40 focus:border-[#8fc74a] transition resize-none"
        />
      </div>

      {error && (
        <p className="text-[#ed0d08] text-sm" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-[#8fc74a] hover:bg-[#7ab33b] text-white font-semibold py-3.5 px-6 rounded-lg transition-colors text-sm"
      >
        Enviar solicitud
      </button>
    </form>
  );
}
