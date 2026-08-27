import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, Check, Plus } from "lucide-react";
import { supabase } from "../../services/supabaseClient";

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const availableColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gold", hex: "#D4AF37" },
  { name: "Rose Pink", hex: "#F7CAC9" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Beige", hex: "#E8DCC8" },
];

const ProductForm = () => {
  const [customColors, setCustomeColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColorHex, setNewColorHex] = useState("#000000");
  const [newColorName, setNewColorName] = useState("");

  const [categories, setCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // navigate route...
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "active",
    description: "",
    sizes: [],
    colors: [],
  });

  useEffect(() => {
    if (!isEditMode) return;

    const loadProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("error getting product", error);
        setLoading(false);
        return;
      }

      setForm({
        name: data.name,
        category: data.category,
        price: data.price,
        stock: data.stock,
        status: data.status,
        description: data.description || "",
        sizes: data.sizes || [],
        colors: data.colors || [],
      });

      setExistingImageUrls(data.image_urls || []);

      setLoading(false);
    };
    loadProduct();
  }, [id, isEditMode]);

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      setCategories(data || []);

      if (data && data.length > 0) {
        setForm((prev) => ({
          ...prev,
          category: prev.category || data[0].name,
        }));
      }
    };
    loadCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeNewImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
    setErrors((prev) => ({ ...prev, sizes: undefined }));
  };

  const toggleColor = (colorName) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter((c) => c !== colorName)
        : [...prev.colors, colorName],
    }));
    setErrors((prev) => ({ ...prev, colors: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!form.category) {
      newErrors.category = "Please select a category.";
    }

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = "Enter a valid price.";
    }

    if (form.stock === "" || Number(form.stock) < 0) {
      newErrors.stock = "Enter a valid stock quantity.";
    }

    if (form.sizes.length === 0) {
      newErrors.sizes = "Select at least one size.";
    }

    if (form.colors.length === 0) {
      newErrors.colors = "Select at least one color.";
    }

    // if (!form.description) {
    //   newErrors.description = "Provide a product description.";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);

    const newUrls = [];
    for (const file of imageFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) {
        console.error("upload error", uploadError);
        continue;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      newUrls.push(data.publicUrl);
    }

    const finalImageUrls = [...existingImageUrls, ...newUrls];

    const productData = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      status: form.status,
      sizes: form.sizes,
      colors: form.colors,
      description: form.description,
      image_urls: finalImageUrls,
    };

    const { error } = isEditMode
      ? await supabase.from("products").update(productData).eq("id", id)
      : await supabase.from("products").insert(productData);

    setSubmitting(false);

    if (error) {
      console.error("error uploading products", error);
      return;
    }

    navigate("/admin/products");
  };

  // colors...
  const allColors = [...availableColors, ...customColors];

  const addCustomColor = () => {
    if (!newColorName.trim()) return;

    const newColor = {
      name: newColorName.trim(),
      hex: newColorHex.trim(),
    };
    setCustomeColors((prev) => [...prev, newColor]);
    toggleColor(newColor.name); // auto-select it once added

    setNewColorName("");
    setNewColorHex("#000000");
    setShowColorPicker(false);
  };

  const addCategory = async () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    setCategoryError(null);

    const { data, error } = await supabase
      .from("categories")
      .insert({ name: trimmed })
      .select()
      .single();

    if (error) {
      setCategoryError(
        error.code === "23505"
          ? "That category already exists."
          : "Could not add category.",
      );
      return;
    }

    setCategories((prev) =>
      [...prev, data].sort((a, b) => a.name.localeCompare(b.name)),
    );
    setForm((prev) => ({ ...prev, category: data.name })); // auto-select the new one
    setNewCategoryName("");
    setShowAddCategory(false);
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading product...</p>;
  }

  return (
    <div className="mx-auto flex flex-col gap-6 font-montserrat">
      <button
        onClick={() => navigate("/admin/products")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 w-fit"
      >
        <ArrowLeft size={15} />
        Back to products
      </button>

      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          {isEditMode ? "Edit product" : "Add product"}
        </h1>
        <p className="text-sm text-gray-500">
          {isEditMode
            ? "Update the details for this product."
            : "Fill in the details to list a new product."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5"
      >
        {/* Image upload placeholder */}
        {/* <div>
          <label className="text-xs text-gray-500 block mb-2">
            Product image
          </label>
          <label className="w-full h-36 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 gap-1 cursor-pointer hover:border-gray-400">
            <Upload size={20} />
            <span className="text-xs">Click to upload</span>
            <input type="file" className="hidden" onChange={() => {}} />
          </label>
        </div> */}

        <div>
          <label className="text-xs text-gray-500 block mb-2">
            Product images
          </label>
          <div className="flex flex-wrap gap-3">
            {existingImageUrls.map((url, index) => (
              <div
                key={`existing-${index}`}
                className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group"
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}

            {imagePreviews.map((src, index) => (
              <div
                key={`new-${index}`}
                className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group"
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}

            <label className="w-24 h-24 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 gap-1 cursor-pointer hover:border-gray-400">
              <Upload size={18} />
              <span className="text-[10px]">Add</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Product name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Gold Layered Necklace"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Category</label>
            <div className="flex gap-2">
              <select
                value={form.category}
                onChange={handleChange("category")}
                className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              >
                <option value="" disabled>
                  select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowAddCategory(true)}
                className="px-3 border border-gray-200 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-700"
              >
                <Plus size={16} />
              </button>
            </div>

            {showAddCategory && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name"
                  className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="bg-black text-white text-xs font-medium px-3 py-2 rounded-md hover:bg-gray-800"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}
            {categoryError && (
              <p className="text-xs text-red-600 mt-1">{categoryError}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Status</label>
            <select
              value={form.status}
              onChange={handleChange("status")}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              Price (₦)
            </label>
            <input
              type="number"
              required
              min="0"
              value={form.price}
              onChange={handleChange("price")}
              placeholder="45000"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">
              Stock quantity
            </label>
            <input
              type="number"
              required
              min="0"
              value={form.stock}
              onChange={handleChange("stock")}
              placeholder="12"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="text-xs text-gray-500 block mb-2">
            Available sizes
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const isSelected = form.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`w-11 h-9 rounded-md border text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {errors.sizes && (
            <p className="text-xs text-red-600 mt-2">{errors.sizes}</p>
          )}
        </div>

        {/* Colors */}
        <div>
          <label className="text-xs text-gray-500 block mb-2">
            Available colors
          </label>
          <div className="flex flex-wrap gap-3">
            {allColors.map((color) => {
              const isSelected = form.colors.includes(color.name);
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => toggleColor(color.name)}
                  title={color.name}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <Check
                        size={14}
                        className={
                          color.hex === "#FFFFFF" || color.hex === "#E8DCC8"
                            ? "text-black"
                            : "text-white"
                        }
                      />
                    )}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {color.name}
                  </span>
                </button>
              );
            })}

            {/* Add custom color button */}
            <button
              type="button"
              onClick={() => setShowColorPicker(true)}
              className="flex flex-col items-center gap-1"
            >
              <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-500 hover:text-gray-600">
                <Plus size={16} />
              </span>
              <span className="text-[10px] text-gray-500">Add</span>
            </button>
          </div>

          {/* Custom color inline form */}
          {showColorPicker && (
            <div className="mt-3 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md p-3">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-9 h-9 rounded-md border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Color name (e.g. Emerald Green)"
                className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              />
              <button
                type="button"
                onClick={addCustomColor}
                className="bg-black text-white text-xs font-medium px-3 py-2 rounded-md hover:bg-gray-800"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowColorPicker(false)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
          {errors.colors && (
            <p className="text-xs text-red-600 mt-1">{errors.colors}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Description
          </label>
          <textarea
            rows={4}
            value={form.description}
            required
            onChange={handleChange("description")}
            placeholder="Brief description of the product..."
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400 resize-none"
          />
          {errors.description && (
            <p className="text-xs text-red-600 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="bg-black text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-gray-800"
          >
            {submitting
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
