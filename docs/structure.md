# Estructura — páginas, rutas y checklist

> Una maqueta **completa** muestra los flujos reales, no un solo home bonito. Acá está qué construir. El contenido de cada sección sale de `docs/content.md`; el estilo, de `docs/design.md`.

## Las 3 capas (recordatorio)

El cliente habla de "4 sectores", pero se agrupan en 3 capas que conviven en el mismo sitio:

1. **B2C — Carnicería + Almacén** → la tienda minorista. Catálogo de cortes + abarrotes en un mismo carrito. Es el corazón.
2. **B2B — Carnes por Mayor** → venta por caja/volumen. Más sobrio y eficiente. Lista de precios / cotización (UI, sin backend).
3. **Promos (TikTok)** → capa de marketing. Packs destacados, más bold y con más rojo.

Se sienten **distintas pero cohesivas** (misma paleta y tipografía; cambia la intensidad y la densidad).

## Rutas (App Router)

| Ruta | Página | Capa |
|------|--------|------|
| `/` | Home | todas |
| `/catalogo` | Catálogo completo (categorías + filtros) | B2C |
| `/producto/[slug]` | Ficha de producto | B2C |
| `/mayorista` | Carnes por mayor (B2B) | B2B |
| `/promos` | Promociones / packs | Promos |
| `/nosotros` | Nosotros | todas |
| `/contacto` | Contacto y despacho | todas |
| `/checkout` | Checkout (estático, solo UI — sin pago real) | B2C |
| `not-found.tsx` | 404 con personalidad | — |

El **carrito es un drawer global** (shadcn `Sheet`), disponible desde cualquier página. El filtro por categoría puede vivir dentro de `/catalogo` (no necesita ruta propia).

## Secciones por página

### Home (la vitrina — evita el esqueleto genérico)
> El tell visual #1 de IA/plantilla: hero centrado + 2 botones → 3 tarjetas con ícono → testimonios → franja CTA → footer. **Rómpelo:** punto focal real en el hero (no el centrado de siempre), asimetría, ritmos distintos por sección, el machete como hilo conductor entre bloques.

1. Announcement bar (despacho en frío · envío gratis sobre monto).
2. Header / nav (componente `Logo` horizontal, buscador, carrito con contador, CTA WhatsApp).
3. **Hero** — idea fuerte + punto focal, no centrado genérico. CTAs: "Ver cortes" / "Pedir por WhatsApp".
4. **Cuatro formas de comprar** — los sectores: Carnicería, Por Mayor, Promos, Almacén (íconos + descripción + link). Demuestra que entendemos su negocio.
5. **Cortes destacados** — carousel o grid de `ProductCard` (con `ProductImage` placeholder).
6. **Promo de la semana** — pack destacado, energía más bold (capa TikTok).
7. **Categorías** — entrada visual a Vacuno / Cerdo / Pollo / Cecinas / Parrilla / Abarrotes.
8. **Bloque B2B** — "¿Restaurante o negocio? Precios por mayor" + CTA.
9. **Cómo funciona / Despacho** — 3 pasos: Elegí tus cortes → Pagá en línea → Recibí en frío (el pago es estático en la maqueta).
10. **Sellos de confianza** — cadena de frío, frescura, origen, retiro/despacho.
11. **Reseñas** — usar el rating real (4.2★, 66 opiniones) + testimonios.
12. Footer.

### Catálogo (`/catalogo`)
Header de sección · filtros (categoría + ordenar por precio) · contador de resultados · grid de `ProductCard` · **estado "sin resultados"** · paginación o scroll.

### Ficha de producto (`/producto/[slug]`)
`ProductImage` (placeholder) · nombre · precio `/kg` · badge origen (Nacional/Importado) · descripción · selector de cantidad/peso · botón "Agregar" (dispara toast) · info de despacho · **cortes relacionados**.

### Mayorista (`/mayorista`)
Hero sobrio · propuesta B2B · lista/tabla de precios por mayor (o "Solicita la lista de precios") · pedido mínimo · **formulario de cotización (solo UI)** · beneficios (volumen, frecuencia, factura).

### Promos (`/promos`)
Grid de packs reales (ver `content.md`) · badges "PROMO" / "envío gratis" · precio grande · energía más bold · CTA por pack.

