import { Archivo, Oswald, Yellowtail } from "next/font/google";

// Tipografía — ver docs/design.md §4.
// Oswald: títulos / precios / eyebrows (siempre en mayúsculas para títulos).
export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

// Archivo: texto de párrafo, UI, botones, labels.
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

// Yellowtail: acento script ("Marcando la Diferencia"). Solo decorativo, con pinzas.
export const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-yellowtail",
  display: "swap",
});

export const fontVariables = `${oswald.variable} ${archivo.variable} ${yellowtail.variable}`;
