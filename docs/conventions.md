# Convenciones de código

> Cómo se escribe y organiza el código de la maqueta. El diseño manda en `docs/design.md`; el contenido en `docs/content.md`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · `@phosphor-icons/react` · `@icons-pack/react-simple-icons` · `motion` · pnpm.

## Estructura de carpetas

Sin `src/` (todo en la raíz, como en `design.md`):

```
app/                    # rutas (App Router)
  layout.tsx            # layout raíz: fuentes, <html> dark, providers
  page.tsx              # Home
  catalogo/page.tsx
  producto/[slug]/page.tsx
  mayorista/page.tsx
  promos/page.tsx
  nosotros/page.tsx
  contacto/page.tsx
  checkout/page.tsx
  not-found.tsx
  globals.css           # @import "tailwindcss" + @theme con los tokens de marca
components/
  ui/                   # componentes de shadcn (button, sheet, dialog, ...)
  Logo.tsx              # logo tipografiado (ver design.md)
  ProductImage.tsx      # imagen con placeholder "Próximamente"
  ProductCard.tsx
  Navbar.tsx
  Footer.tsx
  CartSheet.tsx         # drawer del carrito
  ...
lib/
  products.ts           # catálogo (de content.md)
  promos.ts             # packs (de content.md)
  utils.ts              # cn(), formatPrice()
  cart.tsx              # estado del carrito (Context o zustand)
public/
  cleaver.svg           # machete (placeholder hasta el real)
  favicon
docs/                   # estos .md
```

## Reglas generales

- **TypeScript estricto.** Tipa los datos (`Product`, `Promo`, `Category`). Nada de `any`.
- **Server Components por defecto.** Usa `"use client"` solo donde haya interacción o estado: carrito, drawers, `motion`, filtros, formularios.
- **Componentes** en PascalCase, archivos `.tsx`. Un componente por archivo cuando tenga peso.
- **Rutas y slugs** en kebab-case (`/producto/lomo-vetado`).
- **Tailwind v4:** tokens en `@theme` dentro de `globals.css` (no hay `tailwind.config.ts`). Usa las clases de marca (`bg-carbon`, `text-hueso`, `text-rojo`, `font-display`, etc.). Combina clases con `cn()`.

## Mobile-first (no negociable)

Su público viene de TikTok e Instagram → **mayoría móvil**. Estilos base = móvil; sube con breakpoints (`sm` `md` `lg` `xl`). **Verifica cada página en ≤375px antes que en desktop.** Áreas táctiles ≥ 44px.

## Dark-only

El sitio es oscuro siempre. **No** uses `next-themes`, **no** uses variantes `dark:`, **no** pongas toggle de tema. Todo se diseña directo sobre `carbon`.

## Estados obligatorios

No entregues solo la "pantalla feliz". Cada vista debe manejar:
- **Listas/colecciones:** loading (skeleton), vacío, **"sin resultados"**.
- **Interactivos:** hover, focus (anillo visible), active, disabled.
- **Acciones:** feedback con `sonner` (toast).
- **404:** página propia con personalidad (ver copy en `content.md`).
El carrito vacío lleva el **machete** + copy con onda.

## Imágenes: componente `ProductImage`

**Regla:** por ahora NO hay fotos. Toda imagen de producto pasa por `ProductImage`. Si no hay `src`, muestra el placeholder de marca **"Próximamente"**; cuando llegue la foto, se pasa `src` y se acabó — sin tocar las cards. **Jamás fotos de carne generadas con IA.**

```tsx
// components/ProductImage.tsx
import Image from "next/image";
import { Knife } from "@phosphor-icons/react/dist/ssr";

type ProductImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  if (src) {
    return (
      <div className={`relative aspect-[4/5] overflow-hidden rounded-md ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
      </div>
    );
  }

  // Placeholder "Próximamente"
  return (
    <div
      className={`flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-linea-fuerte bg-grafito ${className}`}
      role="img"
      aria-label={`${alt} — foto próximamente`}
    >
      <Knife size={32} weight="light" className="text-humo" aria-hidden />
      <span className="font-display text-xs uppercase tracking-[0.08em] text-humo-2">Próximamente</span>
    </div>
  );
}
```

> El ícono `Knife` de Phosphor es un placeholder; cuando exista el SVG del cleaver real (sección 2 de `design.md` / `public/cleaver.svg`), úsalo en su lugar para que el placeholder lleve la marca real.

En la data, el campo `image` va en `null` mientras no haya foto (ver `content.md`).

## Datos y carrito (sin backend)

- **Todo el contenido** sale de `lib/` (que refleja `content.md`). **Prohibido lorem ipsum** y precios inventados.
- **Carrito = estado de cliente.** Para la maqueta basta React Context + `useState` en `lib/cart.tsx`. No hay persistencia ni backend. (Si crece, `zustand` — pero no lo agregues aún.)
- **Checkout** es solo UI: no valida ni procesa pagos.

## Formato de precios (CLP)

Siempre formato chileno: `$12.990` (punto de miles, sin decimales). El `/kg` va más chico y en `humo`.

```ts
// lib/utils.ts
export const formatPrice = (clp: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(clp);
// formatPrice(12990) -> "$12.990"
```

## Accesibilidad

- Focus visible siempre (nunca `outline: none` sin reemplazo).
- `aria-label` en botones de solo ícono; `alt` en imágenes.
- Navegación por teclado en drawers, menús y diálogos (shadcn/Radix ya ayuda).
- Jerarquía semántica correcta (`h1` único por página).
- Respeta `prefers-reduced-motion`.

## Phosphor — uso

Import por componente (tree-shaking) y, en server components, desde el subpath `/dist/ssr`:
```tsx
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr"; // server
// o "@phosphor-icons/react" en componentes "use client"
```
Un solo peso base por contexto (`regular`), `light`/`thin` para acentos. Logos de marca → Simple Icons.
