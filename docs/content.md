# Contenido — catálogo, datos y copy

> **Esta es la fuente de TODO el contenido del sitio.** Prohibido lorem ipsum y precios inventados redondos. Lo específico se ve humano; lo genérico se ve IA. Voz: **chilena, directa, cálida y confiada**. Texto en *sentence case* (los títulos en mayúsculas los maneja el CSS).

## Sobre las imágenes (importante)

**Por ahora NO hay fotos.** Cada producto lleva `image: null` y se muestra con el componente `ProductImage`, que renderiza un placeholder de marca **"Próximamente"** (ver `docs/conventions.md`). Cuando el cliente entregue las fotos reales, se llena el campo `image` y listo — sin tocar las cards. **Nunca usar fotos de carne generadas con IA.**

## Datos del negocio

- **Nombre:** Carnes El Puro Bueno
- **Eslogan:** Marcando la Diferencia
- **Dirección:** Río Ñuble 824, Padre Hurtado, Región Metropolitana
- **Rating real:** 4.2 ★ · 66 opiniones en Google
- **Instagram:** @carnes.elpurobueno (3.6K+ seguidores) · **TikTok** y **Facebook** activos
- **WhatsApp / pedidos:** +56 9 4056 6143 — ⚠️ *confirmar con el cliente cuál es el oficial (hay 3 números dando vueltas)*
- **Horario:** ⚠️ *TBD — confirmar con el cliente.* Placeholder provisorio: Lun a Sáb 9:00–19:00, Dom 9:00–14:00
- **Zonas de despacho:** Padre Hurtado, Talagante y Santiago — ⚠️ *confirmar cobertura y monto de envío gratis (usar $50.000 como provisorio)*

## Categorías

`Vacuno` · `Cerdo` · `Pollo` · `Cecinas` · `Parrilla` · `Abarrotes`

## Catálogo (data real)

Precios por kilo en CLP, creíbles para una carnicería chilena. Listos para `lib/products.ts`:

