import Link from "next/link";
import type { IconType } from "react-icons";
import { TbArrowUpRight, TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import Reveal from "@/components/reveal";
import { PERSONAL_INFO as P } from "@/content/site";

export default function Booking() {
  return (
    <section id="booking" className="mx-auto max-w-[1400px] px-5 py-32 sm:px-8">
      <Reveal className="flex flex-col items-start gap-10">
        <h2 className="font-display text-[14vw] leading-[0.85] tracking-tight sm:text-[10vw] lg:text-[9rem]">
          SAY HELLO.
        </h2>
        <p className="max-w-xl text-lg text-fg/80">
          Shoots, collaborations, a ride, or just a good argument about agents and GPUs. The
          door is open.
        </p>

        <a
          href={`mailto:${P.email}`}
          className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-base font-medium text-accent-ink transition-transform active:translate-y-px"
        >
          Get in touch
          <TbArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>

        <div className="flex items-center gap-2">
          <Social href={P.linkedin} label="LinkedIn" Icon={TbBrandLinkedin} />
          <Social href={P.github} label="GitHub" Icon={TbBrandGithub} />
        </div>
      </Reveal>
    </section>
  );
}

function Social({ href, label, Icon }: { href: string; label: string; Icon: IconType }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-fg"
    >
      <Icon size={18} aria-hidden />
    </Link>
  );
}
