// components/admin/analytics/DeviceBreakdown.jsx
const DeviceBreakdown = ({ devices }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-4">Devices</p>
      <div className="flex flex-col gap-4">
        {devices.map((d) => (
          <div key={d.device} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{d.device}</span>
            <span className="text-sm font-medium text-gray-900">
              {d.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceBreakdown;
