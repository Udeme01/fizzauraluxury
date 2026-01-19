import { Cookie, BarChart, Settings, Info } from "lucide-react";

const CookiePolicy = () => {
  return (
    <>
      <div className="bg-neutral-50 min-h-screen font-montserrat">
        {/* Header */}
        <div className="bg-neutral-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <Cookie className="w-8 h-8" />
              <h1 className="text-2xl md:text-4xl font-bold">Cookie Policy</h1>
            </div>
            <p className="text-neutral-300 text-md">
              How we use cookies to enhance your experience
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-neutral-600 mb-8 leading-relaxed">
            FizzAura Luxury uses cookies to improve website functionality,
            analyze traffic, and personalize your shopping experience.
          </p>

          <div className="space-y-8">
            {/* What Are Cookies */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    What Are Cookies?
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    Cookies are small text files stored on your device when you
                    visit our website. They help us remember your preferences
                    and improve your browsing experience.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Cookies */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Cookie className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    How We Use Cookies
                  </h2>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Improve website functionality</strong> - Keep
                        you logged in, remember your preferences
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Analyze traffic and user behavior</strong> -
                        Understand how visitors use our site
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Personalize your shopping experience</strong> -
                        Show relevant products and offers
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-blue-50 border border-blue-200 p-6 md:p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <BarChart className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Analytics & Performance
                  </h2>
                  <p className="text-neutral-600">
                    We use analytics cookies to understand how visitors interact
                    with our website. This helps us improve our services and
                    provide a better shopping experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Settings className="w-6 h-6 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    Managing Cookies
                  </h2>
                  <p className="text-neutral-600 mb-3">
                    By using our website, you consent to the use of cookies. You
                    may disable cookies through your browser settings, however
                    this may affect website functionality.
                  </p>
                  <p className="text-neutral-600">
                    To learn how to manage cookies in your browser, visit your
                    browser's help section.
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

export default CookiePolicy;
