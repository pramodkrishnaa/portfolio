import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

// projectId falls back to a syntactically-valid placeholder so imports never
// throw when Sanity isn't configured yet; queries are gated by sanityConfigured.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});
