// components/admin/analytics/TrafficSources.jsx
const TrafficSources = ({ sources }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-4">Traffic sources</p>
      <div className="flex flex-col gap-3">
        {sources.map((s) => (
          <div key={s.source}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{s.source}</span>
              <span className="text-gray-400">{s.visits} visits</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full"
                style={{ width: `${s.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSources;
