import Link from "next/link";
import { notFound } from "next/navigation";
import { TbArrowLeft } from "react-icons/tb";
import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";
import Section from "@/components/site/section";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

const navLinks = [{ label: "Writing", href: "/blog" }];

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="pt-16">
      <Nav links={navLinks} />
      <Section className="py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-dim transition-colors hover:text-fg"
        >
          <TbArrowLeft aria-hidden /> Writing
        </Link>

        <article className="mx-auto mt-10 max-w-2xl">
          <p className="font-mono text-xs text-dim">
            <span className="text-accent">{post.category}</span> · {post.date} · {post.readTime}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-muted">{post.subtitle}</p>

          <div className="mt-10 space-y-5 text-[1.0625rem] leading-relaxed text-fg/90">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-1.5 border-t border-line pt-6">
            {post.tags.map((t) => (
              <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
                {t}
              </span>
            ))}
          </div>
        </article>
      </Section>
      <Footer />
    </main>
  );
}
