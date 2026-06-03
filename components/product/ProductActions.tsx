"use client";

import { useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center rounded-md border border-linea">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Restar una unidad"
          className="flex size-11 items-center justify-center text-humo transition-colors hover:text-hueso focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rojo"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center font-display tabular-nums text-hueso">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Sumar una unidad"
          className="flex size-11 items-center justify-center text-humo transition-colors hover:text-hueso focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rojo"
        >
          <Plus size={16} />
        </button>
      </div>

      <Button
        size="lg"
        className="sm:min-w-48"
        onClick={() => {
          addItem(product, qty);
          toast.success("Agregado al carro 🔥", {
            description: `${qty} × ${product.name}`,
          });
        }}
      >
        Agregar al carro
      </Button>
    </div>
  );
}
