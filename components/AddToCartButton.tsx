"use client";

import type { ComponentProps } from "react";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

type AddToCartButtonProps = {
  product: Product;
  label?: string;
  withIcon?: boolean;
  className?: string;
  size?: ComponentProps<typeof Button>["size"];
  variant?: ComponentProps<typeof Button>["variant"];
};

export function AddToCartButton({
  product,
  label = "Agregar",
  withIcon = false,
  className,
  size = "default",
  variant = "default",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={() => {
        addItem(product);
        toast.success("Agregado al carro", { description: product.name });
      }}
    >
      {withIcon && <ShoppingCartSimple weight="bold" />}
      {label}
    </Button>
  );
}
