import type { Metadata } from "next";

import { CatalogView } from "@/components/catalog/CatalogView";
import { PageHeader } from "@/components/PageHeader";
import type { Category } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Cortes de vacuno, cerdo y pollo, cecinas y todo para el asado. Arma tu pedido y paga en línea.",
};

const CATEGORY_VALUES: Category[] = [
  "vacuno",
  "cerdo",
  "pollo",
  "cecinas",
  "parrilla",
  "abarrotes",
];

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string | string[] }>;
}) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.categoria) ? sp.categoria[0] : sp.categoria;
  const initialCategory: Category | "all" =
    raw && (CATEGORY_VALUES as string[]).includes(raw)
      ? (raw as Category)
      : "all";

  return (
    <>
      <PageHeader
        eyebrow="Tienda"
        title="Catálogo"
        subtitle="Cortes de vacuno, cerdo y pollo, cecinas y todo para el asado. Arma tu pedido y paga en línea."
      />
      <CatalogView initialCategory={initialCategory} />
    </>
  );
}
