import { TbPlayerPlayFilled, TbPhoto } from "react-icons/tb";

type Props = {
  type: "video" | "image";
  ratio?: string;        // e.g. "16/9", "4/5"
  caption: string;
  fileName?: string;
  /** Tailwind classes for the border/label accent, e.g. "border-flame text-flame". */
  accent?: string;
  className?: string;
};

/** Honest, labeled placeholder for a real image or video (never a fake div
 *  pretending to be content). Shows the medium, aspect ratio, filename and note. */
export default function MediaSlot({
  type,
  ratio = "16/9",
  caption,
  fileName,
  accent = "border-bone/30 text-bone/70",
  className = "",
}: Props) {
  const Icon = type === "video" ? TbPlayerPlayFilled : TbPhoto;
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`relative flex w-full items-center justify-center overflow-hidden border-2 border-dashed bg-night/40 ${accent} ${className}`}
    >
      {/* crosshatch texture */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 10px)" }}
        aria-hidden
      />
      <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em]">
        [ {type} · {ratio.replace("/", ":")} ]
      </span>
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <Icon className="text-3xl" aria-hidden />
        <p className="max-w-xs text-xs leading-relaxed opacity-80">{caption}</p>
        {fileName && <p className="font-mono text-[10px] opacity-50">{fileName}</p>}
      </div>
    </div>
  );
}
