// src/data/mockCustomerDetails.js
export const mockCustomerDetails = {
  c1: {
    id: "c1",
    name: "Amaka O.",
    email: "amaka.o@gmail.com",
    phone: "0803 456 7890",
    joined: "2026-02-14",
    address: "12 Allen Avenue, Ikeja, Lagos, Nigeria",
    orders: [
      { id: "FL-1042", date: "2026-07-24", status: "paid", total: 24500 },
      { id: "FL-1020", date: "2026-06-10", status: "shipped", total: 68000 },
      { id: "FL-0998", date: "2026-05-02", status: "shipped", total: 45000 },
      { id: "FL-0954", date: "2026-03-18", status: "shipped", total: 61500 },
      { id: "FL-0930", date: "2026-02-14", status: "shipped", total: 46000 },
    ],
  },
};
