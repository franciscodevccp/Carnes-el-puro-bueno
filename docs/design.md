# Design System — Carnes El Puro Bueno

> **Para Claude Code:** este archivo es la **fuente de verdad del diseño** del proyecto. Antes de crear cualquier componente, página o estilo, respeta lo que está acá. Si algo no está definido, sigue los *principios* de la sección 2 y mantén la coherencia. No inventes colores, fuentes ni efectos fuera de este documento.

---

## 0. TL;DR (lee esto primero)

- **Concepto:** carnicería premium, *rústico pero elegante*. Lo llamamos **"Carbón y Brasa"**.
- **Base oscura** (negro/carbón) + **rojo de marca como acento** (solo 5–10% de la superficie) + **blanco hueso** para texto.
- **Plano. Nada de 3D, bevel, gloss, sombras ni degradados.** El logo original es 3D y brilloso; en el sitio lo usamos **aplanado**. El logo va como **componente tipografiado + SVG** (`Logo`), **nunca la imagen PNG del cliente** (ver §2).
- **La fotografía es el 80% de lo elegante:** oscura, moody, un foco de luz, cortes sobre madera/pizarra.
- **Tipografía:** `Oswald` (títulos, mayúsculas) + `Archivo` (texto/UI) + `Yellowtail` (acento script, con pinzas).
- **Regla de oro:** negro manda, blanco lee, rojo apunta. Si inviertes esa proporción, se cae la elegancia.

---

## 1. Contexto del producto (por qué el diseño es así)

El negocio es una carnicería de Padre Hurtado (RM) con un buen movimiento en redes (TikTok/Instagram) que hoy vende **todo por WhatsApp**. El sitio existe para que **la web venda sola** y deje de depender del chat.

El proyecto tiene **3 capas de diseño** (el cliente las llama "4 sectores", pero se agrupan así):

| Capa | Qué es | Audiencia | Tono visual |
|------|--------|-----------|-------------|
| **B2C — Carnicería + Almacén** | Tienda minorista. Catálogo de cortes + abarrotes en un mismo carrito. Es el corazón. | Familias, consumidor final | Elegante base (este documento) |
| **B2B — Carnes por Mayor** | Venta por caja/volumen. Precios distintos, pedido mínimo, lista de precios / cotización. | Restaurantes, casinos, otras carnicerías | Más sobrio, eficiente, tabular |
| **Promos (TikTok)** | Landing(s) que convierten el tráfico de TikTok. Promo destacada de la semana, packs. | Seguidores de redes | Más bold, más rojo, más energía |

> El diseño base es **el mismo** para todo, pero **flexa** por capa (ver sección 12). No las hagas idénticas ni las hagas tres marcas distintas.

**Posicionamiento que el diseño debe transmitir:** confianza y calidad. Frescura, **cadena de frío**, trazabilidad/origen de la carne, local real. Esto se comunica con fotografía real, sellos de confianza y microcopy claro (no con adornos).

---

## 2. Concepto y principios

### Concepto: "Carbón y Brasa"
Tomamos el **ADN del logo** (negro + rojo + blanco, la tipografía condensada, el machete, el "Marcando la Diferencia") y construimos un sistema **plano, con aire y rojo medido**. El resultado es premium tipo *steakhouse / carnicería boutique*, no promo de feria.

### Qué conservamos del logo
- Paleta negro / rojo / blanco.
- Tipografía display **condensada y pesada** en mayúsculas.
- El **machete** como símbolo propio (motivo recurrente).
- El acento script "Marcando la Diferencia".

### Qué soltamos del logo
- ❌ El **relieve 3D / extrusión**.
- ❌ El **brillo metálico / gloss**.
- ❌ Las **sombras duras** de las letras.
- → Todo se vuelve **plano**.

### El logo en el sitio — versión aplanada + componente

Esta es **la versión del logo que se usa en el sitio**: el mismo logo, pero con tratamiento **plano** (sin el 3D del logo de marketing), reconstruido con **texto + SVG** (no imagen).

