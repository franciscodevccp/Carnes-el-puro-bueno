import Link from "next/link";
import { icons as gameIcons } from "@iconify-json/game-icons";

import { CategoryIcon } from "@/components/CategoryIcon";
import { SectionHeading } from "@/components/SectionHeading";
import { categoryLabels, type Category } from "@/lib/products";

const CATEGORY_ORDER: Category[] = [
  "vacuno",
  "cerdo",
  "pollo",
  "cecinas",
  "parrilla",
  "abarrotes",
];

// Un ícono específico de carnicería por categoría, todos del set `game-icons`.
// (Phosphor no tiene íconos de carnes; game-icons sí.)
const CATEGORY_ICON_NAME: Record<Category, string> = {
  vacuno: "cow",
  cerdo: "pig",
  pollo: "chicken-leg",
  cecinas: "sausage", // "sausages" no existe en el set; "sausage" sí
  parrilla: "flame", // "bbq" no existe; "flame" calza con "Carbón y Brasa"
  abarrotes: "shopping-bag",
};

/** Extrae la data offline del ícono (server-only; no se bundlea el set completo). */
function gameIcon(name: string) {
  const def = gameIcons.icons[name];
  return {
    body: def.body,
    width: def.width ?? gameIcons.width ?? 512,
    height: def.height ?? gameIcons.height ?? 512,
  };
}

export function Categories() {
  return (
    <section className="border-t border-linea">
      <div className="site-container py-16 sm:py-24">
        <SectionHeading eyebrow="Explora" title="Categorías" />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORY_ORDER.map((category) => (
            <Link
              key={category}
              href={`/catalogo?categoria=${category}`}
              className="group flex flex-col items-center justify-center gap-3 rounded-lg border border-linea bg-grafito px-3 py-8 text-center transition-colors hover:border-rojo hover:bg-grafito-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo"
            >
              <CategoryIcon
                icon={gameIcon(CATEGORY_ICON_NAME[category])}
                className="size-7 text-humo transition-colors group-hover:text-rojo"
              />
              <span className="font-display text-sm uppercase tracking-[0.04em] text-hueso">
                {categoryLabels[category]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
