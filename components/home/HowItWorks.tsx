import { Basket, CreditCard, Snowflake } from "@phosphor-icons/react/dist/ssr";

import { SectionHeading } from "@/components/SectionHeading";

const STEPS = [
  { Icon: Basket, title: "Elegí tus cortes", text: "Arma tu pedido desde el catálogo." },
  { Icon: CreditCard, title: "Pagá en línea", text: "Webpay, transferencia o como te acomode." },
  { Icon: Snowflake, title: "Recibí en frío", text: "Despacho refrigerado a tu zona." },
];

export function HowItWorks() {
  return (
    <section className="site-container py-16 sm:py-24">
      <SectionHeading eyebrow="Despacho" title="Cómo funciona" />

      <ol className="mt-8 grid gap-4 sm:grid-cols-3">
        {STEPS.map(({ Icon, title, text }, i) => (
          <li
            key={title}
            className="rounded-lg border border-linea bg-grafito p-6"
          >
            <span className="font-display text-sm font-semibold text-rojo">
              0{i + 1}
            </span>
            <Icon size={28} weight="light" className="mt-3 text-hueso" />
            <h3 className="mt-4 font-display text-lg uppercase tracking-[0.01em] text-hueso">
              {title}
            </h3>
            <p className="mt-1 text-sm text-humo">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
