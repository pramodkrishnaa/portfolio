import Link from "next/link";
import { TbArrowLeft } from "react-icons/tb";
import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";
import Section from "@/components/site/section";
import Reveal from "@/components/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Writing",
  description: "Essays on air-gapped LLM systems, agents, RAG, robotics, and the mindset behind shipping them.",
};

const navLinks = [{ label: "Home", href: "/" }];

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <main className="pt-16">
      <Nav links={navLinks} />
      <Section className="py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-dim transition-colors hover:text-fg"
        >
          <TbArrowLeft aria-hidden /> Home
        </Link>
        <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-6xl">Writing</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Field notes from building autonomous systems in hard environments.
        </p>

        <ul className="mt-14 border-t border-line">
          {posts.map((p, i) => (
            <li key={p.id} className="border-b border-line">
              <Reveal delay={i * 0.04}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-[200px_1fr] md:gap-10"
                >
                  <div className="font-mono text-xs text-dim">
                    <span className="text-accent">{p.category}</span>
                    <span className="mt-1 block">{p.date} · {p.readTime}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">
                      {p.title}
                    </h2>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted">{p.excerpt}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
      <Footer />
    </main>
  );
}
