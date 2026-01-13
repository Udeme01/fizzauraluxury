import { Link } from "react-router-dom";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  rel,
  onClick,
  disabled = false,
  icon: Icon,
  className = "",
  ...props
}) => {
  const baseStyles =
    "w-fit inline-block font-medium tracking-wide cursor-pointer transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-neutral-white text-neutral-black hover:bg-neutral-white/70 hover:text-neutral-black/80",
    secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300",
    outline:
      "border-2 border-neutral-black text-neutral-black hover:opacity-60",
  };

  // const variants = {
  //   primary: "btn-primary",
  //   secondary: "btn-secondary",
  //   outline: "btn-outline",
  // };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-md",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // External link
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;
