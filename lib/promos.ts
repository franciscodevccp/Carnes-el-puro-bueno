// Packs reales (capa TikTok) — fuente: docs/content.md.
// Packs de $40.000 con envío gratis en Santiago.

import type { Product } from "./products";

export type Promo = {
  slug: string;
  name: string;
  price: number;
  freeShipping: boolean;
  badge?: string;
  includes: string[];
  image: string | null;
};

export const promos: Promo[] = [
  { slug: "pack-parrillero", name: "Pack Parrillero", price: 40000, freeShipping: true, badge: "El más pedido", includes: ["1 kg Lomo Vetado", "1 kg Asado de Tira", "1 kg Longaniza", "1 kg Chorizo Parrillero", "1 kg Punta Picana"], image: null },
  { slug: "pack-familiar", name: "Pack Familiar", price: 40000, freeShipping: true, includes: ["1 kg Bistec", "1 kg Carne de Cazuela", "1 kg Carne Molida", "1 kg Chuletas", "1 kg Pechuga de Pollo"], image: null },
  { slug: "pack-asado", name: "Pack Asado", price: 40000, freeShipping: true, includes: ["1.5 kg Asado de Tira", "1 kg Plateada", "1 kg Longaniza", "0.5 kg Chorizo"], image: null },
];

export const getPromoBySlug = (slug: string) =>
  promos.find((p) => p.slug === slug);

/**
 * Representa un pack como Product para poder agregarlo al carrito (maqueta).
 * El slug lleva prefijo `promo-` para no chocar con cortes del catálogo.
 */
export const promoToProduct = (promo: Promo): Product => ({
  slug: `promo-${promo.slug}`,
  name: promo.name,
  category: "parrilla",
  price: promo.price,
  unit: "un",
  description: promo.includes.join(" · "),
  image: promo.image,
  badge: promo.badge,
});
