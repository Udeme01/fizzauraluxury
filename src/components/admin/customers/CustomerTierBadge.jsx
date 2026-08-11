// components/admin/customers/CustomerTierBadge.jsx
const CustomerTierBadge = ({ totalOrders }) => {
  if (totalOrders >= 5) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
        VIP
      </span>
    );
  }
  if (totalOrders >= 2) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
        Repeat
      </span>
    );
  }
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      New
    </span>
  );
};

export default CustomerTierBadge;
