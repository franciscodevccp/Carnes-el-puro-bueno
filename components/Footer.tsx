import Link from "next/link";
import { Clock, MapPin } from "@phosphor-icons/react/dist/ssr";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";

import { Logo } from "@/components/Logo";
import { site, whatsappLink } from "@/lib/site";

const LINK_COLUMNS = [
  {
    title: "Tienda",
    links: [
      { href: "/catalogo", label: "Catálogo" },
      { href: "/promos", label: "Promos" },
      { href: "/mayorista", label: "Mayorista" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { href: "/contacto", label: "Despacho" },
      { href: "/contacto", label: "Contacto" },
      { href: "/nosotros", label: "Nosotros" },
    ],
  },
];

const SOCIALS = [
  { Icon: SiInstagram, label: "Instagram", url: site.social.instagram.url },
  { Icon: SiTiktok, label: "TikTok", url: site.social.tiktok.url },
  { Icon: SiFacebook, label: "Facebook", url: site.social.facebook.url },
];

const PAYMENT_METHODS = ["Webpay", "Flow", "Transferencia"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-linea bg-carbon">
      <div className="site-container py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr]">
          {/* Marca + redes */}
          <div className="col-span-2 space-y-5 lg:col-span-1">
            <Logo variant="horizontal" />
            <p className="max-w-xs text-sm leading-relaxed text-humo">
              Carne fresca y cadena de frío, del local en Padre Hurtado a tu
              mesa.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-linea text-humo transition-colors hover:border-linea-fuerte hover:text-hueso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de links */}
          {LINK_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="space-y-3">
              <h3 className="eyebrow text-humo-2">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-humo transition-colors hover:text-hueso"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contacto */}
          <div className="col-span-2 space-y-3 lg:col-span-1">
            <h3 className="eyebrow text-humo-2">Contacto</h3>
            <ul className="space-y-3 text-sm text-humo">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} weight="light" className="mt-0.5 shrink-0 text-rojo" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <SiWhatsapp className="mt-0.5 size-[18px] shrink-0 text-rojo" />
                <a
                  href={whatsappLink("¡Hola! Tengo una consulta.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-hueso"
                >
                  {site.whatsapp.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={18} weight="light" className="mt-0.5 shrink-0 text-rojo" />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 flex flex-col gap-4 border-t border-linea pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-humo-2">
            © {year} {site.name} ·{" "}
            <span className="font-script text-sm text-humo">{site.tagline}</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-humo-2">Pagos:</span>
            <ul className="flex items-center gap-1.5">
              {PAYMENT_METHODS.map((method) => (
                <li
                  key={method}
                  className="rounded-sm border border-linea px-2 py-1 text-xs text-humo"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
