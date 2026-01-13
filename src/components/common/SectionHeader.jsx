const SectionHeader = ({
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mb-12 ${alignments[align]} ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-neutral-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
