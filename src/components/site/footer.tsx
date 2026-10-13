import Link from "next/link";
import { TbBrandGithub, TbBrandLinkedin, TbMail } from "react-icons/tb";
import { PERSONAL_INFO as P } from "@/content/site";
import WorldToggle from "./world-toggle";

const links = [
  { label: "GitHub", href: P.github, Icon: TbBrandGithub },
  { label: "LinkedIn", href: P.linkedin, Icon: TbBrandLinkedin },
  { label: "Email", href: `mailto:${P.email}`, Icon: TbMail },
];

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-dim">{P.location}</p>
          <p className="mt-3 max-w-md text-lg text-muted">
            Building agentic systems and the infrastructure under them. Open to senior FDE
            and Agentic AI work.
          </p>
          <a
            href={`mailto:${P.email}`}
            className="mt-5 inline-block font-mono text-sm text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            {P.email}
          </a>
        </div>

        <div className="flex flex-col items-start gap-6 md:items-end">
          <div className="flex items-center gap-2">
            {links.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-fg"
              >
                <Icon size={17} aria-hidden />
              </Link>
            ))}
          </div>
          <WorldToggle />
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] border-t border-line px-5 py-6 sm:px-8">
        <p className="font-mono text-[11px] text-dim">
          © {P.name}. Designed and built from scratch.
        </p>
      </div>
    </footer>
  );
}
