// pages/admin/CustomerDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { mockCustomerDetails } from "../../data/customers/mockCustomerDetails";
import OrderStatusBadge from "../../components/admin/orders/OrderStatusBadge";
import CustomerTierBadge from "../../components/admin/customers/CustomerTierBadge";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = mockCustomerDetails[id];

  if (!customer) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
        <p className="text-sm text-gray-500">Customer not found.</p>
      </div>
    );
  }

  const totalOrders = customer.orders.length;
  const totalSpent = customer.orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => navigate("/admin/customers")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 w-fit"
      >
        <ArrowLeft size={15} />
        Back to customers
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {customer.name}
          </h1>
          <p className="text-sm text-gray-500">
            Customer since {customer.joined}
          </p>
        </div>
        <CustomerTierBadge totalOrders={totalOrders} />
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Total orders</p>
          <p className="text-xl font-semibold text-gray-900">{totalOrders}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Total spent</p>
          <p className="text-xl font-semibold text-gray-900">
            ₦{totalSpent.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order history — 2/3 width */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-3">Order history</p>
          <div className="flex flex-col divide-y divide-gray-100">
            {customer.orders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/admin/orders/${order.id}`)}
                className="flex items-center justify-between py-3 text-sm cursor-pointer hover:bg-gray-50 -mx-4 px-4"
              >
                <div>
                  <p className="text-gray-900">#{order.id}</p>
                  <p className="text-xs text-gray-400">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-900">
                    ₦{order.total.toLocaleString()}
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact info — 1/3 width */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-3">Contact info</p>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-gray-900">{customer.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className="text-gray-900">{customer.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Address</p>
              <p className="text-gray-900">{customer.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
