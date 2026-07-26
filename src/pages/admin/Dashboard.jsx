// pages/admin/Dashboard.jsx
import StatCard from "../../components/admin/dashboard/StatCard";
import VisitorsChart from "../../components/admin/dashboard/VisitorsChart";
import RecentOrdersList from "../../components/admin/dashboard/RecentOrdersList";
import BestSellingProducts from "../../components/admin/dashboard/BestSellingProducts";
import {
  mockStats,
  mockVisitorTrend,
  mockRecentOrders,
  mockBestSellers,
} from "../../data/mockDashboard";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 font-montserrat">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500">Last 7 days</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={mockStats.revenue} prefix="₦" />
        <StatCard label="Total Orders" value={mockStats.orders} />
        <StatCard label="Total Visitors" value={mockStats.visitors} />
        <StatCard label="Total Clicks" value={mockStats.clicks} />
      </div>

      <VisitorsChart data={mockVisitorTrend} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentOrdersList orders={mockRecentOrders} />
        <BestSellingProducts products={mockBestSellers} />
      </div>
    </div>
  );
};

export default Dashboard;
