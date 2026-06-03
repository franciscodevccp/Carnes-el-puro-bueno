import { Knife, SealCheck, Snowflake, Truck } from "@phosphor-icons/react/dist/ssr";

const SEALS = [
  { Icon: Snowflake, title: "Cadena de frío", text: "Del frigorífico a tu puerta sin cortar la cadena." },
  { Icon: Knife, title: "Frescura garantizada", text: "Cortamos el día, no la semana." },
  { Icon: SealCheck, title: "Origen trazable", text: "Sabes de dónde viene tu carne." },
  { Icon: Truck, title: "Retiro o despacho", text: "Pasas a buscarlo o te lo llevamos." },
];

export function TrustSeals() {
  return (
    <section className="border-y border-linea bg-grafito">
      <div className="site-container grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {SEALS.map(({ Icon, title, text }) => (
          <div key={title} className="flex flex-col gap-2">
            <Icon size={26} weight="light" className="text-rojo" />
            <h3 className="font-display text-base uppercase tracking-[0.01em] text-hueso">
              {title}
            </h3>
            <p className="text-sm text-humo">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
