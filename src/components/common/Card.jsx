const Card = ({
  children,
  variant = "default",
  padding = "md",
  className = "",
  hover = false,
  ...props
}) => {
  const baseStyles = "bg-white rounded-xl transition-shadow";

  const variants = {
    default: "shadow-sm",
    elevated: "shadow-md",
    outlined: "border border-neutral-200",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const hoverEffect = hover ? "hover:shadow-lg cursor-pointer" : "";

  const classes = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverEffect} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
