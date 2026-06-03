# CLAUDE.md — Carnes El Puro Bueno (maqueta web)

> Este archivo es el **índice** del proyecto. Léelo siempre. Antes de tocar una parte, abre el `.md` que corresponde (abajo). **No inventes contenido**: todo el texto, los productos y los precios viven en `docs/content.md`.

## Qué es esto

Maqueta web para **Carnes El Puro Bueno**, una carnicería de Padre Hurtado (RM) con venta minorista, por mayor y despacho a domicilio. Hoy venden todo por WhatsApp; el sitio existe para que la web venda sola.

**Es una MAQUETA visual.** Sin backend, sin base de datos, sin pasarela de pago, sin autenticación. Toda la data está hardcodeada en `lib/`. El objetivo es que se vea **profesional, atractiva y nada genérica** (que no parezca hecha con IA).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (config en `@theme`, no `tailwind.config.ts`) · shadcn/ui (Radix) · `@phosphor-icons/react` · `@icons-pack/react-simple-icons` · `motion` · pnpm.

## Documentos del proyecto (lee el que corresponda)

| Archivo | Qué contiene | Léelo antes de… |
|---------|--------------|-----------------|
| `docs/design.md` | Sistema de diseño: concepto "Carbón y Brasa", tokens de color, tipografía, **logo**, componentes, motion, fotografía. | tocar cualquier UI, estilo o componente visual |
| `docs/structure.md` | Mapa de páginas y rutas, secciones de cada página, las 3 capas, y el **checklist de "maqueta terminada"**. | crear páginas o decidir qué construir |
| `docs/content.md` | **Catálogo real** (cortes, precios en CLP, categorías), promos reales, datos del negocio y **copy con voz chilena**. | escribir cualquier texto, producto o precio |
| `docs/conventions.md` | Convenciones de código: estructura de carpetas, mobile-first, dark-only, estados obligatorios y el componente `ProductImage`. | escribir componentes o estructurar el código |

## Reglas de oro (no negociables)

1. **Es maqueta:** NO backend, NO base de datos, NO pagos reales, NO auth. La data viene de `lib/`. El **carrito es funcional** (estado de cliente: agregar/quitar/cantidad/subtotal) y hay un **checkout** (formulario con tipo de entrega, boleta/factura, resumen y **pago condicional**: retiro = efectivo o Webpay, delivery = solo Webpay). Pero **nada se procesa de verdad** — Webpay es simulado. Detalle en `docs/structure.md`.
2. **Contenido real siempre.** Todo sale de `docs/content.md`. **Cero lorem ipsum, cero precios inventados redondos** (`$XX`). Lo genérico se ve IA; lo específico se ve humano.
3. **Imágenes de producto = placeholder "Próximamente".** Por ahora NO hay fotos. Las cards usan el componente `ProductImage` con un placeholder de marca (machete + "Próximamente"). **NUNCA fotos de carne generadas con IA.**
4. **Logo:** usar el componente `Logo` (tipografiado + SVG), **nunca la imagen 3D/PNG del cliente** en la UI.
5. **Íconos:** `@phosphor-icons/react` para funcionales (un solo peso base por contexto), Simple Icons para logos de marca, y el machete custom como sello. No mezclar sets funcionales.
6. **Estética "Carbón y Brasa":** negro domina, rojo de acento (5–10%), tipografía condensada, **plano** (sin 3D, sombras decorativas ni degradados). El detalle premium lo da el espacio y (a futuro) la foto.
7. **Mobile-first.** Su público viene de TikTok e Instagram → mayoría móvil. Si se ve mal en el teléfono, está mal hecho. Probar en ≤375px.
8. **Dark-only.** No hay light mode ni theme toggle. No uses `next-themes` ni variantes `dark:`.
9. **Implementa los estados, no solo la pantalla feliz:** vacío, loading, hover, focus, "sin resultados" y un 404 con personalidad.
10. **Cohesión.** Una sola voz en lo visual, el copy, el movimiento y el layout. Las 3 capas (retail / mayorista / promos) se sienten distintas pero del mismo mundo.

## Antes de empezar

Lee `docs/design.md` + `docs/conventions.md` antes de escribir código, y `docs/structure.md` + `docs/content.md` antes de construir páginas. Si algo no está definido, sigue los principios de esos archivos y mantén la coherencia — no rellenes con genérico.
