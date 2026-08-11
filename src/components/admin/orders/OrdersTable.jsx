// components/admin/orders/OrdersTable.jsx
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";

const OrdersTable = ({ orders }) => {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
        <p className="text-sm text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900 font-medium">
                  #{order.id}
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-900">{order.customer}</p>
                  <p className="text-xs text-gray-400">{order.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{order.items}</td>
                <td className="px-4 py-3 text-gray-900">
                  ₦{order.total.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-gray-500">{order.date}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Eye size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
