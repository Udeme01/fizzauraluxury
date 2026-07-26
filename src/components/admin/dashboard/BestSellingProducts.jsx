// components/admin/dashboard/BestSellingProducts.jsx
const BestSellingProducts = ({ products }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-3">Best selling products</p>
      <div className="flex flex-col divide-y divide-gray-100">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between py-2.5 text-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs text-gray-400 w-4 shrink-0">
                {index + 1}
              </span>
              <div className="w-9 h-9 rounded-md bg-gray-100 shrink-0">
                <img src={product.image} alt="bestseller product image" />
              </div>
              <p className="text-gray-900 truncate">{product.name}</p>
            </div>

            <div className="flex flex-col items-end shrink-0 ml-3">
              <span className="text-gray-900">
                ₦{product.revenue.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">
                {product.unitsSold} sold
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
