"use client";

import { usePathname } from "next/navigation";

export type World = "tech" | "life";

/** The active world is derived from the route, not component state. */
export function useWorld(): World {
  const pathname = usePathname();
  return pathname.startsWith("/life") ? "life" : "tech";
}
