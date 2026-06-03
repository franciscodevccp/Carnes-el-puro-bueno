import type { ReactNode } from "react";

import { StaggerGroup, StaggerItem } from "@/components/motion";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

/** Encabezado consistente para las páginas internas, con entrada escalonada. */
export function PageHeader({ eyebrow, title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="border-b border-linea">
      <StaggerGroup trigger="mount" className="site-container py-12 sm:py-16">
        {eyebrow && (
          <StaggerItem>
            <p className="eyebrow text-rojo">{eyebrow}</p>
          </StaggerItem>
        )}
        <StaggerItem className={eyebrow ? "mt-3" : undefined}>
          <h1 className="text-h1 text-hueso">{title}</h1>
        </StaggerItem>
        {subtitle && (
          <StaggerItem className="mt-4">
            <p className="max-w-2xl text-pretty text-humo">{subtitle}</p>
          </StaggerItem>
        )}
        {children && <StaggerItem className="mt-4">{children}</StaggerItem>}
      </StaggerGroup>
    </section>
  );
}
