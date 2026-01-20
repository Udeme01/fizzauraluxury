// src/components/home/PromoBanner.jsx
import { useState, useEffect } from "react";
import Button from "../common/Button";
import { fetchPromoBanner } from "../../lib/fetchProducts";

const PromoBanner = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanner = async () => {
      setLoading(true);
      const data = await fetchPromoBanner();
      setBanner(data);
      setLoading(false);
    };

    loadBanner();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="w-full bg-neutral-800 overflow-hidden font-montserrat">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:py-8 lg:py-16 xl:py-24">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  // No banner or inactive
  if (!banner) {
    return null; // Don't render anything if no active banner
  }

  return (
    <section
      className="w-full overflow-hidden font-montserrat my-16 md:my-20"
      style={{ backgroundColor: banner.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:py-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center py-10 md:py-0">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8 z-10">
            {/* Small Tag */}
            <p className="text-white text-sm font-medium uppercase tracking-wider">
              {banner.tagLine}
            </p>

            {/* Main Heading */}
            <h2 className="text-2xl font-medium text-white leading-snug lg:text-3xl xl:text-4xl xl:font-semibold">
              {banner.mainHeading}
            </h2>

            {/* Subheading */}
            <p className="text-white/90 text-md">{banner.subheading}</p>

            {/* CTA Button */}
            <Button to={banner.buttonLink} variant="primary" size="md">
              {banner.buttonText}
            </Button>
          </div>

          {/* Right Side - Product Image with Seamless Blend */}
          <div className="relative flex items-center justify-center lg:justify-end h-full min-h-100 md:min-h-125">
            {/* Radial gradient that blends with background */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
              <div className="w-87.5 h-87.5 md:w-112.5 md:h-112.5 lg:w-137.5 lg:h-137.5 bg-gradient-radial from-neutral-700/40 via-neutral-800/20 to-transparent"></div>
            </div>

            {/* Product Image with gradient mask overlay for seamless blend */}
            <div className="relative z-10">
              <img
                src={banner.productImage}
                alt={banner.mainHeading}
                className="w-70 sm:w-87.5 md:w-100 lg:w-112.5 xl:w-125 object-contain"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
