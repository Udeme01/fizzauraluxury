// pages/admin/OrderDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../../services/supabaseClient";
import OrderStatusBadge from "../../components/admin/orders/OrderStatusBadge";
import OrderStatusTimeline from "../../components/admin/orders/OrderStatusTimeline";

const statusOptions = ["pending", "paid", "shipped", "cancelled"];

const OrderDetail = () => {
  const { id } = useParams(); // this is the order_number from the URL, e.g. "FL-1016"
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*), order_status_history(*)")
        .eq("order_number", id)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
        setOrder(null);
      } else {
        const mapped = {
          dbId: data.id, // real uuid — needed later for updates
          id: data.order_number,
          date: new Date(data.created_at).toLocaleDateString(),
          status: data.status,
          customer: {
            name: data.customer_name,
            email: data.customer_email,
            phone: data.customer_phone,
          },
          shippingAddress: data.shipping_address,
          items: data.order_items.map((item) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
            price: item.price,
          })),
          timeline: data.order_status_history
            .slice()
            .sort((a, b) => new Date(a.changed_at) - new Date(b.changed_at))
            .map((entry) => ({
              status: entry.status,
              date: new Date(entry.changed_at).toLocaleString(),
            })),
        };

        setOrder(mapped);
        setStatus(mapped.status);
      }

      setLoading(false);
    };

    loadOrder();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const previousStatus = status;

    setStatus(newStatus);
    setUpdating(true);

    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", order.dbId);

    if (updateError) {
      console.error("Failed to update order status:", updateError);
      setStatus(previousStatus);
      setUpdating(false);
      return;
    }

    const { data: historyRow, error: historyError } = await supabase
      .from("order_status_history")
      .insert({ order_id: order.dbId, status: newStatus })
      .select()
      .single();

    if (historyError) {
      console.error("Failed to log status history:", historyError);
    } else {
      setOrder((prev) => ({
        ...prev,
        status: newStatus,
        timeline: [
          ...prev.timeline,
          {
            status: historyRow.status,
            date: new Date(historyRow.changed_at).toLocaleString(),
          },
        ],
      }));
    }

    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
        <p className="text-sm text-gray-500">Order not found.</p>
      </div>
    );
  }

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => navigate("/admin/orders")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 w-fit"
      >
        <ArrowLeft size={15} />
        Back to orders
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Order #{order.id}
          </h1>
          <p className="text-sm text-gray-500">Placed on {order.date}</p>
        </div>
        <OrderStatusBadge status={status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-3">Items</p>
            <div className="flex flex-col divide-y divide-gray-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gray-100 shrink-0" />
                    <div>
                      <p className="text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="text-gray-900">
                    ₦{(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between text-sm font-medium">
              <span className="text-gray-600">Total</span>
              <span className="text-gray-900">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-3">Customer</p>
            <p className="text-sm text-gray-900">{order.customer.name}</p>
            <p className="text-sm text-gray-500">{order.customer.email}</p>
            <p className="text-sm text-gray-500">{order.customer.phone}</p>

            <p className="text-xs text-gray-500 mt-4 mb-1">Shipping address</p>
            <p className="text-sm text-gray-700">{order.shippingAddress}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-2">Update status</p>
            <select
              value={status}
              onChange={handleStatusChange}
              disabled={updating}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400 capitalize disabled:opacity-50"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-3">Order timeline</p>
            <OrderStatusTimeline timeline={order.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
