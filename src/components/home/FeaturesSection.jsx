// src/components/home/FeaturesSection.jsx
import { features } from "../../data/products";

const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-16 bg-neutral-50 font-montserrat">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 bg-white hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>

                {/* Title */}
                <h3 className="font-medium text-lg text-neutral-900 mb-2">
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