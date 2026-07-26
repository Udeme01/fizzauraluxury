// components/admin/products/StockBadge.jsx
const StockBadge = ({ stock }) => {
  let label = "In stock";
  let style = "bg-green-50 text-green-700";

  if (stock === 0) {
    label = "Out of stock";
    style = "bg-red-50 text-red-700";
  } else if (stock <= 5) {
    label = "Low stock";
    style = "bg-amber-50 text-amber-700";
  }

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${style}`}>{label}</span>
  );
};

export default StockBadge;
