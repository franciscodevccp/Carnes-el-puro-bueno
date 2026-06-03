import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { PromoCard } from "@/components/PromoCard";
import { Reveal } from "@/components/motion";
import { promos } from "@/lib/promos";

export const metadata: Metadata = {
  title: "Promos",
  description:
    "Packs de la semana con envío gratis. Pack Parrillero, Familiar y Asado, listos para pedir.",
};

export default function PromosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Promos TikTok"
        title="Promos de la semana"
        subtitle="Packs armados para la parrilla y para la semana, con envío gratis. Pide el tuyo y recíbelo en frío."
      />

      <section className="site-container py-12 sm:py-16">
        <Reveal className="grid gap-4 md:grid-cols-3">
          {promos.map((promo, i) => (
            <PromoCard key={promo.slug} promo={promo} featured={i === 0} />
          ))}
        </Reveal>

        <p className="mt-8 text-sm text-humo">
          ¿Buscas algo distinto? Arma tu pedido desde el{" "}
          <Link href="/catalogo" className="text-rojo hover:underline">
            catálogo
          </Link>
          .
        </p>
      </section>
    </>
  );
}
