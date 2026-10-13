"use client";

import { useEffect, useRef, useState } from "react";

const RAMP = " .:-=+*#%@";

/**
 * Renders an image (or an embossed word) as an ASCII-art halftone, like the
 * showcase panels on contentarchitecture.dev. With `src`, it samples a real
 * image's brightness; otherwise it draws a faux-screenshot with the name
 * embossed. Client-only (canvas); decorative.
 */
export default function AsciiArt({
  emboss,
  src,
  cols = 150,
  rows = 54,
  seed = 1,
}: {
  emboss: string;
  src?: string;
  cols?: number;
  rows?: number;
  seed?: number;
}) {
  const [art, setArt] = useState("");

  useEffect(() => {
    const cv = document.createElement("canvas");
    cv.width = cols;
    cv.height = rows;
    const g = cv.getContext("2d");
    if (!g) return;
    let cancelled = false;

    const sample = () => {
      const data = g.getImageData(0, 0, cols, rows).data;
      let out = "";
      for (let y = 0; y < rows; y++) {
        let line = "";
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
          const noise = (((x * 73 + y * 131 + seed * 977) % 19) / 19) * 0.1;
          const v = Math.min(1, lum * 0.95 + noise);
          line += RAMP[Math.round(v * (RAMP.length - 1))];
        }
        out += line + "\n";
      }
      if (!cancelled) setArt(out);
    };

    const fauxScreenshot = () => {
      g.fillStyle = "#000";
      g.fillRect(0, 0, cols, rows);
      g.fillStyle = "#2a2a2a";
      g.fillRect(0, 0, cols, Math.max(2, rows * 0.05));
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
      drawEmboss(0.3, 1);
    };

    const drawEmboss = (yFrac: number, alpha: number) => {
      let fs = rows * 0.34;
      g.fillStyle = `rgba(255,255,255,${alpha})`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      do {
        g.font = `700 ${fs}px ui-sans-serif, system-ui, sans-serif`;
        if (g.measureText(emboss).width <= cols * 0.92) break;
        fs -= 1;
      } while (fs > 6);
      g.fillText(emboss, cols / 2, rows * yFrac);
    };

    if (src) {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        g.fillStyle = "#000";
        g.fillRect(0, 0, cols, rows);
        // cover-fit the image
        const s = Math.max(cols / img.width, rows / img.height);
        const w = img.width * s;
        const h = img.height * s;
        g.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h);
        drawEmboss(0.5, 0.55); // name embossed over the image
        sample();
      };
      img.onerror = () => { if (!cancelled) { fauxScreenshot(); sample(); } };
      img.src = src;
    } else {
      fauxScreenshot();
      sample();
    }

    return () => { cancelled = true; };
  }, [emboss, src, cols, rows, seed]);

  return (
    <pre
      aria-hidden
      className="w-full overflow-hidden whitespace-pre font-mono leading-[1.05] text-paper/70 select-none"
      style={{ fontSize: "clamp(4px, 0.62vw, 8px)" }}
    >
      {art}
    </pre>
  );
}
