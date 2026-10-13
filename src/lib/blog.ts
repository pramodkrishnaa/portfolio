import { BLOG_POSTS, type BlogPost } from "@/content/site";

/**
 * Blog data seam. Today it serves the local essays in content/site.ts.
 * When a Sanity project is configured (NEXT_PUBLIC_SANITY_PROJECT_ID), swap
 * these two functions to GROQ queries — the pages don't change.
 */
export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export type { BlogPost };
