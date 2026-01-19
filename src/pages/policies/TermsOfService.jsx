import { FileText, Copyright, Ban, AlertCircle } from "lucide-react";

const TermsOfService = () => {
  return (
    <>
      <div className="bg-neutral-50 min-h-screen font-montserrat">
        {/* Header */}
        <div className="bg-neutral-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="w-8 h-8" />
              <h1 className="text-2xl md:text-4xl font-bold">
                Terms of Service
              </h1>
            </div>
            <p className="text-neutral-300 text-md">
              Please read these terms carefully before using our services
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-neutral-600 mb-8 leading-relaxed">
            By using the FizzAura Luxury website, you agree to the following
            terms:
          </p>

          <div className="space-y-8">
            {/* Intellectual Property */}
            <div className="bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Copyright className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Intellectual Property
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        All content on this website is the property of FizzAura
                        Luxury.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Unauthorized use of our brand assets is strictly
                        prohibited.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Product & Pricing */}
            <div className="bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Product & Pricing
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Prices and product availability are subject to change
                        without notice.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        We reserve the right to refuse service or cancel orders
                        at our discretion.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Prohibited Actions */}
            <div className="bg-red-50 border border-red-200 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Ban className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Prohibited Actions
                  </h2>
                  <p className="text-neutral-600 mb-3">
                    When using our website, you must not:
                  </p>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Violate any applicable laws or regulations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Infringe upon our intellectual property rights
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Attempt to interfere with the website's functionality
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Use our content without proper authorization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Copyright Notice */}
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

export default TermsOfService;
