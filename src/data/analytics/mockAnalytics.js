// src/data/mockAnalytics.js
export const mockTrafficTrend = [
  { date: "Jul 22", visitors: 145 },
  { date: "Jul 23", visitors: 189 },
  { date: "Jul 24", visitors: 210 },
  { date: "Jul 25", visitors: 165 },
  { date: "Jul 26", visitors: 298 },
  { date: "Jul 27", visitors: 245 },
  { date: "Jul 28", visitors: 320 },
];

export const mockTrafficSources = [
  { source: "Direct", visits: 412, percent: 34 },
  { source: "Instagram", visits: 356, percent: 30 },
  { source: "Google", visits: 245, percent: 20 },
  { source: "WhatsApp", visits: 128, percent: 11 },
  { source: "Other", visits: 63, percent: 5 },
];

export const mockTopPages = [
  { path: "/product/gold-necklace", views: 512, clicks: 89 },
  { path: "/shop", views: 445, clicks: 34 },
  { path: "/product/silk-dress", views: 388, clicks: 67 },
  { path: "/", views: 356, clicks: 12 },
  { path: "/product/tote-bag", views: 290, clicks: 41 },
];

export const mockDeviceBreakdown = [
  { device: "Mobile", percent: 68 },
  { device: "Desktop", percent: 27 },
  { device: "Tablet", percent: 5 },
];
