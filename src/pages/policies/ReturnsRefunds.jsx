import { RotateCcw, XCircle, DollarSign, AlertTriangle } from "lucide-react";

const ReturnsRefunds = () => {
  return (
    <>
      <div className="bg-neutral-50 min-h-screen font-montserrat">
        {/* Header */}
        <div className="bg-neutral-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Returns & Refunds Policy
            </h1>
            <p className="text-neutral-300 text-md">
              We want you to love your purchase
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="space-y-8">
            {/* Returns */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <RotateCcw className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Returns
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Items must be returned within <strong>7 days</strong> of
                        delivery.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Products must be unused, unworn, unwashed, and in
                        original packaging with tags intact.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Items purchased on sale or during promotions are
                        non-returnable unless defective.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Returnable Items */}
            <div className="bg-red-50 border border-red-200 p-6 md:p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Non-Returnable Items
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Innerwear or customized products.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Items damaged due to misuse or improper handling.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Refunds */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Refunds
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Approved refunds will be processed within{" "}
                        <strong>7-14 business days</strong>.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Refunds are issued via the original payment method.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Shipping fees are non-refundable.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-amber-50 border border-amber-200 p-6 md:p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    Refund Eligibility
                  </h3>
                  <p className="text-neutral-600 mb-3">
                    Refunds are only applicable when:
                  </p>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        An item is defective or damaged upon delivery.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>An incorrect item was sent.</span>
                    </li>
                  </ul>
                  <p className="text-neutral-600 mt-3">
                    Refund requests must be made within{" "}
                    <strong>48 hours</strong> of receiving the order with clear
                    photo or video evidence.
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

export default ReturnsRefunds;
