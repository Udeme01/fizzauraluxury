// components/admin/orders/OrderStatusTimeline.jsx
import OrderStatusBadge from "./OrderStatusBadge";

const OrderStatusTimeline = ({ timeline }) => {
  return (
    <div className="flex flex-col gap-4">
      {timeline.map((step, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-black" />
            {index !== timeline.length - 1 && (
              <div className="w-px flex-1 bg-gray-200 mt-1" />
            )}
          </div>
          <div className="pb-4">
            <OrderStatusBadge status={step.status} />
            <p className="text-xs text-gray-400 mt-1">{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusTimeline;
