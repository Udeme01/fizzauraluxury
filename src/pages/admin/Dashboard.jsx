// // pages/admin/Dashboard.jsx
// import StatCard from "../../components/admin/dashboard/StatCard";
// import VisitorsChart from "../../components/admin/dashboard/VisitorsChart";
// import RecentOrdersList from "../../components/admin/dashboard/RecentOrdersList";
// import BestSellingProducts from "../../components/admin/dashboard/BestSellingProducts";
// import {
//   mockStats,
//   mockVisitorTrend,
//   mockRecentOrders,
//   mockBestSellers,
// } from "../../data/dashboard/mockDashboard";

// const Dashboard = () => {
//   return (
//     <div className="flex flex-col gap-6 font-montserrat">
//       <div>
//         <h1 className="text-lg font-semibold text-gray-900">Overview</h1>
//         <p className="text-sm text-gray-500">Last 7 days</p>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard label="Total Revenue" value={mockStats.revenue} prefix="₦" />
//         <StatCard label="Total Orders" value={mockStats.orders} />
//         <StatCard label="Total Visitors" value={mockStats.visitors} />
//         <StatCard label="Total Clicks" value={mockStats.clicks} />
//       </div>

//       <VisitorsChart data={mockVisitorTrend} />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <RecentOrdersList orders={mockRecentOrders} />
//         <BestSellingProducts products={mockBestSellers} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// pages/admin/Dashboard.jsx
import { useState, useEffect } from "react";
import StatCard from "../../components/admin/dashboard/StatCard";
import VisitorsChart from "../../components/admin/dashboard/VisitorsChart";
import RecentOrdersList from "../../components/admin/dashboard/RecentOrdersList";
import BestSellingProducts from "../../components/admin/dashboard/BestSellingProducts";
import { supabase } from "../../services/supabaseClient";
import { mockVisitorTrend } from "../../data/dashboard/mockDashboard"; // kept as a placeholder — see note below

const Dashboard = () => {
  const [stats, setStats] = useState({ revenue: 0, orders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // 1. Orders from the last 7 days — powers revenue, order count, recent orders
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("order_number, customer_name, subtotal, status, created_at")
        .gte("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error("Error fetching orders for dashboard:", ordersError);
      } else {
        // Revenue = everything except cancelled orders.
        // Change this filter to status === "paid" if you'd rather
        // only count confirmed payments as revenue.
        const revenue = orders
          .filter((o) => o.status !== "cancelled")
          .reduce((sum, o) => sum + o.subtotal, 0);

        setStats({ revenue, orders: orders.length });

        setRecentOrders(
          orders.slice(0, 5).map((o) => ({
            id: o.order_number,
            customer: o.customer_name,
            total: o.subtotal,
            status: o.status,
          })),
        );
      }

      // 2. Order items from the last 7 days, joined to their order's status
      //    (to exclude cancelled orders) and the product's image.
      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select(
          "product_id, name, price, qty, products(image_urls), orders!inner(status, created_at)",
        )
        .neq("orders.status", "cancelled")
        .gte("orders.created_at", sevenDaysAgo.toISOString());

      if (itemsError) {
        console.error("Error fetching order items for dashboard:", itemsError);
      } else {
        // Group items by product, summing quantity and revenue across orders
        const grouped = {};
        items.forEach((item) => {
          const key = item.product_id || item.name; // fallback if product was deleted
          if (!grouped[key]) {
            grouped[key] = {
              id: key,
              name: item.name,
              unitsSold: 0,
              revenue: 0,
              image: item.products?.image_urls?.[0] || "",
            };
          }
          grouped[key].unitsSold += item.qty;
          grouped[key].revenue += item.price * item.qty;
        });

        const ranked = Object.values(grouped)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 4);

        setBestSellers(ranked);
      }

      setLoading(false);
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-montserrat">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500">Last 7 days</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={stats.revenue} prefix="₦" />
        <StatCard label="Total Orders" value={stats.orders} />
        {/* Placeholders — no visitor/click tracking exists yet.
            Wire these to a real count once an analytics table exists. */}
        <StatCard label="Total Visitors" value={0} />
        <StatCard label="Total Clicks" value={0} />
      </div>

      {/* Still mock — same reason as above, kept so the layout/chart
          component is ready to receive real data later. */}
      <VisitorsChart data={mockVisitorTrend} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentOrdersList orders={recentOrders} />
        <BestSellingProducts products={bestSellers} />
      </div>
    </div>
  );
};

export default Dashboard;
