export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-10-01";

/** True once a real Sanity project is wired via env. Until then the blog reads
 *  from content/site.ts. */
export const sanityConfigured = projectId.length > 0;
