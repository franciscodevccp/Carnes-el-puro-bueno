// Datos del negocio — fuente: docs/content.md.
// ⚠️ Varios valores son PROVISORIOS (TBD) hasta confirmar con el cliente.

export const site = {
  name: "Carnes El Puro Bueno",
  tagline: "Marcando la Diferencia",
  address: "Río Ñuble 824, Padre Hurtado, Región Metropolitana",
  addressShort: "Río Ñuble 824, Padre Hurtado",
  // ⚠️ provisorio — hay 3 números dando vueltas; confirmar el oficial.
  whatsapp: { display: "+56 9 4056 6143", e164: "56940566143" },
  // ⚠️ provisorio — confirmar horario real.
  hours: "Lun a Sáb 9:00–19:00 · Dom 9:00–14:00",
  rating: { score: 4.2, count: 66 },
  // ⚠️ provisorio — confirmar cobertura y monto de envío gratis.
  shipping: {
    zones: ["Padre Hurtado", "Talagante", "Santiago"],
    freeOver: 50000,
    // ⚠️ provisorio — costo de despacho cuando el pedido no alcanza el envío gratis.
    fee: 3990,
  },
  social: {
    // IG confirmado en content.md; URLs de TikTok/FB son provisorias (derivadas del handle).
    instagram: { handle: "@carnes.elpurobueno", url: "https://instagram.com/carnes.elpurobueno" },
    tiktok: { handle: "@carnes.elpurobueno", url: "https://tiktok.com/@carnes.elpurobueno" },
    facebook: { handle: "Carnes El Puro Bueno", url: "https://facebook.com/carnes.elpurobueno" },
  },
  maps: {
    // Ficha del negocio en Google Maps (la entregó el cliente).
    placeUrl:
      "https://www.google.com/maps/place/Carnes+El+Puro+Bueno/data=!4m2!3m1!1s0x0:0x74bc11cea535653f",
    // Embed sin API key (mapa interactivo).
    embedUrl:
      "https://www.google.com/maps?q=Carnes+El+Puro+Bueno,+R%C3%ADo+%C3%91uble+824,+Padre+Hurtado&output=embed",
  },
} as const;

/** Link a WhatsApp con texto opcional prellenado. */
export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp.e164}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