#### Regla clave — qué logo usar dónde
- ✅ **En el header/navbar y en TODA la UI del sitio se usa el componente `Logo`** (el lockup tipografiado, definido abajo).
- ❌ **NUNCA usar la imagen 3D / PNG que entregó el cliente** dentro del sitio. Esa imagen es para marketing y redes. En web se vería **borrosa en pantallas retina**, pesa de más y queda "pegoteada". El sitio reconstruye el logo con tipografía + SVG: nítido a cualquier tamaño, liviano, recoloreable y alineado con el sistema tipográfico.
- La imagen del cliente, a lo más, podría usarse en **metadatos sociales** (OG image para compartir en redes), **nunca en la interfaz**.

#### Composición (lockup apilado)
- **Línea 1 — `CARNES`** · Oswald 700, MAYÚSCULAS, color `hueso` (`#F4F0E9`).
- **Línea 2 — `EL PURO BUENO`** · Oswald 700, MAYÚSCULAS, color `rojo` (`#D81F26`). Mismo tamaño que la línea 1 y pegada (`line-height ~0.9`).
- **Tagline (debajo, centrado)** · una línea fina `rojo-sangre` (`#8C1014`, 1px, ~56px) a cada lado, flanqueando **"Marcando la Diferencia"** en `Yellowtail` (`font-script`), color `hueso`.
- Wordmark con `letter-spacing ~0.01em` (apretado, condensado).

**Tratamiento (clave):** 100% plano. **Sin relieve 3D, sin bevel, sin gloss, sin sombra.** Esa es la diferencia con el logo promocional original.

#### El componente `Logo` (úsalo en todo el sitio)
Tres variantes vía la prop `variant`:
- **`horizontal`** → header/navbar. Cleaver + wordmark en línea. Sin tagline.
- **`stacked`** → hero, footer, splash. Centrado, con tagline opcional (prop `tagline`).
- **`icon`** → favicon, avatar, loader, estados vacíos. Solo el machete.

```tsx
// components/Logo.tsx
type LogoProps = {
  variant?: "horizontal" | "stacked" | "icon";
  tagline?: boolean;
  className?: string;
};

function Cleaver({ className }: { className?: string }) {
  // PLACEHOLDER: reemplazar el path por el cleaver real trazado del logo del cliente.
  return (
    <svg viewBox="0 0 120 72" fill="currentColor" fillRule="evenodd" aria-hidden className={className}>
      <path d="M16 8 H66 a6 6 0 0 1 6 6 V58 a6 6 0 0 1 -6 6 H16 a6 6 0 0 1 -6 -6 V14 a6 6 0 0 1 6 -6 Z M24 15.5 a4.5 4.5 0 1 0 0 9 a4.5 4.5 0 1 0 0 -9 Z M72 28 H104 a8 8 0 0 1 0 16 H72 Z" />
    </svg>
  );
}

export function Logo({ variant = "horizontal", tagline = false, className = "" }: LogoProps) {
  if (variant === "icon") {
    return <Cleaver className={`h-7 w-auto text-hueso ${className}`} />;
  }

  const wordmark = (
    <div className={variant === "stacked" ? "text-center leading-[0.9]" : "leading-[0.9]"}>
      <span className="block font-display font-bold uppercase tracking-[0.01em] text-hueso">
        Carnes
      </span>
      <span className="block font-display font-bold uppercase tracking-[0.01em] text-rojo">
        El Puro Bueno
      </span>
      {tagline && (
        <span className="mt-1 block font-script normal-case text-hueso">Marcando la Diferencia</span>
      )}
    </div>
  );

  if (variant === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <Cleaver className="h-10 w-auto text-hueso" />
        <div className="text-3xl">{wordmark}</div>
      </div>
    );
  }

  // horizontal → navbar
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <Cleaver className="h-8 w-auto text-hueso" />
      <div className="text-base">{wordmark}</div>
    </div>
  );
}
```

Uso: navbar `<Logo variant="horizontal" />` · hero/footer `<Logo variant="stacked" tagline />` · favicon/loader `<Logo variant="icon" />`. El tamaño del wordmark se controla con la clase de tamaño de fuente del contenedor (`text-base`, `text-3xl`…) y la altura del cleaver con `h-*`.

#### El machete (cleaver) en SVG
- Va **siempre como SVG vectorial**, nunca PNG: se recolorea con `currentColor` (hereda el color del texto), escala sin pixelarse y sirve de favicon.
- **El cleaver del componente es un PLACEHOLDER genérico** — no es el cleaver real del logo. Para fidelidad, **trazar el cleaver real** desde el logo del cliente (vectorizer.ai, Inkscape → "Trazar mapa de bits", o Illustrator → Image Trace) y reemplazar el `path` en `Cleaver` **y** en `public/cleaver.svg`. Ver pendiente en la sección 16.
- Asset suelto para favicon / OG / usos fuera de React:

