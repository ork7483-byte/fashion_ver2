interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({ label, title, description, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3 block">
        {label}
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2825] mb-3">{title}</h2>
      {description && (
        <p className="text-[#8C857B] text-base max-w-xl mx-auto">{description}</p>
      )}
    </div>
  );
}
