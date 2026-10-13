"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type Ctx = { go: (to: string) => void };
const TransitionContext = createContext<Ctx | null>(null);

export function useWorldTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useWorldTransition must be used within <WorldTransitionProvider>");
  return ctx;
}

type Phase = "in" | "out";

export default function WorldTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [target, setTarget] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("in");
  const startedFrom = useRef<string | null>(null);

  const go = (to: string) => {
    if (to === pathname) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(to);
      return;
    }
    startedFrom.current = pathname;
    setTarget(to);
    setPhase("in");
  };

  // Once the curtain has covered and the route changed, sweep it away.
  useEffect(() => {
    if (target && phase === "in" && pathname === target) setPhase("out");
  }, [pathname, target, phase]);

  const onComplete = () => {
    if (phase === "in") {
      router.push(target!);
    } else {
      setTarget(null);
    }
  };

  const label = target === "/life" ? "LIFE" : "TECH";

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      <AnimatePresence>
        {target && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg"
            initial={{ y: "100%" }}
            animate={{ y: phase === "in" ? "0%" : "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={onComplete}
          >
            <span className="font-display text-7xl tracking-tight text-fg sm:text-8xl">
              {label}
              <span className="text-accent">.</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
