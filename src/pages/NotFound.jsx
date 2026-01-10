// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { Home, ShoppingBag, Search, ArrowRight } from "lucide-react";

const NotFound = () => {
  const quickLinks = [
    {
      icon: Home,
      title: "Go Home",
      description: "Back to homepage",
      link: "/",
      color: "bg-primary-600 hover:bg-primary-700",
    },
    {
      icon: ShoppingBag,
      title: "Shop Now",
      description: "Browse products",
      link: "/shop",
      color: "bg-accent-500 hover:bg-accent-600",
    },
    {
      icon: Search,
      title: "Contact Us",
      description: "Need help?",
      link: "/contact",
      color: "bg-neutral-900 hover:bg-neutral-800",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] lg:text-[250px] font-bold text-neutral-200 leading-none select-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-12 -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-neutral-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 mx-auto">
            The page you're looking for seems to have wandered off. Don't worry,
            even the best explorers get lost sometimes.
          </p>
        </div>

        {/* Quick Links Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.link}
                to={item.link}
                className="group bg-white rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 ${item.color} rounded-xl flex items-center justify-center mb-4 mx-auto transition-colors`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                  {item.description}
                  <ArrowRight className="w-4 h-4" />
                </p>
              </Link>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-12">
          <p className="text-sm sm:text-base text-neutral-500">
            Still can't find what you're looking for?{" "}
            <Link
              to="/contact"
              className="text-primary-600 hover:text-primary-700 underline font-medium"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
