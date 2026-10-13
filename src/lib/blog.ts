import { BLOG_POSTS, type BlogPost } from "@/content/site";
import { client } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";

/** Unified post shape the blog pages render, whatever the source. */
export type Post = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  excerpt: string;
  content?: string[]; // local plain paragraphs
  body?: unknown[]; // Sanity Portable Text
};

const FIELDS = `"id": _id, "slug": slug.current, title, subtitle, date, readTime, category, tags, excerpt, body`;

function fromLocal(p: BlogPost): Post {
  return { ...p, content: p.content };
}

export async function getAllPosts(): Promise<Post[]> {
  if (sanityConfigured) {
    return client.fetch(`*[_type == "post"] | order(date desc){ ${FIELDS} }`);
  }
  return BLOG_POSTS.map(fromLocal);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  if (sanityConfigured) {
    return client.fetch(`*[_type == "post" && slug.current == $slug][0]{ ${FIELDS} }`, { slug });
  }
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  return p ? fromLocal(p) : undefined;
}
