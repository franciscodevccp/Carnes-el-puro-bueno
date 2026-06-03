"use client";

import { CaretDown } from "@phosphor-icons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

/** Dropdown de selección con el estilo del sitio (reemplaza al <select> nativo). */
export function SelectMenu({
  value,
  onValueChange,
  options,
  align = "start",
  ariaLabel,
  className,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  align?: "start" | "center" | "end";
  ariaLabel?: string;
  className?: string;
}) {
  const current = options.find((o) => o.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className={cn(
          "inline-flex h-10 items-center justify-between gap-2 rounded-md border border-linea bg-grafito px-3 text-sm text-hueso transition-colors hover:border-linea-fuerte focus-visible:border-rojo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rojo/40 data-open:border-rojo",
          className
        )}
      >
        <span>{current?.label ?? "Selecciona…"}</span>
        <CaretDown size={16} className="text-humo" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-auto min-w-[220px]">
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((o) => (
            <DropdownMenuRadioItem key={o.value} value={o.value}>
              {o.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
