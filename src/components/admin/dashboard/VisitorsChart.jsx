// components/admin/dashboard/VisitorsChart.jsx
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const VisitorsChart = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-4">Visitors this week</p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "#f3f4f6" }}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Bar dataKey="visitors" fill="#111827" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;
