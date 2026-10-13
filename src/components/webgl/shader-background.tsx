"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ShaderHero = dynamic(() => import("./shader-hero"), { ssr: false });

function webglOk() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Mounts the WebGL shader only when it's safe and welcome. Otherwise the
 *  hero's static grid texture stands in. */
export default function ShaderBackground() {
  const [enabled, setEnabled] = useState(false);
  const [color, setColor] = useState("#5b8dff");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !webglOk()) return;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    if (accent) setColor(accent);
    setEnabled(true);
  }, []);

  if (!enabled) return null;
  return (
    <div className="absolute inset-0 opacity-70" aria-hidden>
      <ShaderHero color={color} />
    </div>
  );
}
