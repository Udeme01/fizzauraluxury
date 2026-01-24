import React from "react";
import { Link } from "react-router-dom";
import { footerLinks, socialLinks } from "../../data/footerData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Reusable FooterSection Component
const FooterSection = ({ title, links }) => {
  return (
    <section>
      <h1 className="mb-4 text-lg text-neutral-white font-semibold">{title}</h1>
      <ul className="text-xs flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-neutral-white/60 hover:text-neutral-white transition-colors cursor-pointer"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

// Main Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center bg-accent-900 font-montserrat p-8 py-16 md:py-20">
      <section className="md:flex md:flex-row md:gap-12 w-full h-full max-w-7xl px-6 lg:px-8">
        {/* Brand Section */}
        <section>
          <div className="flex items-center justify-left gap-2">
            <img
              src="/images/brand/fa_logo.png"
              alt="FizzAura Luxury logo"
              className="w-16 h-auto"
            />
            <h1 className="font-opensans text-2xl font-semibold tracking-tighter text-neutral-white">
              FizzAura Luxury
            </h1>
          </div>
          <p className="text-sm mt-4 text-neutral-white/60 w-full leading-relaxed lg:max-w-96">
            Elevate your style with our curated collection of premium fashion
            pieces.
          </p>

          {/* Social Links - Dynamic */}
          <ul className="flex mt-6 w-fit gap-3">
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
                  <FontAwesomeIcon icon={social.icon} size="md" />
                </a>
              );
            })}
          </ul>
        </section>

        {/* Footer Links Section - Dynamic */}
        <section className="mt-12 pt-12 border-t border-neutral-white/5 flex flex-col gap-12 md:mt-0 md:pt-0 md:border-t-0 md:flex-row lg:gap-20">
          {Object.entries(footerLinks).map(([key, section]) => (
            <FooterSection
              key={key}
              title={section.title}
              links={section.links}
            />
          ))}
        </section>
      </section>

      {/* Bottom Bar */}
      <section className="w-full mt-6 border-t border-neutral-white/5 pt-6 flex flex-col items-center justify-center md:mt-12">
        <p className="text-xs text-neutral-white/60 md:mt-12">
          &copy; {currentYear} FizzAura Luxury. All rights reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
