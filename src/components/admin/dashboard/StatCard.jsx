// components/admin/dashboard/StatCard.jsx
const StatCard = ({ label, value, prefix = "" }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 py-12">
      <p className="text-xs text-black mb-1">{label}</p>
      <p className="text-2xl font-semibold text-black">
        {prefix}
        {value.toLocaleString()}
      </p>
    </div>
  );
};

export default StatCard;
