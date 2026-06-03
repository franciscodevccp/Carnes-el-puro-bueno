import Link from "next/link";
import { Basket, Fire, Storefront, Truck } from "@phosphor-icons/react/dist/ssr";

import { SectionHeading } from "@/components/SectionHeading";

const WAYS = [
  { Icon: Storefront, title: "Carnicería", text: "Tus cortes favoritos, al detalle.", href: "/catalogo" },
  { Icon: Truck, title: "Por Mayor", text: "Precios por caja para tu negocio.", href: "/mayorista" },
  { Icon: Fire, title: "Promos", text: "Packs de la semana con envío gratis.", href: "/promos" },
  { Icon: Basket, title: "Almacén", text: "Todo para el asado, en un solo carro.", href: "/catalogo" },
];

export function WaysToBuy() {
  return (
    <section className="site-container py-16 sm:py-24">
      <SectionHeading eyebrow="Cómo comprar" title="Cuatro formas de comprar" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WAYS.map(({ Icon, title, text, href }) => (
          <Link
            key={title}
            href={href}
            className="group flex flex-col rounded-lg border border-linea bg-grafito p-5 transition-colors hover:border-linea-fuerte focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo"
          >
            <Icon size={28} weight="light" className="text-rojo" />
            <h3 className="mt-4 font-display text-lg uppercase tracking-[0.01em] text-hueso">
              {title}
            </h3>
            <p className="mt-1 text-sm text-humo">{text}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.06em] text-humo-2 transition-colors group-hover:text-rojo">
              Ver más →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
