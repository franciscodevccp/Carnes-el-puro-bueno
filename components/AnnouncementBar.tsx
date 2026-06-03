import { Cleaver } from "@/components/Logo";
import { promos } from "@/lib/promos";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

// Mensajes del ticker: despacho, envío y las promos de hoy.
const MESSAGES: string[] = [
  "Despacho en frío, siempre",
  `Envío gratis sobre ${formatPrice(site.shipping.freeOver)}`,
  ...promos.map(
    (p) =>
      `${p.name} a ${formatPrice(p.price)}${p.freeShipping ? " · envío gratis" : ""}`
  ),
  `Despachamos a ${site.shipping.zones.join(", ")}`,
  `${site.rating.score.toLocaleString("es-CL")}★ · ${site.rating.count} opiniones`,
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {MESSAGES.map((message) => (
        <li key={message} className="flex items-center">
          <Cleaver className="mx-5 h-3 w-auto shrink-0 text-hueso/60" />
          <span className="whitespace-nowrap">{message}</span>
        </li>
      ))}
    </ul>
  );
}

/** Barra de anuncio como ticker: se desplaza de derecha a izquierda, en loop. */
export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-rojo-sangre py-1.5 text-xs text-hueso sm:text-sm">
      {/* Dos copias idénticas: al desplazar -50% el loop es continuo. */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}
