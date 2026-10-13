import { TbPlayerPlayFilled, TbPhoto } from "react-icons/tb";

type MediaSlotProps = {
  /** Target asset filename to drop in later, e.g. "agentic-ai-loop.mp4" */
  file: string;
  caption?: string;
  kind?: "video" | "image";
  /** e.g. "16:9", "4:5" */
  aspect?: string;
  className?: string;
};

/**
 * Labeled placeholder for a real asset that lands later. Deliberately NOT a
 * fake product UI — just a framed slot naming the file to swap in.
 */
export default function MediaSlot({
  file,
  caption,
  kind = "video",
  aspect = "16:9",
  className = "",
}: MediaSlotProps) {
  const [w, h] = aspect.split(":").map(Number);
  const Icon = kind === "video" ? TbPlayerPlayFilled : TbPhoto;

  return (
    <figure
      className={`group relative overflow-hidden rounded-lg border border-line bg-bg-elev ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {/* corner ticks */}
      <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-line-strong" />
      <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-line-strong" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-line-strong" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-line-strong" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-muted transition-colors group-hover:border-accent group-hover:text-accent">
          <Icon size={16} aria-hidden />
        </span>
        <span className="font-mono text-[11px] text-dim">{file}</span>
      </div>

      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 border-t border-line bg-bg/60 px-4 py-2.5 font-mono text-[11px] text-muted backdrop-blur-sm">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
