"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  CreditCard,
  FileText,
  Money,
  Receipt,
  ShieldCheck,
  Storefront,
  Truck,
} from "@phosphor-icons/react";
import { toast } from "sonner";

import { Field, Input, RadioCard } from "@/components/form";
import { Logo } from "@/components/Logo";
import { SelectMenu } from "@/components/SelectMenu";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

type Delivery = "retiro" | "delivery";
type Payment = "efectivo" | "webpay";
type Doc = "boleta" | "factura";

const stepClass =
  "font-display text-base uppercase tracking-[0.04em] text-hueso";

const COMUNA_OPTIONS = [
  ...site.shipping.zones.map((z) => ({ value: z, label: z })),
  { value: "otra", label: "Otra" },
];

export function CheckoutView() {
  const { items, subtotal, clear } = useCart();
  const [delivery, setDelivery] = useState<Delivery>("retiro");
  const [payment, setPayment] = useState<Payment>("webpay");
  const [doc, setDoc] = useState<Doc>("boleta");
  const [comuna, setComuna] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const shippingCost =
    delivery === "delivery" && subtotal < site.shipping.freeOver
      ? site.shipping.fee
      : 0;
  const total = subtotal + shippingCost;

  if (done) {
    return (
      <section className="site-container flex flex-col items-center gap-4 py-20 text-center">
        <CheckCircle size={56} weight="light" className="text-success" />
        <h2 className="text-h2 text-hueso">¡Pedido recibido!</h2>
        <p className="max-w-md text-pretty text-humo">
          Te contactamos para coordinar la entrega. (Es una maqueta: no se
          procesó ningún pago.)
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/catalogo">Seguir comprando</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="site-container flex flex-col items-center gap-4 py-20 text-center">
        <Logo variant="icon" className="h-14 text-linea-fuerte" />
        <p className="font-display text-lg uppercase tracking-[0.01em] text-hueso">
          Tu carro está vacío
        </p>
        <p className="max-w-sm text-sm text-humo">
          Agrega algunos cortes antes de ir a pagar.
        </p>
        <Button asChild className="mt-2">
          <Link href="/catalogo">Ver cortes</Link>
        </Button>
      </section>
    );
  }

  function selectDelivery(value: Delivery) {
    setDelivery(value);
    // Delivery → solo Webpay (oculta/deshabilita Efectivo).
    if (value === "delivery") setPayment("webpay");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (delivery === "delivery" && !comuna) {
      toast.error("Elige una comuna para el despacho.");
      return;
    }
    if (payment === "webpay") {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        finishOrder();
      }, 1200);
    } else {
      finishOrder();
    }
  }

  function finishOrder() {
    setDone(true);
    clear();
    toast.success("¡Pedido recibido!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="site-container grid gap-8 py-10 lg:grid-cols-[1fr_380px] lg:gap-12"
    >
      <div className="space-y-10">
        {/* 1 · Entrega */}
        <div>
          <h2 className={stepClass}>
            <span className="text-rojo">1 · </span>Tipo de entrega
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <RadioCard
              checked={delivery === "retiro"}
              onSelect={() => selectDelivery("retiro")}
              icon={<Storefront size={22} />}
              title="Retiro en tienda"
              description="Río Ñuble 824, Padre Hurtado"
            />
            <RadioCard
              checked={delivery === "delivery"}
              onSelect={() => selectDelivery("delivery")}
              icon={<Truck size={22} />}
              title="Delivery"
              description="Despacho refrigerado a tu zona"
            />
          </div>

          {delivery === "retiro" ? (
            <p className="mt-4 rounded-md border border-linea bg-grafito p-4 text-sm text-humo">
              Retiras en <span className="text-hueso">{site.address}</span>.
              Horario: {site.hours}.
            </p>
          ) : (
            <div className="mt-4 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
                <Field label="Calle" htmlFor="calle" required>
                  <Input id="calle" name="calle" required autoComplete="address-line1" />
                </Field>
                <Field label="Número" htmlFor="numero" required>
                  <Input id="numero" name="numero" required />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Comuna" required>
                  <SelectMenu
                    value={comuna}
                    onValueChange={setComuna}
                    options={COMUNA_OPTIONS}
                    ariaLabel="Comuna"
                    className="flex h-11 w-full"
                  />
                </Field>
                <Field label="Referencia (opcional)" htmlFor="ref">
                  <Input id="ref" name="referencia" />
                </Field>
              </div>
              <p className="text-xs text-humo-2">
                Despacho a {site.shipping.zones.join(", ")}. Envío gratis sobre{" "}
                {formatPrice(site.shipping.freeOver)}.
              </p>
            </div>
          )}
        </div>

        {/* 2 · Datos */}
        <div>
          <h2 className={stepClass}>
            <span className="text-rojo">2 · </span>Tus datos
          </h2>
          <div className="mt-4 grid gap-4">
            <Field label="Nombre" htmlFor="nombre" required>
              <Input id="nombre" name="nombre" required autoComplete="name" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Teléfono" htmlFor="tel" required>
                <Input id="tel" name="telefono" type="tel" required autoComplete="tel" />
              </Field>
              <Field label="Email" htmlFor="email" required>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </Field>
            </div>
          </div>
        </div>

        {/* 3 · Documento */}
        <div>
          <h2 className={stepClass}>
            <span className="text-rojo">3 · </span>Documento
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <RadioCard
              checked={doc === "boleta"}
              onSelect={() => setDoc("boleta")}
              icon={<Receipt size={22} />}
              title="Boleta"
              description="Para consumidor final"
            />
            <RadioCard
              checked={doc === "factura"}
              onSelect={() => setDoc("factura")}
              icon={<FileText size={22} />}
              title="Factura"
              description="Para tu empresa"
            />
          </div>

          {doc === "factura" && (
            <div className="mt-4 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="RUT" htmlFor="rut" required>
                  <Input id="rut" name="rut" required />
                </Field>
                <Field label="Razón social" htmlFor="razon" required>
                  <Input id="razon" name="razonSocial" required />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Giro" htmlFor="giro" required>
                  <Input id="giro" name="giro" required />
                </Field>
                <Field label="Dirección comercial" htmlFor="dircom" required>
                  <Input id="dircom" name="direccionComercial" required />
                </Field>
              </div>
            </div>
          )}
        </div>

        {/* 4 · Pago (condicional) */}
        <div>
          <h2 className={stepClass}>
            <span className="text-rojo">4 · </span>Método de pago
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <RadioCard
              checked={payment === "webpay"}
              onSelect={() => setPayment("webpay")}
              icon={<CreditCard size={22} />}
              title="Webpay"
              description="Tarjeta de crédito o débito"
            />
            <RadioCard
              checked={payment === "efectivo"}
              onSelect={() => setPayment("efectivo")}
              disabled={delivery === "delivery"}
              icon={<Money size={22} />}
              title="Efectivo"
              description={
                delivery === "delivery"
                  ? "Solo disponible en retiro"
                  : "Pagas al retirar"
              }
            />
          </div>
          {payment === "webpay" && (
            <p className="mt-3 text-xs text-humo-2">
              Pago simulado — esto es una maqueta de demostración.
            </p>
          )}
        </div>
      </div>

      {/* Resumen */}
      <aside className="h-fit rounded-lg border border-linea bg-grafito p-5 lg:sticky lg:top-24">
        <h2 className="font-display text-lg uppercase tracking-[0.01em] text-hueso">
          Resumen
        </h2>
        <ul className="mt-4 space-y-3 border-b border-linea pb-4">
          {items.map((it) => (
            <li key={it.product.slug} className="flex justify-between gap-3 text-sm">
              <span className="text-humo">
                <span className="text-hueso">{it.quantity}×</span>{" "}
                {it.product.name}
              </span>
              <span className="text-price shrink-0 text-sm">
                {formatPrice(it.product.price * it.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-humo">Subtotal</dt>
            <dd className="tabular-nums text-hueso">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-humo">Envío</dt>
            <dd className="tabular-nums text-hueso">
              {delivery === "delivery"
                ? shippingCost === 0
                  ? "Gratis"
                  : formatPrice(shippingCost)
                : "Retiro"}
            </dd>
          </div>
          <div className="flex justify-between border-t border-linea pt-2">
            <dt className="font-medium text-hueso">Total</dt>
            <dd className="text-price text-lg text-rojo">{formatPrice(total)}</dd>
          </div>
        </dl>

        <Button
          type="submit"
          size="lg"
          className="mt-5 w-full"
          disabled={processing}
        >
          {processing ? "Procesando…" : "Confirmar pedido"}
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-humo-2">
          <ShieldCheck size={14} />
          Demostración · nada se procesa de verdad
        </p>
      </aside>
    </form>
  );
}
