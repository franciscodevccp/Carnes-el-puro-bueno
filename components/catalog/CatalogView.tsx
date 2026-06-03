"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

import { Logo } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { SelectMenu } from "@/components/SelectMenu";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { inputClassName } from "@/components/form";
import { categoryLabels, products, type Category } from "@/lib/products";
import { cn } from "@/lib/utils";

type Filter = Category | "all";

const PILLS: { value: Filter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "vacuno", label: categoryLabels.vacuno },
  { value: "cerdo", label: categoryLabels.cerdo },
  { value: "pollo", label: categoryLabels.pollo },
  { value: "cecinas", label: categoryLabels.cecinas },
  { value: "parrilla", label: categoryLabels.parrilla },
  { value: "abarrotes", label: categoryLabels.abarrotes },
];

const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
];

export function CatalogView({ initialCategory }: { initialCategory: Filter }) {
  const [category, setCategory] = useState<Filter>(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevancia");

  const results = useMemo(() => {
    let list = products.filter(
      (p) => category === "all" || p.category === category
    );
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "precio-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  return (
    <section className="site-container py-8 sm:py-12">
      <div className="flex flex-col gap-4">
        {/* Filtro por categoría */}
        <div className="flex flex-wrap gap-2">
          {PILLS.map((pill) => (
            <button
              key={pill.value}
              type="button"
              onClick={() => setCategory(pill.value)}
              aria-pressed={category === pill.value}
              className={cn(
                "rounded-pill border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo",
                category === pill.value
                  ? "border-rojo bg-rojo text-hueso"
                  : "border-linea text-humo hover:border-linea-fuerte hover:text-hueso"
              )}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Búsqueda + orden */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:max-w-xs sm:flex-1">
            <MagnifyingGlass
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-humo-2"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar corte…"
              aria-label="Buscar corte"
              className={cn(inputClassName, "pl-9")}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-humo">
            <span>Ordenar</span>
            <SelectMenu
              value={sort}
              onValueChange={setSort}
              options={SORT_OPTIONS}
              align="end"
              ariaLabel="Ordenar por"
            />
          </div>
        </div>

        <p className="text-sm text-humo-2">
          {results.length} {results.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {results.length > 0 ? (
        <StaggerGroup
          key={`${category}|${sort}`}
          trigger="mount"
          className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {results.map((product) => (
            <StaggerItem key={product.slug} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <Reveal className="mt-10 flex flex-col items-center gap-4 py-12 text-center">
          <Logo variant="icon" className="h-12 text-linea-fuerte" />
          <p className="font-display text-lg uppercase tracking-[0.01em] text-hueso">
            No encontramos ese corte
          </p>
          <p className="max-w-sm text-sm text-humo">
            Prueba con otra categoría o limpia la búsqueda.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            className="text-sm font-medium text-rojo hover:underline"
          >
            Ver todo el catálogo
          </button>
        </Reveal>
      )}
    </section>
  );
}
