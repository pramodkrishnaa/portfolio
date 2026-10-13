"use client";

import Link from "next/link";
import WorldToggle from "./world-toggle";

type NavLink = { label: string; href: string };

export default function Nav({ links, home = "/" }: { links: NavLink[]; home?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href={home}
          className="font-mono text-sm font-semibold tracking-tight text-fg transition-colors hover:text-accent"
          aria-label="Home"
        >
          PKS<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-1 rounded-md border border-line bg-bg-elev/70 px-1.5 py-1 backdrop-blur-md">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-sm px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:bg-bg-raise hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <WorldToggle />
        </div>
      </nav>
    </header>
  );
}
