import { Cleaver } from "@/components/Logo";

/** Separador sutil: línea fina interrumpida por el machete (design.md §7). */
export function MacheteDivider() {
  return (
    <div className="site-container flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-linea" />
      <Cleaver className="h-4 w-auto text-rojo-sangre" />
      <span className="h-px flex-1 bg-linea" />
    </div>
  );
}