```svg
<!-- public/cleaver.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 72" fill="#F4F0E9" fill-rule="evenodd">
  <path d="M16 8 H66 a6 6 0 0 1 6 6 V58 a6 6 0 0 1 -6 6 H16 a6 6 0 0 1 -6 -6 V14 a6 6 0 0 1 6 -6 Z M24 15.5 a4.5 4.5 0 1 0 0 9 a4.5 4.5 0 1 0 0 -9 Z M72 28 H104 a8 8 0 0 1 0 16 H72 Z"/>
</svg>
```

#### Color y fondos del logo
- **Monocromo:** versión todo `hueso` para sobre fotos o fondos muy cargados donde el rojo no contrasta. El rojo es la versión preferente; el blanco es el respaldo.
- **Fondos:** sobre `carbon`, `grafito` o foto oscura (con velo de legibilidad). Nunca sobre fondo claro o foto sin velo.

#### Prioridad de asset
1. **Wordmark:** siempre el componente `Logo` (tipografiado). No se usa la imagen del cliente, **ni siquiera** si entrega un vector del wordmark — el tipografiado integra mejor con el sistema y mantiene todo consistente.
2. **Cleaver:** placeholder ahora → reemplazar por el cleaver real trazado del logo cuando el cliente entregue el archivo (sección 16).

#### Qué NO hacer con el logo
- ❌ Usar la **imagen 3D / PNG del cliente** en el header o en cualquier parte de la UI.
- ❌ Re-agregarle 3D, sombra o gloss.
- ❌ Recolorearlo fuera de `hueso` / `rojo`.
- ❌ Estirarlo, condensarlo más o rotarlo.
- ❌ Ponerlo sobre fondo claro o foto sin velo.

### Principios (no negociables)
1. **Negro domina.** El fondo es oscuro casi siempre. El negro ES el lujo.
2. **Rojo es acento, no relleno.** Máx ~5–10% de la superficie. CTAs, detalles, hover, precios destacados. Nunca grandes bloques rojos de fondo.
3. **Aire.** Espacio negativo generoso. Respira. El apretujamiento mata la elegancia.
4. **Plano.** Sin degradados, sin sombras decorativas, sin glow, sin neón, sin 3D.
5. **Foto premium primero.** El diseño es el marco; la carne es la protagonista.
6. **Rústico = detalle, no fondo.** Madera, cuero, papel de carnicería: con moderación, como acento. Si llenas todo de textura, se cae a charcha.
7. **Restricción tipográfica.** Pocas fuentes, pocos pesos, jerarquía clara.

---

## 3. Color

### Tokens (paleta core)

| Token | Hex | Rol | Uso |
|-------|-----|-----|-----|
| `carbon` | `#0E0E0F` | Fondo principal | Body, secciones full-bleed |
| `grafito` | `#18181B` | Superficie | Cards, paneles, inputs |
| `grafito-2` | `#232327` | Superficie elevada | Hover de cards, dropdowns, drawer |
| `rojo` | `#D81F26` | **Marca / primario** | CTAs, acentos, precios destacados, links activos |
| `rojo-hover` | `#B81A20` | Estado hover del rojo | Hover de botón primario |
| `rojo-sangre` | `#8C1014` | Rojo profundo | Bordes de acento, reglas, profundidad |
| `hueso` | `#F4F0E9` | **Texto primario** | Titulares y texto sobre fondo oscuro |
| `humo` | `#A39E96` | Texto secundario | Subtítulos, metadatos, labels |
| `humo-2` | `#6E6A63` | Texto terciario / hints | Placeholders, captions tenues, disabled |
| `linea` | `rgba(244,240,233,0.10)` | Borde/divisor sutil | Bordes por defecto, separadores |
| `linea-fuerte` | `rgba(244,240,233,0.22)` | Borde marcado | Hover de borde, énfasis |

### Acento rústico (opcional, usar poco)
| Token | Hex | Rol |
|-------|-----|-----|
| `kraft` | `#B07D52` | Acento cuero/papel para detalles artesanales (sellos, badges "artesanal") |

