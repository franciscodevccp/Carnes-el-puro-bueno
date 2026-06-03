"use client";

import Link from "next/link";
import { Minus, Plus, Trash } from "@phosphor-icons/react";

import { Logo } from "@/components/Logo";
import { ProductImage } from "@/components/ProductImage";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart, type CartItem } from "@/lib/cart";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

/** Drawer del carrito — global, controlado por el estado del CartProvider. */
export function CartSheet() {
  const { items, count, subtotal, isOpen, setOpen, closeCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="gap-0 border-linea p-0">
        <SheetHeader className="border-b border-linea px-4 py-4">
          <SheetTitle className="font-display text-lg uppercase tracking-[0.01em] text-hueso">
            Tu carro{count > 0 ? ` · ${count}` : ""}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Productos en tu carro de compras
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyCart onClose={closeCart} />
        ) : (
          <ul className="flex-1 divide-y divide-linea overflow-y-auto px-4">
            {items.map((item) => (
              <CartRow key={item.product.slug} item={item} />
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <SheetFooter className="gap-3 border-t border-linea px-4 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-humo">Subtotal</span>
              <span className="text-price text-xl">{formatPrice(subtotal)}</span>
            </div>

            {subtotal < site.shipping.freeOver ? (
              <p className="text-xs text-humo-2">
                Te faltan {formatPrice(site.shipping.freeOver - subtotal)} para
                envío gratis.
              </p>
            ) : (
              <p className="text-xs text-success">¡Tienes envío gratis!</p>
            )}

            <Button asChild size="lg" className="w-full">
              <Link href="/checkout" onClick={closeCart}>
                Proceder al pago
              </Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartRow({ item }: { item: CartItem }) {
  const { increment, decrement, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <li className="flex gap-3 py-4">
      <ProductImage
        src={product.image}
        alt={product.name}
        showLabel={false}
        className="w-16 shrink-0"
        sizes="64px"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <span className="font-display text-sm uppercase leading-tight text-hueso">
            {product.name}
          </span>
          <button
            type="button"
            onClick={() => removeItem(product.slug)}
            aria-label={`Quitar ${product.name} del carro`}
            className="-m-1 rounded-sm p-1 text-humo transition-colors hover:text-rojo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo"
          >
            <Trash size={16} />
          </button>
        </div>

        <span className="text-xs text-humo">
          {formatPrice(product.price)}
          <span className="text-humo-2"> /{product.unit}</span>
        </span>

        <div className="mt-auto flex items-center justify-between pt-2">
          <QtyStepper
            value={quantity}
            onDecrement={() => decrement(product.slug)}
            onIncrement={() => increment(product.slug)}
            label={product.name}
          />
          <span className="text-price text-sm">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}

function QtyStepper({
  value,
  onDecrement,
  onIncrement,
  label,
}: {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  label: string;
}) {
  return (
    <div className="flex items-center rounded-md border border-linea">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Quitar una unidad de ${label}`}
        className="flex size-8 items-center justify-center text-humo transition-colors hover:text-hueso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo"
      >
        <Minus size={14} />
      </button>
      <span className="w-7 text-center font-display text-sm tabular-nums text-hueso">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Agregar una unidad de ${label}`}
        className="flex size-8 items-center justify-center text-humo transition-colors hover:text-hueso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <Logo variant="icon" className="h-14 text-linea-fuerte" />
      <div className="space-y-1">
        <p className="font-display text-lg uppercase tracking-[0.01em] text-hueso">
          Tu carro está vacío
        </p>
        <p className="mx-auto max-w-[28ch] text-sm text-humo">
          Vamos por unos buenos cortes.
        </p>
      </div>
      <Button asChild variant="outline" className="mt-2">
        <Link href="/catalogo" onClick={onClose}>
          Ver cortes
        </Link>
      </Button>
    </div>
  );
}
