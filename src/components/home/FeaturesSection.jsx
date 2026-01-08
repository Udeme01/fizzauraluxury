// src/components/home/FeaturesSection.jsx
import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick delivery within Lagos and beyond",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "100% secure and trusted",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Hassle-free 7-day return policy",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help you",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
