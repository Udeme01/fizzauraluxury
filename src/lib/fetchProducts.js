import { supabase } from "../services/supabaseClient";

// Turns one Supabase row into the shape Shop.jsx / ProductCard already expect
const mapProduct = (row) => ({
  id: row.id,
  name: row.name,
  description: row.description,
  price: row.price,
  oldPrice: row.old_price || null,
  category: row.category,
  images: row.image_urls || [],
  image: row.image_urls?.[0] || "",
  colors: row.colors || [],
  sizes: row.sizes || [],
  isNew: row.is_new || false,
  isTrending: row.is_trending || false,
  stock: row.stock || 0,
});

// Fetch all products from Supabase
export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // console.log("Fetched products:", data);

    return data.map(mapProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch single product by ID from Supabase
export const fetchProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    // console.log("Fetched product:", data);

    return mapProduct(data);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

// Fetch active promo banner from Supabase
export const fetchPromoBanner = async () => {
  try {
    const { data, error } = await supabase
      .from("promo_banners")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return null;
    }

    const item = data[0];

    return {
      id: item.id,
      tagLine: item.tag_line,
      mainHeading: item.main_heading,
      subheading: item.subheading,
      buttonText: item.button_text,
      buttonLink: item.button_link,
      productImage: item.product_image
        ? `https:${item.product_image.fields.file.url}`
        : "/images/hero/h3.png", // Fallback
      backgroundColor: item.background_color || "#262626",
    };
  } catch (error) {
    console.error("Error fetching promo banner:", error);
    return null;
  }
};
