import type { Metadata } from "next";
import Link from "next/link";
import { Knife, MapPin, SealCheck, Snowflake } from "@phosphor-icons/react/dist/ssr";

import { Cleaver } from "@/components/Logo";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Carnicería de barrio en Padre Hurtado. Cortes frescos, cadena de frío y atención de verdad. Marcando la Diferencia.",
};

const VALUES = [
  { Icon: Knife, title: "Frescura", text: "Cortamos el día, no la semana." },
  { Icon: SealCheck, title: "Origen trazable", text: "Sabes de dónde viene tu carne." },
  { Icon: Snowflake, title: "Cadena de frío", text: "Del frigorífico a tu puerta sin cortarla." },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader eyebrow="Nosotros" title="Marcando la diferencia" />

      <section className="site-container grid gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4 text-pretty text-humo">
          <p>
            En Carnes El Puro Bueno llevamos la mejor carne hasta tu hogar. Desde
            nuestro local en Padre Hurtado seleccionamos cortes frescos y de
            calidad, cuidando la cadena de frío de principio a fin.
          </p>
          <p>
            No vendemos cualquier cosa: vendemos la que nos comeríamos nosotros.
            Eso es marcar la diferencia.
          </p>
          <p className="pt-2 font-script text-3xl text-hueso">
            Marcando la Diferencia
          </p>
        </div>

        {/* Placeholder de foto del local (sin fotos por ahora) */}
        <div
          className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-linea-fuerte bg-grafito"
          role="img"
          aria-label="Foto del local — próximamente"
        >
          <Cleaver className="h-10 w-auto text-humo" />
          <span className="font-display text-xs uppercase tracking-[0.08em] text-humo-2">
            Foto del local · Próximamente
          </span>
        </div>
      </section>

      {/* Valores */}
      <section className="border-y border-linea bg-grafito">
        <div className="site-container grid gap-8 py-12 sm:grid-cols-3">
          {VALUES.map(({ Icon, title, text }) => (
            <div key={title} className="flex flex-col gap-2">
              <Icon size={26} weight="light" className="text-rojo" />
              <h2 className="font-display text-base uppercase tracking-[0.01em] text-hueso">
                {title}
              </h2>
              <p className="text-sm text-humo">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visítanos */}
      <section className="site-container flex flex-col gap-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16">
        <div className="flex items-start gap-2.5">
          <MapPin size={22} weight="light" className="mt-0.5 shrink-0 text-rojo" />
          <div>
            <p className="font-display text-lg uppercase tracking-[0.01em] text-hueso">
              Visítanos
            </p>
            <p className="text-sm text-humo">{site.address}</p>
            <p className="text-sm text-humo-2">{site.hours}</p>
          </div>
        </div>
        <Button asChild size="lg" variant="outline">
          <Link href="/contacto">Cómo llegar y contacto</Link>
        </Button>
      </section>
    </>
  );
}
