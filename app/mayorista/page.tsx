import type { Metadata } from "next";
import { ArrowsClockwise, Package, Receipt } from "@phosphor-icons/react/dist/ssr";

import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/mayorista/QuoteForm";

export const metadata: Metadata = {
  title: "Mayorista",
  description:
    "Carnes por mayor para restaurantes, casinos y negocios. Precios por caja, despacho coordinado y factura. Solicita la lista de precios.",
};

const BENEFITS = [
  { Icon: Package, title: "Por caja y volumen", text: "Precios por mayor pensados para tu operación." },
  { Icon: ArrowsClockwise, title: "Pedido recurrente", text: "Coordinamos frecuencia y despacho a tu medida." },
  { Icon: Receipt, title: "Boleta o factura", text: "Documentación al día para tu negocio." },
];

export default function MayoristaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Carnes por mayor"
        title="Precios por caja para tu negocio"
        subtitle="Restaurantes, casinos y negocios: pedido por caja, despacho coordinado y boleta o factura. Pídenos la lista y conversamos."
      />

      <section className="site-container grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {BENEFITS.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-lg border border-linea bg-grafito p-5">
                <Icon size={26} weight="light" className="text-humo" />
                <h2 className="mt-4 font-display text-base uppercase tracking-[0.01em] text-hueso">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-humo">{text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-linea bg-grafito p-5">
            <p className="eyebrow text-humo-2">Pedido mínimo</p>
            <p className="mt-2 text-sm text-humo">
              Trabajamos según volumen y frecuencia. Cuéntanos qué necesitas y
              armamos una propuesta con la lista de precios por mayor a tu
              medida.
            </p>
          </div>
        </div>

        <QuoteForm />
      </section>
    </>
  );
}