### Semánticos (formularios y estados)
| Token | Hex | Rol |
|-------|-----|-----|
| `success` | `#57B894` | Confirmaciones, "en stock", pago ok |
| `warning` | `#E0A53B` | Avisos, "últimas unidades" |
| `error` | `#FF5A5A` | Errores de formulario (distinto del rojo de marca para no confundir) |

### Reglas de uso del color
- **Texto sobre fondo de color:** sobre rojo (`#D81F26`) usa `hueso` (`#F4F0E9`), nunca negro puro. Sobre superficies oscuras usa `hueso`/`humo`.
- **Proporción:** ~80% carbón/grafito, ~12% hueso/humo (texto), ~8% rojo. Vigílala.
- **Contraste:** todo texto debe pasar AA. `humo` sobre `carbon` está ok para secundario; no uses `humo-2` para texto importante.
- **No** uses el rojo para grandes áreas, fondos de sección, ni cards completas.

### CSS Custom Properties (pégalas en `globals.css`)

```css
:root {
  /* superficies */
  --color-carbon: #0E0E0F;
  --color-grafito: #18181B;
  --color-grafito-2: #232327;
  /* marca */
  --color-rojo: #D81F26;
  --color-rojo-hover: #B81A20;
  --color-rojo-sangre: #8C1014;
  /* texto */
  --color-hueso: #F4F0E9;
  --color-humo: #A39E96;
  --color-humo-2: #6E6A63;
  /* lineas */
  --color-linea: rgba(244, 240, 233, 0.10);
  --color-linea-fuerte: rgba(244, 240, 233, 0.22);
  /* acento rustico */
  --color-kraft: #B07D52;
  /* semanticos */
  --color-success: #57B894;
  --color-warning: #E0A53B;
  --color-error: #FF5A5A;
  /* radios */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 999px;
  /* sombra: solo focus ring funcional, nada decorativo */
  --focus-ring: 0 0 0 3px rgba(216, 31, 38, 0.45);
}

html { background: var(--color-carbon); color: var(--color-hueso); }
```

> **El sitio es dark-only.** No hay light mode. No agregues `prefers-color-scheme` ni un toggle salvo que se pida.

---

## 4. Tipografía

### Fuentes (Google Fonts)
| Fuente | Rol | Pesos |
|--------|-----|-------|
| **Oswald** | Títulos, precios, eyebrows. Siempre en MAYÚSCULAS para títulos. | 500, 600, 700 |
| **Archivo** | Texto de párrafo, UI, botones, labels. | 400, 500, 600 |
| **Yellowtail** | Acento script ("Marcando la Diferencia"). **Solo decorativo, con pinzas.** | 400 |

**Import (si no usas `next/font`):**
```css
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Archivo:wght@400;500;600&family=Yellowtail&display=swap');
```

**Fallbacks:**
```css
--font-display: 'Oswald', 'Arial Narrow', system-ui, sans-serif;
--font-body: 'Archivo', system-ui, -apple-system, sans-serif;
--font-script: 'Yellowtail', cursive;
```

### Escala tipográfica (mobile-first, `clamp` para responsive)

| Estilo | Fuente / peso | Tamaño | line-height | letter-spacing | Transform |
|--------|---------------|--------|-------------|----------------|-----------|
| `display` (hero) | Oswald 700 | `clamp(2.75rem, 7vw, 5rem)` | 0.95 | 0.01em | UPPER |
| `h1` | Oswald 700 | `clamp(2rem, 4.5vw, 3rem)` | 1.0 | 0.01em | UPPER |
| `h2` | Oswald 600 | `clamp(1.5rem, 3vw, 2rem)` | 1.05 | 0.01em | UPPER |
| `h3` | Oswald 600 | `1.25rem` (20px) | 1.2 | 0.01em | UPPER |
| `eyebrow` | Archivo 500 | `0.8125rem` (13px) | 1.2 | 0.08em | UPPER |
| `body-lg` | Archivo 400 | `1.125rem` (18px) | 1.6 | normal | none |
| `body` | Archivo 400 | `1rem` (16px) | 1.6 | normal | none |
| `small` | Archivo 400 | `0.875rem` (14px) | 1.5 | normal | none |
| `caption` | Archivo 400 | `0.75rem` (12px) | 1.4 | normal | none |
| `price` | Oswald 600 | contextual (20–28px) | 1.0 | 0 | none |
| `script` | Yellowtail | contextual (24–40px) | 1.0 | normal | none |

