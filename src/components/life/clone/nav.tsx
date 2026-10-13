import WorldSwitch from "@/components/site/world-switch";

/** Minimal life nav: wordmark + the single ON/OFF work-mode switch (flipping it
 *  fires the HUD transition back to the tech world). */
export default function LifeNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8">
        <span className="pointer-events-auto font-display text-xl tracking-wide text-bone mix-blend-difference">
          PKS
        </span>
        <div className="pointer-events-auto text-bone">
          <WorldSwitch />
        </div>
      </div>
    </header>
  );
}
