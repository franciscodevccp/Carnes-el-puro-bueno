import { Star } from "@phosphor-icons/react/dist/ssr";

import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

const TESTIMONIALS = [
  { text: "Pedí el pack parrillero y llegó todo en frío y bien envuelto. La carne, de primera.", author: "Cliente de muestra" },
  { text: "Buena atención y precios. El lomo vetado es el mejor del sector.", author: "Cliente de muestra" },
  { text: "Hice el pedido por la web y llegó al día siguiente, todo refrigerado. Comodísimo.", author: "Cliente de muestra" },
];

function Stars({ filled = 5 }: { filled?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          weight={i < filled ? "fill" : "regular"}
          className={i < filled ? "text-rojo" : "text-humo-2"}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="site-container py-16 sm:py-24">
      <SectionHeading eyebrow="Reseñas" title="Lo que dicen los clientes" />

      <div className="mt-4 flex items-center gap-3">
        <Stars filled={4} />
        <span className="text-sm text-humo">
          <strong className="font-semibold text-hueso">
            {site.rating.score.toLocaleString("es-CL")}
          </strong>{" "}
          · {site.rating.count} opiniones en Google
        </span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.text}
            className="flex flex-col rounded-lg border border-linea bg-grafito p-5"
          >
            <Stars />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-hueso">
              {`«${t.text}»`}
            </blockquote>
            <figcaption className="mt-4 text-xs text-humo-2">
              {t.author}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-6 text-xs text-humo-2">
        Reseñas de muestra para la maqueta. El rating es real (Google).
      </p>
    </section>
  );
}
