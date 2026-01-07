import { Facebook, Instagram, Linkedin } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center bg-accent-900 font-montserrat p-6">
      <section>
        <section>
          <div className="flex items-center justify-left gap-1">
            <img
              src="/images/brand/fa_logo.png"
              alt="brand logo image"
              className="w-16 h-auto"
            />
            <h1 className="font-opensans text-3xl font-semibold tracking-tighter text-neutral-white">
              FizzAura Luxury.
            </h1>
          </div>
          <p className="text-sm mt-4 text-neutral-white/60">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet
            consectetur adipiscing elit quisque faucibus ex. Adipiscing elit
            quisque faucibus ex sapien vitae pellentesque.
          </p>
          <ul className="flex mt-4 p-3 w-fit gap-4">
            <li>
              <Instagram color="white" size={24} className="cursor-pointer" />
            </li>
            <li>
              <Facebook color="white" size={24} className="cursor-pointer" />
            </li>
            <li>
              <Linkedin color="white" size={24} className="cursor-pointer" />
            </li>
          </ul>
        </section>

        <section className="mt-6 border-t border-neutral-white pt-6 flex flex-col gap-12 md:flex-row md:gap-20">
          {/* company section */}
          <section>
            <h1 className="mb-4 text-md text-neutral-white">Company</h1>
            <ul className="text-xs flex flex-col gap-3">
              <li className="text-neutral-white/60 cursor-pointer">About Us</li>
              <li className="text-neutral-white/60 cursor-pointer">
                Our Story
              </li>
            </ul>
          </section>
          {/* shop section */}
          <section>
            <h1 className="mb-4 text-md text-neutral-white">Shop</h1>
            <ul className="text-xs flex flex-col gap-3">
              <li className="text-neutral-white/60 cursor-pointer">
                New Arrivals
              </li>
              <li className="text-neutral-white/60 cursor-pointer">Men</li>
              <li className="text-neutral-white/60 cursor-pointer">Women</li>
            </ul>
          </section>
          {/* support section */}
          <section>
            <h1 className="mb-4 text-md text-neutral-white">Support</h1>
            <ul className="text-xs flex flex-col gap-3">
              <li className="text-neutral-white/60 cursor-pointer">
                Contact Us
              </li>
              <li className="text-neutral-white/60 cursor-pointer">FAQ</li>
              <li className="text-neutral-white/60 cursor-pointer">
                Shipping and Delivery
              </li>
              <li className="text-neutral-white/60 cursor-pointer">
                Returns and Exchanges/Refunds
              </li>
              <li className="text-neutral-white/60 cursor-pointer">
                Size Guide
              </li>
            </ul>
          </section>
          {/* legal section */}
          <section>
            <h1 className="mb-4 text-md text-neutral-white">Legal</h1>
            <ul className="text-xs flex flex-col gap-3">
              <li className="text-neutral-white/60 cursor-pointer">
                Privacy Policy
              </li>
              <li className="text-neutral-white/60 cursor-pointer">
                Terms of Service
              </li>
              <li className="text-neutral-white/60 cursor-pointer">
                Refund Policy
              </li>
              <li className="text-neutral-white/60 cursor-pointer">
                Cookie Policy
              </li>
              <li className="text-neutral-white/60 cursor-pointer">
                Disclaimer
              </li>
            </ul>
          </section>
        </section>
      </section>
      {/* Bottom Bar */}
      <section className="w-full mt-6 border-t border-neutral-white pt-6 flex flex-col items-center justify-center">
        <p className="text-xs text-neutral-white/60">
          &copy; {new Date().getFullYear()} FizzAura Luxury. All rights
          reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
