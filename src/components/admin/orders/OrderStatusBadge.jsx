// components/admin/orders/OrderStatusBadge.jsx
const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  paid: "bg-blue-50 text-blue-700",
  shipped: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const OrderStatusBadge = ({ status }) => {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;
