// pages/admin/Products.jsx
import { useState, useMemo, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import ProductsTable from "../../components/admin/products/ProductsTable";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("error fetching products", error);
        setLoading(false);
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  const handleDelete = async (product) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      console.error("error deleting product", error);
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading products...</p>;
  }

  return (
    <div className="flex flex-col gap-6 font-montserrat">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 && "s"}
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products/new")}
          className="flex items-center justify-center gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800 w-full sm:w-auto"
        >
          <Plus size={16} />
          Add product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-3 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-gray-400"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <ProductsTable
        products={filteredProducts}
        onEdit={(product) => navigate(`/admin/products/${product.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Products;
