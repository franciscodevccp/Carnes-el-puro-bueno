// Catálogo real — fuente: docs/content.md. Prohibido inventar productos o precios.
// Mientras no haya fotos, `image` va en null y se usa el placeholder de <ProductImage>.

export type Category =
  | "vacuno"
  | "cerdo"
  | "pollo"
  | "cecinas"
  | "parrilla"
  | "abarrotes";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number; // CLP por unidad
  unit: "kg" | "un" | "bandeja";
  origin?: "Nacional" | "Importado";
  badge?: string; // ej. "Más vendido", "Premium"
  description: string;
  image: string | null; // null → placeholder "Próximamente"
};

export const products: Product[] = [
  // Vacuno
  { slug: "lomo-vetado", name: "Lomo Vetado", category: "vacuno", price: 12990, unit: "kg", origin: "Nacional", badge: "Más vendido", description: "El rey de la parrilla. Bien marmoleado, jugoso y con sabor de verdad.", image: null },
  { slug: "lomo-liso", name: "Lomo Liso", category: "vacuno", price: 11990, unit: "kg", origin: "Importado", description: "Corte magro y parejo, ideal para la plancha o un buen bife.", image: null },
  { slug: "asado-de-tira", name: "Asado de Tira", category: "vacuno", price: 9990, unit: "kg", origin: "Nacional", description: "Clásico para el asado lento. Con hueso, queda una maravilla.", image: null },
  { slug: "entrana", name: "Entraña", category: "vacuno", price: 13990, unit: "kg", origin: "Nacional", badge: "Premium", description: "Fina, sabrosa y rápida a la parrilla. La que nunca falla.", image: null },
  { slug: "plateada", name: "Plateada", category: "vacuno", price: 8990, unit: "kg", origin: "Nacional", description: "Perfecta al horno o desmenuzada. Cocción lenta, resultado redondo.", image: null },
  { slug: "punta-picana", name: "Punta Picana", category: "vacuno", price: 10990, unit: "kg", origin: "Nacional", description: "Triángulo de sabor. Excelente a la parrilla con su capa de grasa.", image: null },
  { slug: "posta-negra", name: "Posta Negra", category: "vacuno", price: 9490, unit: "kg", origin: "Nacional", description: "Magra y versátil. Buena para bistec, cazuela o al jugo.", image: null },
  { slug: "carne-molida", name: "Carne Molida", category: "vacuno", price: 6990, unit: "kg", origin: "Nacional", badge: "Más vendido", description: "Molida del día para hamburguesas, tallarines o lo que se te ocurra.", image: null },

  // Cerdo
  { slug: "pulpa-de-cerdo", name: "Pulpa de Cerdo", category: "cerdo", price: 5990, unit: "kg", origin: "Nacional", description: "Versátil y económica. Para el horno, la olla o cortar en bistec.", image: null },
  { slug: "costillar-de-cerdo", name: "Costillar de Cerdo", category: "cerdo", price: 6490, unit: "kg", origin: "Nacional", description: "Para los amantes del costillar. A la parrilla o al horno, infaltable.", image: null },
  { slug: "chuleta-de-cerdo", name: "Chuleta de Cerdo", category: "cerdo", price: 5490, unit: "kg", origin: "Nacional", description: "Con hueso, jugosa, lista para la plancha o el sartén.", image: null },

  // Pollo
  { slug: "pechuga-de-pollo", name: "Pechuga de Pollo", category: "pollo", price: 5490, unit: "kg", origin: "Nacional", description: "Sin hueso ni piel. La base sana de cualquier semana.", image: null },
  { slug: "trutro-de-pollo", name: "Trutro de Pollo", category: "pollo", price: 3990, unit: "kg", origin: "Nacional", description: "Jugoso y rendidor. Al horno con papas no falla.", image: null },
  { slug: "pollo-entero", name: "Pollo Entero", category: "pollo", price: 3490, unit: "kg", origin: "Nacional", description: "El de toda la vida. Para el asado del domingo.", image: null },

  // Cecinas
  { slug: "longaniza", name: "Longaniza Artesanal", category: "cecinas", price: 6990, unit: "kg", origin: "Nacional", description: "Receta de la casa. Para el choripán o la parrilla.", image: null },
  { slug: "chorizo-parrillero", name: "Chorizo Parrillero", category: "cecinas", price: 7490, unit: "kg", origin: "Nacional", description: "Grueso, sabroso y hecho para la brasa.", image: null },
  { slug: "tocino", name: "Tocino Ahumado", category: "cecinas", price: 8990, unit: "kg", origin: "Nacional", description: "Ahumado de verdad. Le cambia la vida a cualquier plato.", image: null },

  // Abarrotes (almacén)
  { slug: "carbon-5kg", name: "Carbón de Espino 5 kg", category: "abarrotes", price: 4990, unit: "un", description: "Para que el asado prenda parejo y dure.", image: null },
  { slug: "sal-de-mar", name: "Sal de Mar Gruesa", category: "abarrotes", price: 2490, unit: "un", description: "La sal justa para la carne. Grano grueso.", image: null },
  { slug: "pan-hamburguesa", name: "Pan de Hamburguesa (6 un)", category: "abarrotes", price: 2990, unit: "un", description: "Pack de 6, suaves, para acompañar tu molida.", image: null },
];

/** Etiquetas legibles por categoría (para filtros y navegación). */
export const categoryLabels: Record<Category, string> = {
  vacuno: "Vacuno",
  cerdo: "Cerdo",
  pollo: "Pollo",
  cecinas: "Cecinas",
  parrilla: "Parrilla",
  abarrotes: "Abarrotes",
};

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: Category) =>
  products.filter((p) => p.category === category);