> **Mínimo absoluto de fuente: 12px.** Nunca menos.

### Reglas tipográficas
- **MAYÚSCULAS solo en** `display`, `h1`–`h3` y `eyebrow`. El texto corrido va en *sentence case*.
- **Yellowtail con pinzas:** solo para 2–4 palabras de acento (tagline, un "gracias", un destacado). Nunca para párrafos ni para títulos largos.
- **Precios** en Oswald, con números tabulares si está disponible (`font-variant-numeric: tabular-nums`). Formato chileno: `$12.990` (punto de miles, sin decimales). El `/kg` va más chico y en `humo`.
- Máximo de ancho de párrafo: ~65–70ch.

### `next/font` (recomendado, mejor performance)
```ts
// app/fonts.ts
import { Oswald, Archivo, Yellowtail } from 'next/font/google';

export const oswald = Oswald({
  subsets: ['latin'], weight: ['500', '600', '700'],
  variable: '--font-display', display: 'swap',
});
export const archivo = Archivo({
  subsets: ['latin'], weight: ['400', '500', '600'],
  variable: '--font-body', display: 'swap',
});
export const yellowtail = Yellowtail({
  subsets: ['latin'], weight: ['400'],
  variable: '--font-script', display: 'swap',
});
// en layout.tsx: <html className={`${oswald.variable} ${archivo.variable} ${yellowtail.variable}`}>
```

---

## 5. Espaciado, layout y grilla

### Escala de espaciado (rem base 16px)
`4px · 8px · 12px · 16px · 24px · 32px · 48px · 64px · 96px · 128px`
→ usa los pasos, no valores arbitrarios.

### Contenedor
- `max-width: 1280px`, centrado.
- Padding lateral: `24px` desktop, `16px` mobile.
- Secciones: padding vertical `clamp(64px, 10vw, 128px)` para dar aire.

### Breakpoints (mobile-first)
| Nombre | Min-width |
|--------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Radios
`--radius-sm: 6px` (badges, inputs chicos) · `--radius-md: 8px` (botones, inputs) · `--radius-lg: 12px` (cards, imágenes) · `--radius-pill: 999px` (pills/tags).
> Nada de bordes redondeados en bordes de un solo lado (si usas `border-left` de acento, `border-radius: 0`).

### Grillas típicas
- Catálogo de cortes: `repeat(auto-fill, minmax(240px, 1fr))`, gap 24px.
- Listado mayorista: tabla / filas densas (ver sección 12).

---

## 6. Iconografía

- **Estilo:** trazo fino y consistente. Peso `regular` por defecto; `light`/`thin` para acentos elegantes y `fill`/`bold` solo para énfasis puntual. Un solo peso base por contexto.
- **Librería:** `@phosphor-icons/react` para los íconos funcionales (más distintivo y elegante que lucide, con 6 pesos). Tamaños 16/20/24px.
- **Logos de marca** (WhatsApp, TikTok, Instagram, Facebook): Phosphor/lucide ya no traen logos de marca → usar Simple Icons (`@icons-pack/react-simple-icons`).
- **Color:** heredan `currentColor`. Por defecto `humo`; en hover/activo `hueso` o `rojo`.
- **El machete** (sección 2 y 7) es el ícono *de marca* y va como SVG propio, no de librería.
- **Regla:** un solo set funcional (Phosphor) para mantener consistencia; los logos de marca son aparte (siempre se ven como ellos mismos).

---

## 7. Motivo del machete (el sello de marca)

El machete del logo es el elemento que hace todo reconocible. Úsalo como **firma sutil**, no como decoración pesada:

- **Separador de secciones:** una línea fina `rojo-sangre` (1px) interrumpida por un pequeño machete o por un "corte" diagonal. Inspirado en la línea bajo el cleaver del logo.
- **Sello / bullet:** ícono de machete chico (16px) antes de un eyebrow o como viñeta de listas de beneficios.
- **Estados vacíos:** carrito vacío, búsqueda sin resultados → machete grande en `linea-fuerte` (tenue) + mensaje.
- **Favicon / loader:** silueta del machete.
- **Motivo "corte":** un slash diagonal (≈ -15°) como detalle en hovers o esquinas de imágenes (muy sutil).

