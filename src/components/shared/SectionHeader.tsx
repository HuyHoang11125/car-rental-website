interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({ label, title, subtitle, center = true }: SectionHeaderProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      <div className={`elite-divider ${center ? 'justify-center' : ''} mb-4`}>
        <span>{label}</span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-[Playfair_Display,serif]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/50 text-base lg:text-lg max-w-xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
