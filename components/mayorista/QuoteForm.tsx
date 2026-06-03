"use client";

import { type FormEvent, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { toast } from "sonner";

import { Field, Input, Textarea } from "@/components/form";
import { Button } from "@/components/ui/button";

export function QuoteForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-linea bg-grafito p-8 text-center">
        <CheckCircle size={44} weight="light" className="text-success" />
        <p className="font-display text-lg uppercase tracking-[0.01em] text-hueso">
          ¡Solicitud enviada!
        </p>
        <p className="max-w-xs text-sm text-humo">
          Te contactamos con la lista de precios por mayor a la brevedad.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setSent(false)}>
          Enviar otra
        </Button>
      </div>
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    toast.success("Solicitud enviada");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-linea bg-grafito p-5 sm:p-6"
    >
      <h2 className="font-display text-xl uppercase tracking-[0.01em] text-hueso">
        Solicita la lista de precios
      </h2>
      <p className="mt-1 text-sm text-humo">
        Déjanos tus datos y te contactamos.
      </p>

      <div className="mt-5 grid gap-4">
        <Field label="Nombre" htmlFor="q-nombre" required>
          <Input id="q-nombre" name="nombre" required autoComplete="name" />
        </Field>
        <Field label="Negocio o empresa" htmlFor="q-empresa" required>
          <Input id="q-empresa" name="empresa" required autoComplete="organization" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" htmlFor="q-email" required>
            <Input id="q-email" name="email" type="email" required autoComplete="email" />
          </Field>
          <Field label="Teléfono" htmlFor="q-tel" required>
            <Input id="q-tel" name="telefono" type="tel" required autoComplete="tel" />
          </Field>
        </div>
        <Field
          label="¿Qué necesitas?"
          htmlFor="q-msg"
          hint="Productos, volumen aproximado y frecuencia."
        >
          <Textarea id="q-msg" name="mensaje" />
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-5 w-full">
        Solicitar lista de precios
      </Button>
      <p className="mt-3 text-center text-xs text-humo-2">
        Maqueta de demostración: el formulario no envía datos a ningún servidor.
      </p>
    </form>
  );
}