### Nosotros (`/nosotros`)
Historia de marca · "Marcando la Diferencia" · el local de Padre Hurtado · valores (frescura, origen, cadena de frío) · foto del local/equipo (placeholder por ahora).

### Contacto y despacho (`/contacto`)
Dirección (Río Ñuble 824, Padre Hurtado) · mapa (estático/placeholder) · horario · WhatsApp/teléfono · zonas de despacho · **formulario de contacto (solo UI)**.

### Carrito (drawer `Sheet`) — funcional
El carrito **se usa de verdad** (estado de cliente): agregar desde cualquier card o ficha, cambiar cantidad (±), quitar ítems y ver el subtotal en vivo. Persiste mientras navegas entre páginas.
- Ítems: mini `ProductImage`, nombre, precio, cantidad ±, quitar.
- Subtotal en vivo (formato CLP).
- Botón **"Proceder al pago"** → lleva a `/checkout`.
- **Estado vacío** con el machete + copy con personalidad.

### Checkout (`/checkout`) — formulario de pedido (solo UI)
Flujo completo de checkout, pero **sin procesar pagos reales** (es maqueta). Bloques en orden:

1. **Tipo de entrega** (obligatorio, selección):
   - **Retiro en tienda** → muestra dirección y horario del local (Río Ñuble 824, Padre Hurtado).
   - **Delivery** → muestra campos de dirección (calle, número, comuna, referencia) + nota de zonas y costo/envío gratis.
2. **Datos del cliente:** nombre, teléfono, email.
3. **Tipo de documento:**
   - **Boleta** (por defecto) → sin datos extra.
   - **Factura** → despliega campos de empresa: RUT, razón social, giro, dirección comercial.
4. **Resumen del pedido:** ítems con cantidad y precio, subtotal, costo de envío (si es delivery) y total. Formato CLP.
5. **Método de pago — CONDICIONAL según la entrega:**
   - Si **Retiro en tienda** → **Efectivo** o **Webpay**.
   - Si **Delivery** → **solo Webpay**.
   - (Webpay es un botón simulado; "Efectivo" solo registra la elección. **Nada se procesa de verdad.**)
6. **Confirmar pedido** → pantalla/toast de confirmación, sin backend.

**Lógica clave (estado de cliente):** al cambiar la entrega a *Delivery*, el método de pago se limita a Webpay automáticamente (oculta/deshabilita Efectivo). Al elegir *Factura*, aparecen los campos de empresa. Al volver a *Retiro*, reaparece Efectivo. Sin validación real ni envío a ningún servidor.

## Checklist "maqueta terminada"

- [ ] Todas las rutas existen y navegan entre sí.
- [ ] **Mobile-first verificado** en cada página (≤375px) antes que desktop.
- [ ] Header sticky + menú móvil (`Sheet`) funcionando.
- [ ] Carrito **funcional**: agregar, quitar, cambiar cantidad, subtotal en vivo, persiste entre páginas, **estado vacío**.
- [ ] Checkout: tipo de entrega (retiro/delivery), datos, boleta/factura (con campos de empresa), resumen, y **pago condicional** (retiro = efectivo o Webpay; delivery = solo Webpay). Webpay simulado, sin procesar.
- [ ] Catálogo con filtros, orden y **"sin resultados"**.
- [ ] Ficha de producto completa + cortes relacionados.
- [ ] `ProductImage` con placeholder "Próximamente" en **todas** las cards y fichas.
- [ ] Toasts (`sonner`) en acciones (agregar al carro, enviar formulario).
- [ ] Estados: loading (skeleton), hover, focus, vacío, 404 con personalidad.
- [ ] Contenido **100% real** desde `content.md` (cero lorem, cero precios inventados).
- [ ] Sellos de confianza + reseñas con el rating real.
- [ ] Footer completo: dirección, horario, redes, medios de pago.
- [ ] Favicon (machete) y metadatos básicos.
- [ ] Animaciones sutiles (`motion`) sin exagerar; respeta `prefers-reduced-motion`.
- [ ] Las 3 capas se sienten **distintas pero cohesivas**.
- [ ] Una sola voz visual y de copy en todo el sitio (sin patchwork).