> El cleaver vive como SVG en el componente `Logo` (variante `icon`) y en `public/cleaver.svg` — ver sección 2. **Ese cleaver es un placeholder genérico**; reemplazarlo por el real trazado del logo del cliente cuando esté disponible (sección 16). Para los usos de esta sección (separador, sello, estado vacío, favicon), reutiliza ese mismo SVG con `currentColor`.

---

## 8. Fotografía y manejo de imágenes

**La fotografía define si esto se ve elegante o no.** Dirección de arte:

- **Iluminación:** oscura y dramática, **un solo foco** (low-key). Sombras profundas.
- **Fondo:** negro, pizarra, madera oscura. Nada de fondos blancos de catálogo.
- **Props:** machete, tabla de madera, sal gruesa, romero, pimienta. Tal cual las imágenes de referencia del cliente.
- **Encuadre:** primer plano del corte, profundidad de campo corta, mucho **espacio negativo** alrededor (para poner texto encima).
- **Color:** tonos cálidos y rojos de la carne, contraste alto.

### Reglas técnicas
- Usa `next/image` siempre. Define `sizes` correctos. Formatos `webp/avif`.
- **Relaciones de aspecto consistentes:** producto `4:5` (vertical), hero `16:9` o full-bleed, banners promo `3:2`.
- Overlay de legibilidad: cuando haya texto sobre foto, usa un velo **plano** `rgba(14,14,15,0.55)` (NO degradado) o un panel sólido. *(Excepción única permitida a "sin degradados": un degradado vertical sutil `transparent → carbon` SOLO para legibilidad de texto sobre foto, si el velo plano no alcanza.)*
- **Placeholders mientras no haya fotos reales:** bloque `grafito` con borde `dashed linea-fuerte` + label en `humo-2` minúscula ("foto del corte aquí"). Honesto y prolijo; nunca stock genérico de bancos de imágenes.

---

## 9. Motion / animación

Sutil y con criterio. El movimiento debe sentirse premium, no llamativo.

