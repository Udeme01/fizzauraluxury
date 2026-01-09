import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";

// Sample trending product data
export const trending_products = [
  {
    id: 1,
    name: "Croco Embossed Heeled Flip",
    category: "Shoes",
    price: 70.0,
    originalPrice: 110.0,
    discount: 22,
    badge: "Hot",
    soldOut: false,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    colors: ["#000000", "#8B4513"],
  },
  {
    id: 2,
    name: "Crew Neck Cashmere Knit",
    category: "Shoes",
    price: 100.0,
    originalPrice: 125.0,
    discount: 20,
    soldOut: true,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    colors: ["#6495ED"],
  },
  {
    id: 3,
    name: "Long Sleeve Tee Knit Straw",
    category: "Men's",
    price: 70.0,
    originalPrice: 90.0,
    discount: 25,
    badge: "Hot",
    soldOut: false,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    colors: ["#E6E6FA", "#FFB6C1", "#90EE90"],
  },
  {
    id: 4,
    name: "Striped Summer Tunic",
    category: "Accessory",
    price: 80.0,
    discount: 20,
    soldOut: false,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
    colors: ["#F5DEB3", "#696969"],
  },
  {
    id: 5,
    name: "Suede Lace Up Boots Desert",
    category: "Bag",
    price: 90.0,
    originalPrice: 100.0,
    discount: 10,
    soldOut: false,
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop",
    colors: ["#000080", "#D2B48C"],
  },
  {
    id: 6,
    name: "Classic Leather Handbag",
    category: "Bag",
    price: 120.0,
    originalPrice: 150.0,
    discount: 20,
    badge: "New",
    soldOut: false,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    colors: ["#8B4513", "#000000"],
  },
];

// src/data/products.js
export const newArrivals = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    price: 45000,
    images: ["/images/products/jacket-1.jpg"],
    category: "Outerwear",
    colors: ["Black", "Brown", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    isNew: true, // ← Add this to mark as new arrival
    inStock: true,
  },
  {
    id: 2,
    name: "Cotton Polo Shirt",
    price: 15000,
    images: ["/images/products/polo-1.jpg"],
    category: "Tops",
    colors: ["White", "Blue", "Red"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    isNew: true, // ← Add this
    inStock: true,
  },
  // Add more products...
];

export const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick delivery within Lagos and beyond",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "100% secure and trusted",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Hassle-free 7-day return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help you",
  },
];

export const collections = [
  {
    id: 1,
    title: "Jackets",
    count: "10 Products",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    link: "/shop/jackets",
  },
  {
    id: 2,
    title: "Trucker Jackets",
    count: "10 Products",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    link: "/shop/trucker-jackets",
  },
  {
    id: 3,
    title: "Face Caps",
    count: "10 Products",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop",
    link: "/shop/face-caps",
  },
];
