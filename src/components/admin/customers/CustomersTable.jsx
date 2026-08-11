// components/admin/customers/CustomersTable.jsx
import { useNavigate } from "react-router-dom";
import CustomerTierBadge from "./CustomerTierBadge";

const CustomersTable = ({ customers }) => {
  const navigate = useNavigate();

  if (customers.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
        <p className="text-sm text-gray-500">No customers found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Orders</th>
              <th className="px-4 py-3 font-medium">Total spent</th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => navigate(`/admin/customers/${customer.id}`)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-3">
                  <p className="text-gray-900">{customer.name}</p>
                  <p className="text-xs text-gray-400">{customer.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {customer.totalOrders}
                </td>
                <td className="px-4 py-3 text-gray-900">
                  ₦{customer.totalSpent.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <CustomerTierBadge totalOrders={customer.totalOrders} />
                </td>
                <td className="px-4 py-3 text-gray-500">{customer.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;
