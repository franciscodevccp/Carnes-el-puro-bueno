"use client";

import { Icon, type IconifyIcon } from "@iconify/react";

/**
 * Renderiza un ícono de Iconify (set game-icons) a partir de su data offline.
 * La data se extrae en el server component (Categories) para NO bundlear el set
 * completo (6 MB) al cliente. Hereda el color con currentColor.
 */
export function CategoryIcon({
  icon,
  className,
}: {
  icon: IconifyIcon;
  className?: string;
}) {
  return <Icon icon={icon} className={className} aria-hidden />;
}
