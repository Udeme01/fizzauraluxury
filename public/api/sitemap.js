/* eslint-env node */

const SITE = "https://fizzauraluxury.com";

const STATIC_PAGES = [
  "/",
  "/shop",
  "/about",
  "/contact",
  "/faq",
  "/size-guide",
  "/shipping-delivery",
  "/returns-refunds",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/disclaimer",
];

export default async function handler(req, res) {
  try {
    // eslint-disable-next-line no-undef
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    // eslint-disable-next-line no-undef
    const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    // Ask Supabase's REST API for product IDs (same public key your site uses)
    const response = await fetch(`${supabaseUrl}/rest/v1/products?select=id`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!response.ok) throw new Error(`Supabase responded ${response.status}`);
    const products = await response.json();

    const urls = [
      ...STATIC_PAGES.map((path) => `${SITE}${path}`),
      ...products.map((p) => `${SITE}/product/${p.id}`),
    ];

    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
      `\n</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    // Cache for 1 hour so Google's requests don't hit Supabase every time
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    );
    res.status(200).send(xml);
  } catch (error) {
    console.error("Sitemap error:", error);
    res.status(500).send("Could not generate sitemap");
  }
}
