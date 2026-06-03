import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  action?: { href: string; label: string };
};

export function SectionHeading({ eyebrow, title, action }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="eyebrow text-rojo">{eyebrow}</p>
        <h2 className="text-h2 mt-2 text-hueso">{title}</h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-humo transition-colors hover:text-rojo sm:inline-flex"
        >
          {action.label}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
