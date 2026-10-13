import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://pramodkrishna.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getAllPosts()).map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/life`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: "monthly", priority: 0.7 },
    ...posts,
  ];
}
