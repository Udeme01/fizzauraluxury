import { faTiktok, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const footerLinks = {
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      // { label: "Our Story", href: "/about#story" },
    ],
  },
  shop: {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/shop?filter=new" },
      // { label: "Men", href: "/shop?category=men" },
      // { label: "Women", href: "/shop?category=women" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping and Delivery", href: "/shipping-delivery" },
      { label: "Returns and Refunds", href: "/returns-refunds" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      // { label: "Refund Policy", href: "/refund-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
};

export const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/fizzaura_brand",
    icon: faInstagram,
  },

  {
    name: "Tiktok",
    url: "https://www.tiktok.com/@fizzaura_luxury1",
    icon: faTiktok,
  },
];
