import { readFileSync, readdirSync } from "fs";
import path from "path";

export function readJson<T>(filePath: string): T {
  const full = path.join(process.cwd(), filePath);
  return JSON.parse(readFileSync(full, "utf-8")) as T;
}

export function readJsonDir<T>(dir: string): T[] {
  const full = path.join(process.cwd(), dir);
  try {
    return readdirSync(full)
      .filter((f) => f.endsWith(".json"))
      .sort()
      .map((f) => JSON.parse(readFileSync(path.join(full, f), "utf-8")) as T);
  } catch {
    return [];
  }
}

export interface Tienda {
  nombre: string;
  categoria: string;
  descripcion: string;
  numero_local: string;
  piso: string;
  logo: string;
  foto_local: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  web: string;
}

export interface Evento {
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
  descripcion: string;
  imagen: string;
  link: string;
}

export interface Pelicula {
  titulo: string;
  clasificacion: string;
  duracion: string;
  horarios: string[];
  imagen: string;
  descripcion: string;
}

export interface GeneralConfig {
  nombre: string;
  slogan: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  email: string;
  horario: string;
  horario_domingo: string;
  anos_operacion: number;
  facebook: string;
  instagram: string;
  tiktok: string;
}

export interface SlideItem {
  id: string;
  imagen: string;
  titulo: string;
  subtitulo: string;
  cta_texto: string;
  cta_link: string;
}

export interface PopupConfig {
  activo: boolean;
  imagen: string;
  alt: string;
  link: string;
  link_texto: string;
}
