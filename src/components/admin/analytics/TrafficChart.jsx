// components/admin/analytics/TrafficChart.jsx
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const TrafficChart = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-4">Visitor trend — last 7 days</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#111827"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficChart;
