// import client from "./contentful";

// export const fetchProducts = async () => {
//   try {
//     const response = await client.getEntries({
//       content_type: "product",
//       order: "-sys.createdAt", // Newest first
//     });

//     // Transform Contentful data to match my current product structure
//     const products = response.items.map((item) => ({
//       id: item.sys.id,
//       name: item.fields.productName,
//       description: item.fields.description,
//       price: item.fields.price,
//       oldPrice: item.fields.oldPrice || null,
//       category: item.fields.category,
//       images:
//         item.fields.images?.map((img) => `https:${img.fields.file.url}`) || [],
//       image: item.fields.images?.[0]
//         ? `https:${item.fields.images[0].fields.file.url}`
//         : "",
//       colors: item.fields.colors || [],
//       sizes: item.fields.sizes || [],
//       isNew: item.fields.isNew || false,
//       isTrending: item.fields.isTrending || false,
//       stock: item.fields.stock || 0,
//     }));

//     return products;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// };

// // Fetch single product by ID
// export const fetchProductById = async (id) => {
//   try {
//     const entry = await client.getEntry(id);

//     return {
//       id: entry.sys.id,
//       name: entry.fields.productName,
//       description: entry.fields.description,
//       price: entry.fields.price,
//       oldPrice: entry.fields.oldPrice || null,
//       category: entry.fields.category,
//       images:
//         entry.fields.images?.map((img) => `https:${img.fields.file.url}`) || [],
//       image: entry.fields.images?.[0]
//         ? `https:${entry.fields.images[0].fields.file.url}`
//         : "",
//       colors: entry.fields.colors || [],
//       sizes: entry.fields.sizes || [],
//       isNew: entry.fields.isNew || false,
//       isTrending: entry.fields.isTrending || false,
//       stock: entry.fields.stock || 0,
//     };
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// };

// // Fetch active promo banner
// export const fetchPromoBanner = async () => {
//   try {
//     const response = await client.getEntries({
//       content_type: "promoBanner",
//       "fields.isActive": true,
//       limit: 1,
//       order: "-sys.createdAt", // Get most recent
//     });

//     if (response.items.length === 0) {
//       return null;
//     }

//     const item = response.items[0];

//     return {
//       id: item.sys.id,
//       tagLine: item.fields.tagLine,
//       mainHeading: item.fields.mainHeading,
//       subheading: item.fields.subheading,
//       buttonText: item.fields.buttonText,
//       buttonLink: item.fields.buttonLink,
//       productImage: item.fields.productImage
//         ? `https:${item.fields.productImage.fields.file.url}`
//         : "/images/hero/h3.png", // Fallback
//       backgroundColor: item.fields.backgroundColor || "#262626",
//     };
//   } catch (error) {
//     console.error("Error fetching promo banner:", error);
//     return null;
//   }
// };

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