- **Transiciones:** 150–250ms, `ease-out` o `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Hover de card:** `translateY(-2px)` + borde pasa a `linea-fuerte` + imagen interna `scale(1.03)`. Suave.
- **Hover de botón:** cambio de color (primario → `rojo-hover`), `active: scale(0.98)`.
- **Carga del hero:** un solo *staggered fade-up* (texto y CTA entran con `animation-delay` escalonado). Un buen load orquestado vale más que micro-animaciones por todos lados.
- **Scroll reveal:** opcional, fade-up sutil de secciones (Intersection Observer o Framer Motion `whileInView`).
- **Librería:** `framer-motion` para React/Next si se necesita orquestación.
- **Respeta `prefers-reduced-motion`:** desactiva animaciones no esenciales.
- ❌ Nada de parallax exagerado, autoplay agresivo, glows ni efectos neón.

---

## 10. Componentes

> Todos sobre fondo oscuro. Bordes con `linea`. Esquinas con los radios de la sección 5. Sin sombras decorativas.

### Botones
- **Primario:** bg `rojo`, texto `hueso`, `font-body 600`, padding `12px 22px`, `radius-md`. Hover → bg `rojo-hover`. Active → `scale(0.98)`. Focus → `--focus-ring`.
- **Secundario:** bg transparente, borde `1px linea-fuerte`, texto `hueso`. Hover → bg `grafito-2`.
- **Ghost / texto:** sin borde, texto `hueso`/`humo`, subrayado o color `rojo` en hover.
- **Tamaños:** sm (`8px 14px`), md (default), lg (`16px 28px`, para hero CTA).
- Disabled: `opacity 0.45`, sin hover.

### Inputs / formularios
- bg `grafito`, borde `1px linea`, texto `hueso`, placeholder `humo-2`, `radius-md`, altura 44px.
- Focus: borde `rojo` + `--focus-ring`.
- Labels: `eyebrow` o `small` en `humo`, arriba del campo.
- Error: borde `error`, mensaje `small` en `error` debajo.

### Badges / Tags
- **Promo:** pill, borde `1px rojo`, texto `rojo`, `eyebrow` (uppercase tracked). Variante sólida: bg `rojo`, texto `hueso`.
- **Estado:** "En stock" (`success`), "Últimas unidades" (`warning`), "Importado" / "Nacional" (`humo` o `kraft`).

### Precio
```
$12.990  /kg
└ Oswald 600, hueso, 20–28px   └ Archivo, humo, 13–14px
```
Oferta: precio actual en `rojo`, precio anterior tachado en `humo-2`.

### Card de producto (corte)
- Contenedor `grafito`, borde `linea`, `radius-lg`, padding 12px.
- Imagen arriba (`4:5`, `radius-md`), nombre (`h3` Oswald 600), corte/origen (`small` humo), precio (bloque de arriba), botón "Agregar" (primario sm) alineado a la derecha.
- Hover: comportamiento de la sección 9.

### Header / Nav
- Sticky, bg `carbon` con `border-bottom linea` (o leve blur al hacer scroll).
- Izquierda: logo (versión horizontal, aplanada). Centro/derecha: nav (`small`/`eyebrow`, hover `rojo`). Acciones: buscar, carrito (con contador en badge `rojo`), CTA WhatsApp.
- **Anuncio superior** (announcement bar): franja fina sobre el header, bg `grafito` o `rojo-sangre`, texto `caption`/`small` hueso: ej. "Despacho en frío · Envío gratis sobre $XX.XXX en [zonas]".
- Mobile: menú hamburguesa → drawer lateral `grafito-2`.

### Hero
- Full-bleed, foto moody de fondo con velo plano para legibilidad.
- Eyebrow + `display` (título grande) + subtítulo `body-lg` humo + 2 CTAs (primario "Ver cortes" / secundario "Pedir por WhatsApp").
- Mucho espacio negativo. Acento script Yellowtail opcional en una palabra.

### Sección "4 formas de comprar" (los sectores)
- 3–4 cards: Carnicería, Por Mayor, Promos, Almacén. Cada una: ícono lucide (o machete), `h3`, descripción corta `small`, link/CTA. Demuestra que entendemos el negocio del cliente.

### Bloque B2B / Mayorista
- Tono más sobrio (ver sección 12). Tabla de lista de precios o card "Solicita la lista de precios" + CTA. Campos: producto, formato (caja/kg), precio mayorista (puede requerir login).

### Bloque Promo / TikTok
- Más bold y rojo. Card de promo destacada de la semana (ej. "Pack Parrillero 5 kg"), precio grande, badge PROMO, CTA. Puede llevar un contador o "envío gratis".

### Despacho / Cómo funciona
- 3 pasos con íconos: Elegí tus cortes → Pagá en línea → Recibí en frío. `eyebrow` + `h3` + `small` por paso.

### Sellos de confianza
- Fila de 3–4 ítems: Cadena de frío · Frescura garantizada · Origen trazable · Retiro o despacho. Ícono + label. Refuerza el posicionamiento.

### Footer
- bg `carbon`, borde superior `linea`. Logo, dirección (Río Ñuble 824, Padre Hurtado), horario, teléfono/WhatsApp, redes (IG, TikTok, FB), medios de pago (Flow, Webpay, transferencia), links legales.

### Carrito (drawer)
- Panel lateral `grafito-2`, lista de ítems (mini-card: foto, nombre, cantidad/peso, precio, quitar), subtotal, CTA "Ir a pagar" (primario lg). Estado vacío con machete tenue.

---

## 11. Voz y microcopy

- **Tono:** directo, chileno, cercano y **confiado**. Sin exceso de signos ni mayúsculas gritando.
- **CTAs:** verbos claros — "Ver cortes", "Agregar", "Pedir ahora", "Solicitar lista de precios".
- **Confianza:** mensajes que hablen de frescura, cadena de frío, origen. Ej.: "Del local a tu mesa, siempre en frío."
- **Estados vacíos:** con personalidad pero útiles. Ej. carrito vacío: "Tu carro está vacío. Vamos por unos buenos cortes."
- Evita el relleno y los anglicismos innecesarios.

---

## 12. Cómo flexa el diseño por capa

El sistema es uno solo; cambia la **intensidad y la densidad**:

| | B2C (base) | B2B / Mayorista | Promos / TikTok |
|---|---|---|---|
| **Rojo** | acento medido | mínimo, casi gris | más presente, más saturado |
| **Densidad** | aireada | densa, tabular, eficiente | dinámica, foco en una oferta |
| **Tipografía** | jerarquía normal | más chica, funcional | títulos más grandes |
| **Foco** | descubrir y comprar | cotizar rápido, volumen | conversión inmediata de la promo |
| **Componentes clave** | catálogo, card de producto | tabla de precios, cotización | card de promo, contador, packs |

> No conviertas el mayorista en un e-commerce idéntico al retail ni le metas la energía de TikTok. Y la capa de promos puede ser más "loud" sin romper la paleta.

---

## 13. Accesibilidad

- Contraste AA mínimo en todo texto (ojo con `humo`/`humo-2` sobre `carbon`).
- Focus visible siempre (`--focus-ring`), nunca `outline: none` sin reemplazo.
- Navegación por teclado completa (drawer, carrito, menús).
- `alt` descriptivo en todas las imágenes de producto.
- Áreas táctiles ≥ 44px.
- Respeta `prefers-reduced-motion`.
- Jerarquía semántica de headings correcta (`h1` único por página, etc.).

---

## 14. Qué NO hacer (anti-patrones)

- ❌ Replicar el **3D / bevel / gloss** del logo en la UI.
- ❌ Usar **rojo como fondo** de secciones o cards completas.
- ❌ **Degradados, sombras decorativas, glow, neón.** (Única excepción: velo de legibilidad sobre fotos.)
- ❌ **Inter, Roboto, Arial** o fuentes de sistema como tipografía principal.
- ❌ **Stock genérico** de carne de bancos de imágenes.
- ❌ Recargar de **texturas de madera/papel** (rústico = detalle, no fondo).
- ❌ **Yellowtail** en párrafos o títulos largos.
- ❌ Light mode o toggle de tema (salvo que se pida).
- ❌ Apretujar contenido: el aire es parte del diseño.

---

## 15. Stack y configuración (puente diseño → código)

Asumido: **Next.js (App Router) + TypeScript + Tailwind CSS**.

### `tailwind.config.ts` — extensión del theme
```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#0E0E0F',
        grafito: { DEFAULT: '#18181B', 2: '#232327' },
        rojo: { DEFAULT: '#D81F26', hover: '#B81A20', sangre: '#8C1014' },
        hueso: '#F4F0E9',
        humo: { DEFAULT: '#A39E96', 2: '#6E6A63' },
        kraft: '#B07D52',
        success: '#57B894',
        warning: '#E0A53B',
        error: '#FF5A5A',
      },
      borderColor: {
        linea: 'rgba(244,240,233,0.10)',
        'linea-fuerte': 'rgba(244,240,233,0.22)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      borderRadius: { sm: '6px', md: '8px', lg: '12px' },
      maxWidth: { container: '1280px' },
    },
  },
  plugins: [],
} satisfies Config;
```

### Notas de implementación
- Body por defecto: `bg-carbon text-hueso font-body`.
- Títulos: clase utilitaria `font-display uppercase tracking-[0.01em]`.
- Define las clases de la escala tipográfica (sección 4) como componentes/utilidades reutilizables (p. ej. un componente `<Heading>` o clases `@layer components`).
- Precios: `font-display tabular-nums`.
- Sitio **dark-only**: no configures variantes `dark:`.

---

## 16. Pendientes que dependen del cliente (afectan el diseño)

Confirmar con el cliente antes o durante el build:
- [ ] **¿Tiene fotografía profesional propia de sus cortes?** (Define si el look se sostiene.)
- [ ] SVG vectorial del **cleaver real** del logo, para reemplazar el placeholder del componente `Logo` y de `public/cleaver.svg` (ver sección 2). El wordmark NO se necesita como imagen: se reconstruye tipografiado.
- [ ] WhatsApp oficial de ventas (hay 3 números dando vueltas).
- [ ] Zonas reales de despacho y monto de envío gratis (para la announcement bar).
- [ ] Mayorista: ¿lista de precios pública o tras login/cotización?
- [ ] Promos: ¿landings dedicadas o una sección de destacados?
- [ ] Medios de pago a integrar (Flow / Webpay / transferencia).

---

*Fin del documento. Mantener este `design.md` actualizado a medida que evoluciona el diseño.*
