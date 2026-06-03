import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/lib/products";

const FEATURED_SLUGS = [
  "lomo-vetado",
  "entrana",
  "asado-de-tira",
  "carne-molida",
  "punta-picana",
  "costillar-de-cerdo",
  "longaniza",
  "chorizo-parrillero",
];

export function FeaturedCuts() {
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const product = products.find((p) => p.slug === slug);
    return product ? [product] : [];
  });

  return (
    <section className="border-y border-linea py-16 sm:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow="Lo más pedido"
          title="Cortes destacados"
          action={{ href: "/catalogo", label: "Ver todo el catálogo" }}
        />

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
