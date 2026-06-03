import Link from "next/link";
import { Snowflake, Star, Truck } from "@phosphor-icons/react/dist/ssr";

import { Cleaver } from "@/components/Logo";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-linea">
      {/* Capa de fondo lista para una foto futura — sin rehacer el hero.
          La foto va aquí (object-cover) detrás del velo. Sobre carbón el velo es
          invisible; cuando haya foto, da legibilidad al texto. El degradado
          vertical transparent→carbon es la única excepción permitida a
          "sin degradados" (legibilidad sobre foto, design.md §8). */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* <Image src="/hero.jpg" alt="" fill priority className="object-cover" /> */}
        <div className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/70 to-transparent" />
      </div>

      <div className="site-container relative py-16 sm:py-24 lg:py-36">
        {/* Hero type-led: el titular es el punto focal y ocupa el ancho en desktop.
            Entrada escalonada al cargar (design.md §9). */}
        <StaggerGroup trigger="mount" className="max-w-2xl lg:max-w-5xl">
          <StaggerItem>
            <p className="eyebrow flex items-center gap-2 text-rojo">
              <Cleaver className="h-3.5 w-auto" />
              Carnicería · Padre Hurtado
            </p>
          </StaggerItem>

          <StaggerItem className="mt-5">
            <h1 className="text-display">
              El corte que <span className="text-rojo">marca la diferencia</span>.
            </h1>
          </StaggerItem>

          <StaggerItem className="mt-6">
            <p className="max-w-xl text-lg leading-relaxed text-humo">
              Carne fresca, cadena de frío y despacho a tu zona. Del local en
              Padre Hurtado a tu mesa.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/catalogo">Ver cortes</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/promos">Ver promos</Link>
              </Button>
            </div>
          </StaggerItem>

          <StaggerItem className="mt-10">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-humo">
              <span className="flex items-center gap-1.5">
                <Star size={16} weight="fill" className="text-rojo" />
                <strong className="font-semibold text-hueso">
                  {site.rating.score.toLocaleString("es-CL")}
                </strong>
                · {site.rating.count} opiniones
              </span>
              <span className="flex items-center gap-1.5">
                <Snowflake size={16} weight="light" className="text-rojo" />
                Cadena de frío
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={16} weight="light" className="text-rojo" />
                Envío gratis sobre {formatPrice(site.shipping.freeOver)}
              </span>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
