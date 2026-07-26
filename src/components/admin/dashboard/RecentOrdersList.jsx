// components/admin/dashboard/RecentOrdersList.jsx
const statusStyles = {
  paid: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  shipped: "bg-blue-50 text-blue-700",
};

const RecentOrdersList = ({ orders }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-3">Recent orders</p>
      <div className="flex flex-col divide-y divide-gray-100">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-2.5 text-sm"
          >
            <div>
              <p className="text-gray-900">{order.customer}</p>
              <p className="text-xs text-gray-400">#{order.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">
                ₦{order.total.toLocaleString()}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrdersList;
