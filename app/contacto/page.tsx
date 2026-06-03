import type { Metadata } from "next";
import { ArrowSquareOut, Clock, MapPin } from "@phosphor-icons/react/dist/ssr";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

import { ContactForm } from "@/components/contacto/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { site, whatsappLink } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Carnes El Puro Bueno en Padre Hurtado. Dirección, horario, zonas de despacho y contacto.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos"
        subtitle="Escríbenos para pedidos, dudas o despacho. Estamos en Padre Hurtado y despachamos a tu zona."
      />

      <section className="site-container grid gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={20} weight="light" className="mt-0.5 shrink-0 text-rojo" />
              <div>
                <p className="font-medium text-hueso">Dirección</p>
                <p className="text-humo">{site.address}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={20} weight="light" className="mt-0.5 shrink-0 text-rojo" />
              <div>
                <p className="font-medium text-hueso">Horario</p>
                <p className="text-humo">{site.hours}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <SiWhatsapp className="mt-0.5 size-5 shrink-0 text-rojo" />
              <div>
                <p className="font-medium text-hueso">WhatsApp / Teléfono</p>
                <a
                  href={whatsappLink("¡Hola! Tengo una consulta.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-humo transition-colors hover:text-hueso"
                >
                  {site.whatsapp.display}
                </a>
              </div>
            </li>
          </ul>

          <div className="rounded-lg border border-linea bg-grafito p-5">
            <p className="eyebrow text-humo-2">Zonas de despacho</p>
            <p className="mt-2 text-sm text-humo">
              {site.shipping.zones.join(" · ")}. Envío gratis sobre{" "}
              {formatPrice(site.shipping.freeOver)}.
            </p>
          </div>

          {/* Mapa real (Google Maps embed) */}
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-linea">
              <iframe
                src={site.maps.embedUrl}
                title={`Mapa — ${site.name}, ${site.addressShort}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/9] w-full border-0"
              />
            </div>
            <a
              href={site.maps.placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-rojo transition-colors hover:text-rojo-hover"
            >
              <ArrowSquareOut size={16} />
              Ver en Google Maps
            </a>
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
