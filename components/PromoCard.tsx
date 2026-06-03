import { AddToCartButton } from "@/components/AddToCartButton";
import { Cleaver } from "@/components/Logo";
import { promoToProduct, type Promo } from "@/lib/promos";
import { cn, formatPrice } from "@/lib/utils";

export function PromoCard({
  promo,
  featured = false,
}: {
  promo: Promo;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-lg border bg-grafito p-5 transition-colors",
        featured
          ? "border-rojo bg-gradient-to-b from-rojo-sangre/15 to-grafito"
          : "border-linea hover:border-linea-fuerte"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-pill bg-rojo px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-hueso">
          {promo.badge ?? "Promo"}
        </span>
        {promo.freeShipping && (
          <span className="text-xs font-medium text-success">Envío gratis</span>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl uppercase leading-none tracking-[0.01em] text-hueso">
        {promo.name}
      </h3>

      <ul className="mt-4 flex-1 space-y-2">
        {promo.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-humo">
            <Cleaver className="mt-1 h-2.5 w-auto shrink-0 text-rojo-sangre" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between gap-3">
        <p className="leading-none">
          <span className="block text-xs text-humo-2">Precio pack</span>
          <span className="text-price mt-1 block text-3xl text-rojo">
            {formatPrice(promo.price)}
          </span>
        </p>
        <AddToCartButton product={promoToProduct(promo)} label="Agregar pack" />
      </div>
    </article>
  );
}
