"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";

import { ProductImage } from "@/components/ProductImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categoryLabels, products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          categoryLabels[p.category].toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [q]);

  function close() {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
      }}
    >
      <DialogTrigger
        aria-label="Buscar cortes"
        className="hidden size-10 items-center justify-center rounded-md text-humo transition-colors hover:bg-grafito hover:text-hueso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo sm:inline-flex"
      >
        <MagnifyingGlass size={20} />
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="top-20 flex max-h-[70vh] translate-y-0 flex-col gap-0 overflow-hidden border-linea p-0 sm:max-w-lg"
      >
        <DialogTitle className="sr-only">Buscar cortes</DialogTitle>
        <DialogDescription className="sr-only">
          Busca productos del catálogo por nombre o categoría.
        </DialogDescription>

        <div className="flex items-center gap-2.5 border-b border-linea px-4">
          <MagnifyingGlass size={18} className="shrink-0 text-humo-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cortes…"
            className="h-12 w-full bg-transparent text-sm text-hueso placeholder:text-humo-2 focus:outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {q === "" ? (
            <p className="px-2 py-8 text-center text-sm text-humo-2">
              Escribe para buscar cortes.
            </p>
          ) : results.length === 0 ? (
            <p className="px-2 py-8 text-center text-sm text-humo">
              No encontramos ese corte. Prueba con otra palabra.
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/producto/${p.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-grafito-2"
                  >
                    <ProductImage
                      src={p.image}
                      alt={p.name}
                      showLabel={false}
                      sizes="48px"
                      className="w-12 shrink-0"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-sm uppercase tracking-[0.01em] text-hueso">
                        {p.name}
                      </span>
                      <span className="text-xs text-humo">
                        {categoryLabels[p.category]}
                      </span>
                    </span>
                    <span className="text-price shrink-0 text-sm">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-linea p-2">
          <Link
            href="/catalogo"
            onClick={close}
            className="block rounded-md px-2 py-2 text-center text-sm font-medium text-rojo transition-colors hover:bg-grafito-2"
          >
            Ver todo el catálogo
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
