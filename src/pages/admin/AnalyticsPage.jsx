// pages/admin/Analytics.jsx
import TrafficChart from "../../components/admin/analytics/TrafficChart";
import TrafficSources from "../../components/admin/analytics/TrafficSources";
import TopPagesTable from "../../components/admin/analytics/TopPagesTable";
import DeviceBreakdown from "../../components/admin/analytics/DeviceBreakdown";
import {
  mockDeviceBreakdown,
  mockTopPages,
  mockTrafficSources,
  mockTrafficTrend,
} from "../../data/analytics/mockAnalytics";

const AdminAnalytics = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Website traffic and engagement</p>
      </div>

      <TrafficChart data={mockTrafficTrend} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TopPagesTable pages={mockTopPages} />
        </div>
        <div className="flex flex-col gap-6">
          <TrafficSources sources={mockTrafficSources} />
          <DeviceBreakdown devices={mockDeviceBreakdown} />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
