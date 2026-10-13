"use client";

import { useEffect, useRef, useState } from "react";

const RAMP = " .:-=+*#%@";

/**
 * Renders a word as an ASCII-art halftone, like the showcase panels on
 * contentarchitecture.dev. Draws a faux-screenshot (browser bar + content blocks
 * + the embossed name) to an offscreen canvas, samples per-cell brightness, and
 * maps it to an ASCII ramp. Client-only (canvas); decorative.
 */
export default function AsciiArt({
  emboss,
  cols = 150,
  rows = 54,
  seed = 1,
}: {
  emboss: string;
  cols?: number;
  rows?: number;
  seed?: number;
}) {
  const [art, setArt] = useState("");
  const pre = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const cv = document.createElement("canvas");
    cv.width = cols;
    cv.height = rows;
    const g = cv.getContext("2d");
    if (!g) return;

    // dark base
    g.fillStyle = "#000";
    g.fillRect(0, 0, cols, rows);

    // faux browser chrome
    g.fillStyle = "#2a2a2a";
    g.fillRect(0, 0, cols, Math.max(2, rows * 0.05));

    // faux content blocks (varied per seed) to read like a screenshot
    const blocks = [
      [0.06, 0.62, 0.4, 0.28],
      [0.52, 0.62, 0.42, 0.28],
      [0.06, 0.5, 0.88, 0.06],
    ];
    g.fillStyle = "#454545";
    blocks.forEach(([x, y, w, h], i) => {
      if ((seed + i) % 3 === 0) return;
      g.fillRect(x * cols, y * rows, w * cols, h * rows);
    });

    // embossed name — shrink to fit width
    let fs = rows * 0.36;
    g.fillStyle = "#ffffff";
    g.textAlign = "center";
    g.textBaseline = "middle";
    do {
      g.font = `700 ${fs}px ui-sans-serif, system-ui, sans-serif`;
      if (g.measureText(emboss).width <= cols * 0.92) break;
      fs -= 1;
    } while (fs > 6);
    g.fillText(emboss, cols / 2, rows * 0.3);

    const data = g.getImageData(0, 0, cols, rows).data;
    let out = "";
    for (let y = 0; y < rows; y++) {
      let line = "";
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
        // stable sparse noise so empty areas still have texture
        const noise = (((x * 73 + y * 131 + seed * 977) % 19) / 19) * 0.13;
        const v = Math.min(1, lum * 0.92 + noise);
        line += RAMP[Math.round(v * (RAMP.length - 1))];
      }
      out += line + "\n";
    }
    setArt(out);
  }, [emboss, cols, rows, seed]);

  return (
    <pre
      ref={pre}
      aria-hidden
      className="w-full overflow-hidden whitespace-pre font-mono leading-[1.05] text-paper/70 select-none"
      style={{ fontSize: "clamp(4px, 0.62vw, 8px)" }}
    >
      {art}
    </pre>
  );
}
