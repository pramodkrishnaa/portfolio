"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HudTransition from "./hud-transition";

type Ctx = { go: (to: string) => void };
const TransitionContext = createContext<Ctx | null>(null);

export function useWorldTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useWorldTransition must be used within <WorldTransitionProvider>");
  return ctx;
}

const BOOT_MS = 1800; // HUD boot plays, then we swap the route
const REVEAL_MS = 550; // HUD powers down, revealing the new world

type Overlay = { to: string; stage: "boot" | "reveal" };

export default function WorldTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [overlay, setOverlay] = useState<Overlay | null>(null);

  const go = (to: string) => {
    if (to === pathname || overlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(to);
      return;
    }
    setOverlay({ to, stage: "boot" });
  };

  // boot finished -> swap the route under the opaque HUD
  useEffect(() => {
    if (overlay?.stage !== "boot") return;
    const t = setTimeout(() => router.push(overlay.to), BOOT_MS);
    return () => clearTimeout(t);
  }, [overlay?.stage, overlay?.to, router]);

  // new route is live -> power the HUD down
  useEffect(() => {
    if (overlay?.stage === "boot" && pathname === overlay.to) {
      setOverlay((o) => (o ? { ...o, stage: "reveal" } : o));
    }
  }, [pathname, overlay]);

  // power-down finished -> remove the overlay
  useEffect(() => {
    if (overlay?.stage !== "reveal") return;
    const t = setTimeout(() => setOverlay(null), REVEAL_MS);
    return () => clearTimeout(t);
  }, [overlay?.stage]);

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      {overlay && <HudTransition stage={overlay.stage} dir={overlay.to === "/life" ? "off" : "on"} />}
    </TransitionContext.Provider>
  );
}
