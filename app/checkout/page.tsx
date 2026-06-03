import type { Metadata } from "next";

import { CheckoutView } from "@/components/checkout/CheckoutView";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finaliza tu pedido: entrega, datos, documento y pago.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader eyebrow="Pedido" title="Finaliza tu compra" />
      <CheckoutView />
    </>
  );
}
