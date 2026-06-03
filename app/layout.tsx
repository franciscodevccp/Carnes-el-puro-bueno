import type { Metadata } from "next";

import { CartFab } from "@/components/CartFab";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Carnes El Puro Bueno — Carnicería en Padre Hurtado",
    template: "%s · Carnes El Puro Bueno",
  },
  description:
    "Carne fresca con cadena de frío y despacho a tu zona. Cortes de vacuno, cerdo, pollo, cecinas y abarrotes. Del local en Padre Hurtado a tu mesa.",
  openGraph: {
    title: "Carnes El Puro Bueno",
    description:
      "Carne fresca con cadena de frío y despacho a tu zona. Del local en Padre Hurtado a tu mesa.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Sitio dark-only: la clase `dark` vive siempre en <html> (sin toggle).
  return (
    <html lang="es" className={`${fontVariables} dark`}>
      <body className="flex min-h-dvh flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartFab />
        </CartProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
