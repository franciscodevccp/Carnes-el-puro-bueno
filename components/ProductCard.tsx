import Link from "next/link";

import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const href = `/producto/${product.slug}`;

  return (
    <article className="group flex h-full flex-col rounded-lg border border-linea bg-grafito p-2.5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-linea-fuerte">
      <Link
        href={href}
        className="relative block overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo"
        aria-label={product.name}
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span
            className={cn(
              "absolute left-2 top-2 rounded-pill px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.04em]",
              product.badge === "Premium"
                ? "border border-kraft text-kraft"
                : "bg-rojo text-hueso"
            )}
          >
            {product.badge}
          </span>
        )}
      </Link>

      <div className="mt-2.5 flex flex-1 flex-col">
        <h3 className="font-display text-base uppercase leading-tight tracking-[0.01em] text-hueso">
          <Link
            href={href}
            className="transition-colors hover:text-rojo focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        {product.origin && (
          <p className="mt-0.5 text-xs text-humo">{product.origin}</p>
        )}

        <div className="mt-2 flex items-end justify-between gap-2">
          <p className="leading-none">
            <span className="text-price text-lg">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-humo"> /{product.unit}</span>
          </p>
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </article>
  );
}
