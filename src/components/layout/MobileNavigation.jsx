import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const MobileNavigation = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: faInstagram,
      url: "https://www.instagram.com/fizzaura_brand",
    },
    {
      name: "Tiktok",
      icon: faTiktok,
      url: "https://www.tiktok.com/@fizzaura_luxury1",
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="font-opensans text-xl font-semibold text-neutral-900">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-neutral-900" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="py-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={`block px-6 py-4 text-lg font-medium transition-colors ${
                isActive(link.path)
                  ? "text-neutral-900 bg-neutral-50 border-l-4 border-neutral-900"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-neutral-200 mx-6" />

        {/* Social Links */}
        <div className="p-6">
          <p className="text-sm font-semibold text-neutral-900 mb-4">
            Follow Us
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors"
                  aria-label={social.name}
                >
                  <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 text-center">
            © 2026 FizzAura Luxury
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
