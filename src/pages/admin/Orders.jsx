// pages/admin/Orders.jsx
import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import OrdersTable from "../../components/admin/orders/OrdersTable";

import { supabase } from "../../services/supabaseClient";

const statusTabs = ["all", "pending", "paid", "shipped", "cancelled"];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(count)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } else {
        // Reshape to match what OrdersTable already expects
        const mapped = data.map((row) => ({
          id: row.order_number,
          customer: row.customer_name,
          email: row.customer_email,
          items: row.order_items?.[0]?.count ?? 0,
          total: row.subtotal,
          status: row.status,
          date: row.created_at,
        }));
        setOrders(mapped);
        // console.log(mapped);
      }
      setLoading(false);
    };

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" || order.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [orders, searchTerm, activeTab]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500">
          {filteredOrders.length} order{filteredOrders.length !== 1 && "s"}
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 border-b border-gray-200 overflow-x-auto">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm capitalize whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? "border-black text-gray-900 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer or order ID..."
          className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-gray-400"
        />
      </div>

      <OrdersTable orders={filteredOrders} />
    </div>
  );
};

export default Orders;
