"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List } from "@phosphor-icons/react";

import { AnnouncementBar } from "@/components/AnnouncementBar";
import { CartSheet } from "@/components/CartSheet";
import { Logo } from "@/components/Logo";
import { SearchDialog } from "@/components/SearchDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/promos", label: "Promos" },
  { href: "/mayorista", label: "Mayorista" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Barra de anuncio (ticker animado) */}
      <AnnouncementBar />

      {/* Header sticky */}
      <header className="sticky top-0 z-40 border-b border-linea bg-carbon/90 backdrop-blur">
        <div className="site-container flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Carnes El Puro Bueno — inicio"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rojo"
          >
            <Logo variant="horizontal" />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-rojo",
                  isActive(link.href) ? "text-rojo" : "text-humo"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-0.5">
            <SearchDialog />

            <Button asChild className="ml-1 hidden lg:inline-flex">
              <Link href="/catalogo">Ver cortes</Link>
            </Button>

            {/* Menú móvil */}
            <MobileMenu isActive={isActive} count={count} />
          </div>
        </div>
      </header>

      {/* Drawer del carrito (global) */}
      <CartSheet />
    </>
  );
}

function MobileMenu({
  isActive,
  count,
}: {
  isActive: (href: string) => boolean;
  count: number;
}) {
  return (
    <Sheet>
      <SheetTrigger
        className="inline-flex size-10 items-center justify-center rounded-md text-hueso transition-colors hover:bg-grafito focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo lg:hidden"
        aria-label="Abrir menú"
      >
        <List size={24} />
      </SheetTrigger>
      <SheetContent side="right" className="border-linea p-0">
        <SheetHeader className="gap-0 border-b border-linea px-5 py-5">
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <SheetDescription className="sr-only">
            Navegación principal del sitio
          </SheetDescription>
          <Logo variant="horizontal" />
        </SheetHeader>

        <nav className="flex flex-col px-3 py-2">
          {NAV_LINKS.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-3 font-display text-lg uppercase tracking-[0.01em] transition-colors hover:bg-grafito",
                  isActive(link.href) ? "text-rojo" : "text-hueso"
                )}
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto border-t border-linea p-5">
          <SheetClose asChild>
            <Link
              href="/catalogo"
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              Ver cortes
            </Link>
          </SheetClose>
          {count > 0 && (
            <p className="mt-3 text-center text-xs text-humo-2">
              {count} {count === 1 ? "producto" : "productos"} en tu carro
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
