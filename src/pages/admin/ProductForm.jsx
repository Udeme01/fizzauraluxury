// pages/admin/ProductForm.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { mockCategories } from "../../data/category/mockCategories";
import { mockProducts } from "../../data/dashboard/mockDashboard";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // present only when editing
  const isEditMode = Boolean(id);

  const existingProduct = isEditMode
    ? mockProducts.find((p) => p.id === id)
    : null;

  const [form, setForm] = useState({
    name: existingProduct?.name || "",
    category: existingProduct?.category || mockCategories[0],
    price: existingProduct?.price || "",
    stock: existingProduct?.stock ?? "",
    status: existingProduct?.status || "active",
    description: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("saving product:", form);
    navigate("/admin/products");
  };

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
        <div>
          <label className="text-xs text-gray-500 block mb-2">
            Product image
          </label>
          <div className="w-full h-36 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 gap-1 cursor-pointer hover:border-gray-400">
            <Upload size={20} />
            <span className="text-xs">Click to upload</span>
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Category</label>
            <select
              value={form.category}
              onChange={handleChange("category")}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            >
              {mockCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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

        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Description
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Brief description of the product..."
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400 resize-none"
          />
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
            className="bg-black text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-gray-800"
          >
            {isEditMode ? "Save changes" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
