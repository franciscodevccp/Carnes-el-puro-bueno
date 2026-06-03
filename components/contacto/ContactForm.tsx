"use client";

import { type FormEvent, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { toast } from "sonner";

import { Field, Input, Textarea } from "@/components/form";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-linea bg-grafito p-8 text-center">
        <CheckCircle size={44} weight="light" className="text-success" />
        <p className="font-display text-lg uppercase tracking-[0.01em] text-hueso">
          ¡Mensaje enviado!
        </p>
        <p className="max-w-xs text-sm text-humo">
          Gracias por escribirnos. Te respondemos a la brevedad.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setSent(false)}>
          Enviar otro
        </Button>
      </div>
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    toast.success("Mensaje enviado");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-linea bg-grafito p-5 sm:p-6"
    >
      <h2 className="font-display text-xl uppercase tracking-[0.01em] text-hueso">
        Escríbenos
      </h2>
      <p className="mt-1 text-sm text-humo">
        Dudas, pedidos o despacho: cuéntanos.
      </p>

      <div className="mt-5 grid gap-4">
        <Field label="Nombre" htmlFor="c-nombre" required>
          <Input id="c-nombre" name="nombre" required autoComplete="name" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" htmlFor="c-email" required>
            <Input id="c-email" name="email" type="email" required autoComplete="email" />
          </Field>
          <Field label="Teléfono" htmlFor="c-tel">
            <Input id="c-tel" name="telefono" type="tel" autoComplete="tel" />
          </Field>
        </div>
        <Field label="Mensaje" htmlFor="c-msg" required>
          <Textarea id="c-msg" name="mensaje" required />
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-5 w-full">
        Enviar mensaje
      </Button>
      <p className="mt-3 text-center text-xs text-humo-2">
        Maqueta de demostración: el formulario no envía datos a ningún servidor.
      </p>
    </form>
  );
}
