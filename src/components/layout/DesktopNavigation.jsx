import { Link, useLocation } from "react-router-dom";

const DesktopNavigation = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`text-base font-medium transition-colors relative ${
            isActive(link.path)
              ? "text-neutral-900"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          {link.name}
          {/* Active underline indicator */}
          {isActive(link.path) && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neutral-900" />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
