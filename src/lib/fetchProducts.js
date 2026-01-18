import client from "./contentful";

export const fetchProducts = async () => {
  try {
    const response = await client.getEntries({
      content_type: "product",
      order: "-sys.createdAt", // Newest first
    });

    // Transform Contentful data to match your current product structure
    const products = response.items.map((item) => ({
      id: item.sys.id,
      name: item.fields.productName,
      description: item.fields.description,
      price: item.fields.price,
      oldPrice: item.fields.oldPrice || null,
      category: item.fields.category,
      images:
        item.fields.images?.map((img) => `https:${img.fields.file.url}`) || [],
      image: item.fields.images?.[0]
        ? `https:${item.fields.images[0].fields.file.url}`
        : "",
      colors: item.fields.colors || [],
      sizes: item.fields.sizes || [],
      isNew: item.fields.isNew || false,
      isTrending: item.fields.isTrending || false,
      stock: item.fields.stock || 0,
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const entry = await client.getEntry(id);

    return {
      id: entry.sys.id,
      name: entry.fields.productName,
      description: entry.fields.description,
      price: entry.fields.price,
      oldPrice: entry.fields.oldPrice || null,
      category: entry.fields.category,
      images:
        entry.fields.images?.map((img) => `https:${img.fields.file.url}`) || [],
      image: entry.fields.images?.[0]
        ? `https:${entry.fields.images[0].fields.file.url}`
        : "",
      colors: entry.fields.colors || [],
      sizes: entry.fields.sizes || [],
      isNew: entry.fields.isNew || false,
      isTrending: entry.fields.isTrending || false,
      stock: entry.fields.stock || 0,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
