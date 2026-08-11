// src/data/mockDashboard.js
export const mockStats = {
  revenue: 482000,
  orders: 36,
  visitors: 1204,
  clicks: 3891,
};

export const mockVisitorTrend = [
  { day: "Mon", visitors: 120 },
  { day: "Tue", visitors: 165 },
  { day: "Wed", visitors: 98 },
  { day: "Thu", visitors: 240 },
  { day: "Fri", visitors: 180 },
  { day: "Sat", visitors: 285 },
  { day: "Sun", visitors: 210 },
];

export const mockRecentOrders = [
  { id: "FL-1042", customer: "Amaka O.", total: 24500, status: "paid" },
  { id: "FL-1041", customer: "Tunde B.", total: 11200, status: "pending" },
  { id: "FL-1040", customer: "Chiamaka N.", total: 58000, status: "shipped" },
];

export const mockBestSellers = [
  {
    id: "p1",
    name: "Ofi Stripe Jacket",
    unitsSold: 42,
    revenue: 189000,
    image: "/images/brand/fizzaura.jpeg",
  },
  {
    id: "p2",
    name: "Crop Jacket for Ladies",
    unitsSold: 31,
    revenue: 155000,
    image: "/images/brand/fizzaura.jpeg",
  },
  {
    id: "p3",
    name: "FizzAura Monarch Corduroy",
    unitsSold: 27,
    revenue: 121500,
    image: "/images/brand/fizzaura.jpeg",
  },
  {
    id: "p4",
    name: "Stop Staring Collection",
    unitsSold: 19,
    revenue: 68400,
    image: "/images/brand/fizzaura.jpeg",
  },
];

export const mockProducts = [
  {
    id: "p1",
    name: "Ofi Stripe Jacket",
    category: "Jewelry",
    price: 45000,
    stock: 12,
    status: "active",
  },
  {
    id: "p2",
    name: "Crop Jacket for Ladies",
    category: "Apparel",
    price: 68000,
    stock: 3,
    status: "active",
  },
  {
    id: "p3",
    name: "FizzAura Monarch Corduroy",
    category: "Bags",
    price: 52000,
    stock: 0,
    status: "active",
  },
  {
    id: "p4",
    name: "Pearl Drop Earrings",
    category: "Jewelry",
    price: 21000,
    stock: 25,
    status: "active",
  },
  {
    id: "p5",
    name: "Velvet Evening Clutch",
    category: "Bags",
    price: 34000,
    stock: 8,
    status: "draft",
  },
];
