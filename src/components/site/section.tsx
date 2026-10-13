type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

/** Consistent horizontal container + rhythm. Vertical padding set per section. */
export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}
