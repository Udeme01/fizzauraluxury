// src/data/mockOrderDetails.js
export const mockOrderDetails = {
  "FL-1042": {
    id: "FL-1042",
    status: "paid",
    date: "2026-07-24",
    customer: {
      name: "Amaka O.",
      email: "amaka.o@gmail.com",
      phone: "0803 456 7890",
    },
    shippingAddress: "12 Allen Avenue, Ikeja, Lagos, Nigeria",
    items: [
      { id: "p1", name: "Gold Layered Necklace", qty: 1, price: 45000 },
      { id: "p4", name: "Pearl Drop Earrings", qty: 1, price: 21000 },
    ],
    timeline: [
      { status: "pending", date: "2026-07-24 09:12" },
      { status: "paid", date: "2026-07-24 09:14" },
    ],
  },
};
