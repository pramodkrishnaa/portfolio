import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import Section from "@/components/site/section";
import Reveal from "@/components/reveal";
import { BLOG_POSTS } from "@/content/site";

const posts = BLOG_POSTS.slice(0, 3);

export default function Writing() {
  return (
    <Section id="writing" className="py-28">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Writing</h2>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-fg"
        >
          All essays
          <TbArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>

      <ul className="mt-4">
        {posts.map((p, i) => (
          <li key={p.id} className="border-b border-line">
            <Reveal delay={i * 0.05}>
              <Link
                href={`/blog/${p.slug}`}
                className="group grid grid-cols-1 gap-2 py-7 md:grid-cols-[180px_1fr] md:gap-8"
              >
                <div className="font-mono text-xs text-dim">
                  <span className="text-muted">{p.category}</span>
                  <span className="mt-1 block">
                    {p.date} · {p.readTime}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
