"use client";

import { useEffect } from "react";
import { useWorld } from "@/lib/use-world";

/** Reflects the active world onto <html data-world> so CSS tokens swap. */
export default function WorldTheme() {
  const world = useWorld();
  useEffect(() => {
    document.documentElement.setAttribute("data-world", world);
  }, [world]);
  return null;
}
