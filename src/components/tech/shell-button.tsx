"use client";

import { TbTerminal2 } from "react-icons/tb";

/** Opens the ⌘K command terminal (handled globally in CommandLayer). */
export default function ShellButton() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true }))
      }
      className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-fg"
    >
      <TbTerminal2 size={15} aria-hidden />
      <span className="rounded-sm bg-bg-raise px-1.5 py-0.5 text-[10px] text-dim">⌘K</span>
      Shell
    </button>
  );
}