```ts
// lib/products.ts
export type Category = "vacuno" | "cerdo" | "pollo" | "cecinas" | "parrilla" | "abarrotes";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;        // CLP por unidad
  unit: "kg" | "un" | "bandeja";
  origin?: "Nacional" | "Importado";
  badge?: string;       // ej. "Más vendido", "Premium"
  description: string;
  image: string | null; // null → placeholder "Próximamente"
};

export const products: Product[] = [
  // Vacuno
  { slug: "lomo-vetado", name: "Lomo Vetado", category: "vacuno", price: 12990, unit: "kg", origin: "Nacional", badge: "Más vendido", description: "El rey de la parrilla. Bien marmoleado, jugoso y con sabor de verdad.", image: null },
  { slug: "lomo-liso", name: "Lomo Liso", category: "vacuno", price: 11990, unit: "kg", origin: "Importado", description: "Corte magro y parejo, ideal para la plancha o un buen bife.", image: null },
  { slug: "asado-de-tira", name: "Asado de Tira", category: "vacuno", price: 9990, unit: "kg", origin: "Nacional", description: "Clásico para el asado lento. Con hueso, queda una maravilla.", image: null },
  { slug: "entrana", name: "Entraña", category: "vacuno", price: 13990, unit: "kg", origin: "Nacional", badge: "Premium", description: "Fina, sabrosa y rápida a la parrilla. La que nunca falla.", image: null },
  { slug: "plateada", name: "Plateada", category: "vacuno", price: 8990, unit: "kg", origin: "Nacional", description: "Perfecta al horno o desmenuzada. Cocción lenta, resultado redondo.", image: null },
  { slug: "punta-picana", name: "Punta Picana", category: "vacuno", price: 10990, unit: "kg", origin: "Nacional", description: "Triángulo de sabor. Excelente a la parrilla con su capa de grasa.", image: null },
  { slug: "posta-negra", name: "Posta Negra", category: "vacuno", price: 9490, unit: "kg", origin: "Nacional", description: "Magra y versátil. Buena para bistec, cazuela o al jugo.", image: null },
  { slug: "carne-molida", name: "Carne Molida", category: "vacuno", price: 6990, unit: "kg", origin: "Nacional", badge: "Más vendido", description: "Molida del día para hamburguesas, tallarines o lo que se te ocurra.", image: null },

  // Cerdo
  { slug: "pulpa-de-cerdo", name: "Pulpa de Cerdo", category: "cerdo", price: 5990, unit: "kg", origin: "Nacional", description: "Versátil y económica. Para el horno, la olla o cortar en bistec.", image: null },
  { slug: "costillar-de-cerdo", name: "Costillar de Cerdo", category: "cerdo", price: 6490, unit: "kg", origin: "Nacional", description: "Para los amantes del costillar. A la parrilla o al horno, infaltable.", image: null },
  { slug: "chuleta-de-cerdo", name: "Chuleta de Cerdo", category: "cerdo", price: 5490, unit: "kg", origin: "Nacional", description: "Con hueso, jugosa, lista para la plancha o el sartén.", image: null },

  // Pollo
  { slug: "pechuga-de-pollo", name: "Pechuga de Pollo", category: "pollo", price: 5490, unit: "kg", origin: "Nacional", description: "Sin hueso ni piel. La base sana de cualquier semana.", image: null },
  { slug: "trutro-de-pollo", name: "Trutro de Pollo", category: "pollo", price: 3990, unit: "kg", origin: "Nacional", description: "Jugoso y rendidor. Al horno con papas no falla.", image: null },
  { slug: "pollo-entero", name: "Pollo Entero", category: "pollo", price: 3490, unit: "kg", origin: "Nacional", description: "El de toda la vida. Para el asado del domingo.", image: null },

  // Cecinas
  { slug: "longaniza", name: "Longaniza Artesanal", category: "cecinas", price: 6990, unit: "kg", origin: "Nacional", description: "Receta de la casa. Para el choripán o la parrilla.", image: null },
  { slug: "chorizo-parrillero", name: "Chorizo Parrillero", category: "cecinas", price: 7490, unit: "kg", origin: "Nacional", description: "Grueso, sabroso y hecho para la brasa.", image: null },
  { slug: "tocino", name: "Tocino Ahumado", category: "cecinas", price: 8990, unit: "kg", origin: "Nacional", description: "Ahumado de verdad. Le cambia la vida a cualquier plato.", image: null },

  // Abarrotes (almacén)
  { slug: "carbon-5kg", name: "Carbón de Espino 5 kg", category: "abarrotes", price: 4990, unit: "un", description: "Para que el asado prenda parejo y dure.", image: null },
  { slug: "sal-de-mar", name: "Sal de Mar Gruesa", category: "abarrotes", price: 2490, unit: "un", description: "La sal justa para la carne. Grano grueso.", image: null },
  { slug: "pan-hamburguesa", name: "Pan de Hamburguesa (6 un)", category: "abarrotes", price: 2990, unit: "un", description: "Pack de 6, suaves, para acompañar tu molida.", image: null },
];
```

## Promos (packs reales — capa TikTok)

Basados en las promos que ya hacen (packs de $40.000 con envío gratis en Santiago). Listos para `lib/promos.ts`:

```ts
// lib/promos.ts
export type Promo = {
  slug: string;
  name: string;
  price: number;
  freeShipping: boolean;
  badge?: string;
  includes: string[];
  image: string | null;
};

export const promos: Promo[] = [
  { slug: "pack-parrillero", name: "Pack Parrillero", price: 40000, freeShipping: true, badge: "El más pedido", includes: ["1 kg Lomo Vetado", "1 kg Asado de Tira", "1 kg Longaniza", "1 kg Chorizo Parrillero", "1 kg Punta Picana"], image: null },
  { slug: "pack-familiar", name: "Pack Familiar", price: 40000, freeShipping: true, includes: ["1 kg Bistec", "1 kg Carne de Cazuela", "1 kg Carne Molida", "1 kg Chuletas", "1 kg Pechuga de Pollo"], image: null },
  { slug: "pack-asado", name: "Pack Asado", price: 40000, freeShipping: true, includes: ["1.5 kg Asado de Tira", "1 kg Plateada", "1 kg Longaniza", "0.5 kg Chorizo"], image: null },
];
```

## Copy por sección (voz chilena)

**Hero** (elige uno o combínalos):
- Título: "El corte que marca la diferencia."
- Bajada: "Carne fresca, cadena de frío y despacho a tu zona. Del local en Padre Hurtado a tu mesa."
- CTAs: "Ver cortes" · "Pedir por WhatsApp"

