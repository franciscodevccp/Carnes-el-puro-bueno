import { PromoCard } from "@/components/PromoCard";
import { SectionHeading } from "@/components/SectionHeading";
import { promos } from "@/lib/promos";

export function WeeklyPromos() {
  return (
    <section className="site-container py-16 sm:py-24">
      <SectionHeading
        eyebrow="Promos TikTok"
        title="Promos de la semana"
        action={{ href: "/promos", label: "Ver todas las promos" }}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {promos.map((promo, i) => (
          <PromoCard key={promo.slug} promo={promo} featured={i === 0} />
        ))}
      </div>
    </section>
  );
}
