import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

// Estilo base de inputs/selects/textarea (design.md §10).
export const inputClassName =
  "h-11 w-full rounded-md border border-linea bg-grafito px-3 text-sm text-hueso transition-colors placeholder:text-humo-2 focus-visible:border-rojo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rojo/40 disabled:cursor-not-allowed disabled:opacity-45";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputClassName, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(inputClassName, "h-auto min-h-24 py-2.5", className)}
      {...props}
    />
  );
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(inputClassName, "appearance-none", className)} {...props} />
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-humo">
        {label}
        {required && <span className="text-rojo"> *</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-humo-2">{hint}</p>}
    </div>
  );
}

/** Tarjeta seleccionable para grupos de opciones (entrega, pago, documento). */
export function RadioCard({
  checked,
  title,
  description,
  icon,
  disabled,
  onSelect,
}: {
  checked: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={checked}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo",
        checked
          ? "border-rojo bg-rojo-sangre/10"
          : "border-linea bg-grafito hover:border-linea-fuerte",
        disabled && "cursor-not-allowed opacity-45 hover:border-linea"
      )}
    >
      {icon && (
        <span className={cn("mt-0.5 shrink-0", checked ? "text-rojo" : "text-humo")}>
          {icon}
        </span>
      )}
      <span className="flex flex-col gap-0.5">
        <span className="font-display text-sm uppercase tracking-[0.01em] text-hueso">
          {title}
        </span>
        {description && <span className="text-xs text-humo">{description}</span>}
      </span>
      <span
        className={cn(
          "ml-auto mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border",
          checked ? "border-rojo" : "border-linea-fuerte"
        )}
      >
        {checked && <span className="size-2 rounded-full bg-rojo" />}
      </span>
    </button>
  );
}
