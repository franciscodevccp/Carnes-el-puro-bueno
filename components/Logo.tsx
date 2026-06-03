import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "horizontal" | "stacked" | "icon";
  tagline?: boolean;
  className?: string;
};

/**
 * Machete (cleaver) — SVG vectorial, hereda `currentColor`, sirve de favicon.
 * PLACEHOLDER genérico: reemplazar el `path` por el cleaver real trazado del
 * logo del cliente (design.md §2 / §16) — y también en public/cleaver.svg.
 */
export function Cleaver({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 8 H66 a6 6 0 0 1 6 6 V58 a6 6 0 0 1 -6 6 H16 a6 6 0 0 1 -6 -6 V14 a6 6 0 0 1 6 -6 Z M24 15.5 a4.5 4.5 0 1 0 0 9 a4.5 4.5 0 1 0 0 -9 Z M72 28 H104 a8 8 0 0 1 0 16 H72 Z" />
    </svg>
  );
}

/** Tagline "Marcando la Diferencia" flanqueada por dos líneas finas rojo-sangre. */
function Tagline() {
  return (
    <span className="mt-1.5 flex items-center justify-center gap-2">
      <span className="h-px w-14 bg-rojo-sangre" aria-hidden="true" />
      <span className="font-script text-base leading-none text-hueso">
        Marcando la Diferencia
      </span>
      <span className="h-px w-14 bg-rojo-sangre" aria-hidden="true" />
    </span>
  );
}

/**
 * Logo tipografiado + SVG. ES el logo del sitio (plano, nítido, recoloreable).
 * NUNCA usar el PNG/3D del cliente en la UI (design.md §2).
 *  - horizontal → header/navbar
 *  - stacked    → hero, footer, splash (tagline opcional)
 *  - icon       → favicon, loader, estados vacíos (solo el machete)
 */
export function Logo({
  variant = "horizontal",
  tagline = false,
  className,
}: LogoProps) {
  if (variant === "icon") {
    return <Cleaver className={cn("h-7 w-auto text-hueso", className)} />;
  }

  const stacked = variant === "stacked";

  return (
    <span
      className={cn(
        "inline-flex select-none",
        stacked ? "flex-col items-center gap-2" : "items-center gap-2.5",
        className
      )}
    >
      <Cleaver className={cn("w-auto text-hueso", stacked ? "h-10" : "h-8")} />
      <span className={cn("leading-[0.9]", stacked && "text-center")}>
        <span className={stacked ? "text-3xl" : "text-base"}>
          <span className="block font-display font-bold uppercase tracking-[0.01em] text-hueso">
            Carnes
          </span>
          <span className="block font-display font-bold uppercase tracking-[0.01em] text-rojo">
            El Puro Bueno
          </span>
        </span>
        {tagline && <Tagline />}
      </span>
    </span>
  );
}