**Cuatro formas de comprar:**
- Carnicería: "Tus cortes favoritos, al detalle." 
- Por Mayor: "Precios por caja para tu negocio."
- Promos: "Packs de la semana con envío gratis."
- Almacén: "Todo para el asado, en un solo carro."

**Sellos de confianza:**
- "Cadena de frío" — "Del frigorífico a tu puerta sin cortar la cadena."
- "Frescura garantizada" — "Cortamos el día, no la semana."
- "Origen trazable" — "Sabes de dónde viene tu carne."
- "Retiro o despacho" — "Pasas a buscarlo o te lo llevamos."

**Cómo funciona (3 pasos):**
1. "Elegí tus cortes" — "Arma tu pedido desde el catálogo."
2. "Pagá en línea" — "Webpay, transferencia o como te acomode."
3. "Recibí en frío" — "Despacho refrigerado a tu zona."

**Bloque B2B:** 
- Título: "¿Restaurante, casino o negocio?"
- Texto: "Precios por mayor, pedido por caja y despacho coordinado. Pídenos la lista y conversemos."
- CTA: "Solicitar lista de precios"

**Nosotros (borrador, ajustable):**
"En Carnes El Puro Bueno llevamos la mejor carne hasta tu hogar. Desde nuestro local en Padre Hurtado seleccionamos cortes frescos y de calidad, cuidando la cadena de frío de principio a fin. No vendemos cualquier cosa: vendemos la que nos comeríamos nosotros. Eso es marcar la diferencia."

**Microcopy y estados:**
- Botón agregar: "Agregar"
- Toast al agregar: "Agregado al carro 🔥" (sin emoji si se prefiere: "Agregado al carro")
- Carrito vacío: "Tu carro está vacío. Vamos por unos buenos cortes."
- Sin resultados: "No encontramos ese corte. Prueba con otra categoría."
- Placeholder de imagen: "Próximamente"
- 404: "Esta página se fue a la parrilla. Volvamos al inicio."
- Envío gratis: "Envío gratis sobre $50.000"

**Footer:**
- Tagline: "Marcando la Diferencia"
- Columnas: Tienda (Catálogo, Promos, Mayorista) · Ayuda (Despacho, Contacto, Nosotros) · Contacto (dirección, WhatsApp, horario) · Redes (IG, TikTok, Facebook).
- Medios de pago: Webpay · Flow · Transferencia (logos estáticos).

## Checkout / formulario (labels y lógica)

Es maqueta: el formulario es **solo UI**, no procesa pagos ni envía nada a un servidor.

**Tipo de entrega** (obligatorio): Retiro en tienda · Delivery
- Retiro en tienda → mostrar: "Río Ñuble 824, Padre Hurtado" + horario.
- Delivery → campos: Calle · Número · Comuna · Referencia (opcional). Nota: "Despacho a Padre Hurtado, Talagante y Santiago. Envío gratis sobre $50.000."

**Datos del cliente:** Nombre · Teléfono · Email

**Documento:** Boleta (por defecto) · Factura
- Factura → campos: RUT · Razón social · Giro · Dirección comercial

**Resumen del pedido:** ítems + cantidad + precio · subtotal · envío (si es delivery) · total (formato CLP).

**Método de pago — CONDICIONAL:**
- Retiro en tienda → **Efectivo** o **Webpay**
- Delivery → **solo Webpay**

**Copy:**
- Botón en el carrito: "Proceder al pago"
- Botón en checkout: "Confirmar pedido"
- Nota bajo Webpay (maqueta): "Pago simulado — esto es una maqueta de demostración."
- Confirmación: "¡Pedido recibido! Te contactamos para coordinar la entrega."

## Reseñas (placeholder — reemplazar por las reales de Google)

> ⚠️ Estas son de muestra para la maqueta. Usar el rating real (**4.2★, 66 opiniones**) y, cuando se pueda, copiar reseñas reales de Google. No presentar estas como verídicas.

- "Pedí el pack parrillero y llegó todo en frío y bien envuelto. La carne, de primera." — Cliente de muestra
- "Buena atención y precios. El lomo vetado es el mejor del sector." — Cliente de muestra
- "Compro seguido por WhatsApp, ahora con la web va a ser más fácil todavía." — Cliente de muestra
