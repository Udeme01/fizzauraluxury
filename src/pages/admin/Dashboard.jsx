// pages/admin/Dashboard.jsx
import { useState, useEffect } from "react";
import StatCard from "../../components/admin/dashboard/StatCard";
import VisitorsChart from "../../components/admin/dashboard/VisitorsChart";
import RecentOrdersList from "../../components/admin/dashboard/RecentOrdersList";
import BestSellingProducts from "../../components/admin/dashboard/BestSellingProducts";
import { supabase } from "../../services/supabaseClient";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    visitors: 0,
    clicks: 0,
  });
  const [visitorTrend, setVisitorTrend] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // 1. Orders from the last 7 days
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("order_number, customer_name, subtotal, status, created_at")
        .gte("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: false });

      let revenue = 0;
      let orderCount = 0;

      if (ordersError) {
        console.error("Error fetching orders for dashboard:", ordersError);
      } else {
        revenue = orders
          .filter((o) => o.status !== "cancelled")
          .reduce((sum, o) => sum + o.subtotal, 0);
        orderCount = orders.length;

        setRecentOrders(
          orders.slice(0, 5).map((o) => ({
            id: o.order_number,
            customer: o.customer_name,
            total: o.subtotal,
            status: o.status,
          })),
        );
      }

      // 2. Order items from the last 7 days, for best sellers
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
        const grouped = {};
        items.forEach((item) => {
          const key = item.product_id || item.name;
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

      // 3. Page views / WhatsApp clicks from the last 7 days
      const { data: events, error: eventsError } = await supabase
        .from("page_views")
        .select("session_id, event_type, created_at")
        .gte("created_at", sevenDaysAgo.toISOString());

      let visitors = 0;
      let clicks = 0;

      if (eventsError) {
        console.error("Error fetching page views for dashboard:", eventsError);
      } else {
        const pageViews = events.filter((e) => e.event_type === "page_view");
        visitors = new Set(pageViews.map((e) => e.session_id)).size;
        clicks = events.filter((e) => e.event_type === "whatsapp_click").length;

        const byDay = {};
        pageViews.forEach((view) => {
          const day = dayLabels[new Date(view.created_at).getDay()];
          if (!byDay[day]) byDay[day] = new Set();
          byDay[day].add(view.session_id);
        });

        setVisitorTrend(
          dayLabels.map((day) => ({
            day,
            visitors: byDay[day]?.size || 0,
          })),
        );
      }

      setStats({ revenue, orders: orderCount, visitors, clicks });
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
        <StatCard label="Total Visitors" value={stats.visitors} />
        <StatCard label="Total Clicks" value={stats.clicks} />
      </div>

      <VisitorsChart data={visitorTrend} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentOrdersList orders={recentOrders} />
        <BestSellingProducts products={bestSellers} />
      </div>
    </div>
  );
};

export default Dashboard;
