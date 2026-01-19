import { AlertTriangle, Monitor, Ruler, Shield } from "lucide-react";

const Disclaimer = () => {
  return (
    <>
      <div className="bg-neutral-50 min-h-screen font-montserrat">
        {/* Header */}
        <div className="bg-neutral-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="w-8 h-8" />
              <h1 className="text-2xl md:text-4xl font-bold">Disclaimer</h1>
            </div>
            <p className="text-neutral-300 text-md">
              Important information about our products and services
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="space-y-8">
            {/* Product Colors */}
            <div className="bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Monitor className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Product Colors & Display
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    Product colors may appear slightly different due to lighting
                    conditions, photography settings, or screen display
                    variations. We strive to represent our products as
                    accurately as possible, but please be aware that actual
                    colors may vary slightly from what you see on your device.
                  </p>
                </div>
              </div>
            </div>

            {/* Sizing */}
            <div className="bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Ruler className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Sizing Responsibility
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    FizzAura Luxury is not responsible for sizing errors if our
                    size guide is not followed. We strongly recommend referring
                    to our detailed size chart before placing an order to ensure
                    the perfect fit. All measurements are provided to help you
                    make an informed decision.
                  </p>
                </div>
              </div>
            </div>

            {/* Information Accuracy */}
            <div className="bg-amber-50 border border-amber-200 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Information Accuracy
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-3">
                    Information on this website is provided "as is" without
                    warranties of any kind, either express or implied.
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    While we make every effort to ensure the accuracy of product
                    information, descriptions, pricing, and availability, we
                    cannot guarantee that all information is complete, accurate,
                    reliable, current, or error-free.
                  </p>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Limitation of Liability
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    FizzAura Luxury shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages
                    resulting from your use of our website or products. This
                    includes but is not limited to loss of profits, data, or
                    other intangible losses.
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="bg-neutral-900 text-white p-6 md:p-8 text-center">
              <p className="text-lg">
                © {new Date().getFullYear()} FizzAura Luxury. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
