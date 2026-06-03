"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Animaciones sutiles (design.md §9): fade-up, ~0.5s, ease-out, una sola vez.

const DURATION = 0.5;

/** Aparece con fade-up cuando entra en viewport (una vez). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: DURATION, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: "easeOut" } },
};

/**
 * Contenedor que escalona la entrada de sus <StaggerItem> hijos.
 * trigger="mount" → al cargar (hero, encabezados). trigger="view" → al hacer scroll.
 */
export function StaggerGroup({
  children,
  className,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  trigger?: "view" | "mount";
}) {
  if (trigger === "mount") {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
