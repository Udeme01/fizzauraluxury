import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { footerLinks, socialLinks } from "../../data/footerData";

// const Footer = () => {
//   return (
//     <footer className="flex flex-col items-center justify-center bg-accent-900 font-montserrat p-8 py-16">
//       <section className="md:flex md:flex-row md:gap-12 lg:max-w-7xl">
//         <section>
//           <div className="flex items-center justify-left gap-2">
//             <img
//               src="/images/brand/fa_logo.png"
//               alt="brand logo image"
//               className="w-16 h-auto"
//             />
//             <h1 className="font-opensans text-2xl font-semibold tracking-tighter text-neutral-white">
//               FizzAura Luxury
//             </h1>
//           </div>
//           <p className="text-sm mt-4 text-neutral-white/60 w-full leading-relaxed lg:max-w-96">
//             Elevate your style with our curated collection of premium fashion
//             pieces.
//           </p>
//           <ul className="flex mt-6 w-fit gap-3">
//             <li>
//               <Instagram color="white" size={24} className="cursor-pointer" />
//             </li>
//             <li>
//               <Facebook color="white" size={24} className="cursor-pointer" />
//             </li>
//             <li>
//               <Linkedin color="white" size={24} className="cursor-pointer" />
//             </li>
//           </ul>
//         </section>

//         <section className="mt-12 pt-12 border-t border-neutral-white/5 flex flex-col gap-12 md:mt-0 md:border-t-0 md:flex-row lg:gap-20">
//           {/* company section */}
//           <section>
//             <h1 className="mb-4 text-lg text-neutral-white font-semibold">
//               Company
//             </h1>
//             <ul className="text-xs flex flex-col gap-3">
//               <li className="text-neutral-white/60 cursor-pointer">About Us</li>
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Our Story
//               </li>
//             </ul>
//           </section>
//           {/* shop section */}
//           <section>
//             <h1 className="mb-4 text-lg text-neutral-white font-semibold">
//               Shop
//             </h1>
//             <ul className="text-xs flex flex-col gap-3">
//               <li className="text-neutral-white/60 cursor-pointer">
//                 New Arrivals
//               </li>
//               <li className="text-neutral-white/60 cursor-pointer">Men</li>
//               <li className="text-neutral-white/60 cursor-pointer">Women</li>
//             </ul>
//           </section>
//           {/* support section */}
//           <section>
//             <h1 className="mb-4 text-lg text-neutral-white font-semibold">
//               Support
//             </h1>
//             <ul className="text-xs flex flex-col gap-3">
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Contact Us
//               </li>
//               <li className="text-neutral-white/60 cursor-pointer">FAQ</li>
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Shipping and Delivery
//               </li>
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Returns and Refunds
//               </li>
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Size Guide
//               </li>
//             </ul>
//           </section>
//           {/* legal section */}
//           <section>
//             <h1 className="mb-4 text-lg text-neutral-white font-semibold">
//               Legal
//             </h1>
//             <ul className="text-xs flex flex-col gap-3">
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Privacy Policy
//               </li>
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Terms of Service
//               </li>
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Refund Policy
//               </li>
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Cookie Policy
//               </li>
//               <li className="text-neutral-white/60 cursor-pointer">
//                 Disclaimer
//               </li>
//             </ul>
//           </section>
//         </section>
//       </section>
//       {/* Bottom Bar */}
//       <section className="w-full mt-6 border-t border-neutral-white/5 pt-6 flex flex-col items-center justify-center md:mt-12">
//         <p className="text-xs text-neutral-white/60 md:mt-12">
//           &copy; {new Date().getFullYear()} FizzAura Luxury. All rights
//           reserved.
//         </p>
//       </section>
//     </footer>
//   );
// };

// Map icon names to actual components
const iconComponents = {
  Instagram,
  Facebook,
  Linkedin,
};

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

// Reusable SocialIcon Component
const SocialIcon = ({ name, href, icon }) => {
  const IconComponent = iconComponents[icon];

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="block hover:opacity-80 transition-opacity"
      >
        <IconComponent size={24} color="white" className="cursor-pointer" />
      </a>
    </li>
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
            {socialLinks.map((social) => (
              <SocialIcon
                key={social.name}
                name={social.name}
                href={social.href}
                icon={social.icon}
              />
            ))}
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
