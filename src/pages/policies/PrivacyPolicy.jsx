import { Shield, Database, Lock, Eye } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="bg-neutral-50 min-h-screen font-montserrat">
        {/* Header */}
        <div className="bg-neutral-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-8 h-8" />
              <h1 className="text-2xl md:text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-neutral-300 text-md">
              Your privacy matters to us
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-neutral-600 mb-8 leading-relaxed">
            FizzAura Luxury respects your privacy and is committed to protecting
            your personal data.
          </p>

          <div className="space-y-8">
            {/* Information We Collect */}
            <div className="bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Database className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Information We Collect
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Personal details (name, email, phone number, delivery
                        address)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Payment information (securely processed via third-party
                        payment gateways)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Website usage data (cookies and analytics)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Eye className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    How We Use Your Information
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>To process orders and deliver products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        To communicate updates, promotions, and customer support
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>To improve our website and services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-green-50 border border-green-200 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Data Protection
                  </h2>
                  <p className="text-neutral-600">
                    We do not sell or share your personal information with third
                    parties except where necessary to complete transactions.
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

export default PrivacyPolicy;
