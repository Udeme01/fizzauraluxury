import { Truck, Clock, MapPin, AlertCircle } from "lucide-react";

const ShippingDelivery = () => {
  return (
    <>
      <div className="bg-neutral-50 min-h-screen font-montserrat">
        {/* Header */}
        <div className="bg-neutral-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Shipping & Delivery Policy
            </h1>
            <p className="text-neutral-300 text-md">
              Fast, reliable delivery to your doorstep
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="space-y-8">
            {/* Processing Time */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Processing Time
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Orders are processed within 1-3 business days after
                        payment confirmation.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Orders placed on weekends or public holidays are
                        processed the next business day.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Delivery Time
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Within Nigeria:</strong> 3-5 business days
                        depending on location.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>International Orders:</strong> 7-14 business
                        days depending on destination and customs clearance.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Shipping Fees */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Shipping Fees
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Shipping fees are calculated at checkout based on
                        location and order size.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Promotional free-shipping offers may apply during
                        special campaigns.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Delays */}
            <div className="bg-amber-50 border border-amber-200 p-6 md:p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Delays
                  </h2>
                  <p className="text-neutral-600">
                    FizzAura Luxury is not responsible for delays caused by
                    courier services, customs, weather conditions, or other
                    factors beyond our control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingDelivery;
