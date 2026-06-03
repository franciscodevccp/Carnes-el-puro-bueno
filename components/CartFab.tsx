"use client";

import { ShoppingCartSimple } from "@phosphor-icons/react";

import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

/** Botón flotante del carrito, fijo abajo a la derecha. Abre el CartSheet global. */
export function CartFab() {
  const { count, openCart, isOpen } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir carro${count > 0 ? ` (${count})` : ""}`}
      className={cn(
        "fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-pill bg-rojo text-hueso transition-[transform,opacity,background-color] duration-200 hover:bg-rojo-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hueso sm:bottom-6 sm:right-6",
        // Se oculta mientras el drawer del carrito está abierto.
        isOpen && "pointer-events-none translate-y-24 opacity-0"
      )}
    >
      <ShoppingCartSimple size={24} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-[22px] min-w-[22px] place-items-center rounded-pill bg-hueso px-1.5 text-xs font-semibold leading-none text-rojo">
          {count}
        </span>
      )}
    </button>
  );
}
