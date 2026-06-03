import Image from "next/image";

import { Cleaver } from "@/components/Logo";
import { cn } from "@/lib/utils";

// Proporciones disponibles (clases literales para que Tailwind las genere).
const ASPECTS = {
  square: "aspect-square", // 1:1 — default compacto para cards
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
} as const;

type ProductImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  aspect?: keyof typeof ASPECTS;
  /** Oculta el texto "Próximamente" (útil en miniaturas pequeñas). */
  showLabel?: boolean;
};

/**
 * Imagen de producto. Por ahora NO hay fotos: si no llega `src`, renderiza el
 * placeholder de marca "Próximamente" (machete + label). Cuando exista la foto
 * real se pasa `src` y las cards no se tocan. JAMÁS fotos de carne con IA.
 * Ver docs/conventions.md y docs/content.md.
 */
export function ProductImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority,
  aspect = "square",
  showLabel = true,
}: ProductImageProps) {
  const ratio = ASPECTS[aspect];

  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md bg-grafito",
          ratio,
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }

  // Placeholder "Próximamente"
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed border-linea-fuerte bg-grafito px-2",
        ratio,
        className
      )}
      role="img"
      aria-label={`${alt} — foto próximamente`}
    >
      <Cleaver className="h-8 w-auto shrink-0 text-humo" />
      {showLabel && (
        <span className="font-display text-xs uppercase tracking-[0.08em] text-humo-2">
          Próximamente
        </span>
      )}
    </div>
  );
}
