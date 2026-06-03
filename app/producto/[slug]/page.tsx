import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Snowflake, Truck } from "@phosphor-icons/react/dist/ssr";

import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { ProductActions } from "@/components/product/ProductActions";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { categoryLabels, getProductBySlug, products } from "@/lib/products";
import { site } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return { title: product.name, description: product.description };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <div className="site-container py-8 sm:py-12">
        <nav className="text-xs text-humo-2" aria-label="Migas de pan">
          <Link href="/catalogo" className="transition-colors hover:text-hueso">
            Catálogo
          </Link>
          <span> / </span>
          <Link
            href={`/catalogo?categoria=${product.category}`}
            className="transition-colors hover:text-hueso"
          >
            {categoryLabels[product.category]}
          </Link>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductImage
            src={product.image}
            alt={product.name}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="lg:sticky lg:top-24"
          />

          <Reveal>
            {product.badge && (
              <span
                className={cn(
                  "inline-block rounded-pill px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.04em]",
                  product.badge === "Premium"
                    ? "border border-kraft text-kraft"
                    : "bg-rojo text-hueso"
                )}
              >
                {product.badge}
              </span>
            )}

            <h1 className="text-h1 mt-3 text-hueso">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-price text-3xl text-hueso">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-humo">/{product.unit}</span>
              {product.origin && (
                <span className="rounded-pill border border-linea px-2.5 py-0.5 text-xs text-humo">
                  {product.origin}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-prose text-pretty text-humo">
              {product.description}
            </p>

            <ProductActions product={product} />

            <ul className="mt-8 space-y-3 border-t border-linea pt-6 text-sm text-humo">
              <li className="flex items-start gap-2.5">
                <Snowflake
                  size={18}
                  weight="light"
                  className="mt-0.5 shrink-0 text-rojo"
                />
                Despacho refrigerado, manteniendo la cadena de frío.
              </li>
              <li className="flex items-start gap-2.5">
                <Truck
                  size={18}
                  weight="light"
                  className="mt-0.5 shrink-0 text-rojo"
                />
                Envío gratis sobre {formatPrice(site.shipping.freeOver)} en{" "}
                {site.shipping.zones.join(", ")}.
              </li>
            </ul>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <Reveal>
          <section className="border-t border-linea py-12 sm:py-16">
            <div className="site-container">
              <SectionHeading
                eyebrow="También te puede servir"
                title="Cortes relacionados"
                action={{ href: "/catalogo", label: "Ver catálogo" }}
              />
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}
    </>
  );
}
