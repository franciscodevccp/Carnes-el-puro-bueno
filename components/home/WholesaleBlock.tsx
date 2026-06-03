import Link from "next/link";

import { Button } from "@/components/ui/button";

/** Bloque B2B — tono sobrio, casi sin rojo (design.md §12). */
export function WholesaleBlock() {
  return (
    <section className="border-t border-linea bg-grafito">
      <div className="site-container grid items-center gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <p className="eyebrow text-humo-2">Carnes por mayor</p>
          <h2 className="text-h2 mt-2 text-hueso">
            ¿Restaurante, casino o negocio?
          </h2>
          <p className="mt-3 max-w-prose text-humo">
            Precios por mayor, pedido por caja y despacho coordinado. Pídenos la
            lista y conversemos.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="justify-self-start lg:justify-self-end"
        >
          <Link href="/mayorista">Solicitar lista de precios</Link>
        </Button>
      </div>
    </section>
  );
}
