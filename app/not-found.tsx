import Link from "next/link";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="site-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Logo variant="icon" className="h-16 text-linea-fuerte" />
      <p className="eyebrow mt-8 text-rojo">Error 404</p>
      <h1 className="text-h1 mt-3 text-hueso">
        Esta página se fue a la parrilla
      </h1>
      <p className="mt-4 max-w-md text-pretty text-humo">
        No encontramos lo que buscabas. Volvamos al inicio y sigamos con los
        buenos cortes.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Volver al inicio</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/catalogo">Ver cortes</Link>
        </Button>
      </div>
    </section>
  );
}
