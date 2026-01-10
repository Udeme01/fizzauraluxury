// src/components/home/PromoBanner.jsx
import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <section className="w-full bg-neutral-800 overflow-hidden font-montserrat">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:py-8 lg:py-16 xl:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center py-10 md:py-0">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8 z-10">
            {/* Small Tag */}
            <p className="text-white text-sm font-medium uppercase">
              Styled Right
            </p>

            {/* Main Heading */}
            <h2 className="text-2xl font-medium text-white leading-snug lg:text-3xl xl:text-4xl xl:font-semibold">
              Because Fashion Speaks <br />
              Louder Than Words
            </h2>

            {/* Subheading */}
            <p className="text-white/90 text-md">
              Elegant Design — High Quality Materials. Buy Now!
            </p>

            {/* CTA Button */}
            <div>
              <Link
                to="/shop"
                className="inline-block bg-white text-neutral-900 px-8 py-4 font-semibold text-xs uppercase tracking-wider hover:bg-neutral-black hover:text-neutral-white transition-colors duration-300 cursor-pointer"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Side - Product Image with Circle */}
          <div className="relative flex items-center justify-center lg:justify-center h-full">
            {/* Large White Circle Background */}
            <div className=" bg-white/1 w-90 h-90 sm:w-110 sm:h-110 md:w-80 md:h-80 lg:w-110 lg:h-110 xl:w-150 xl:h-150 rounded-full right-0 lg:-right-32 shadow-2xl" />

            {/* Product Image */}
            <img
              src="/images/hero/h3.png"
              alt="Fashion product showcase"
              className="absolute bottom-0 z-10 w-70 sm:w-80 md:w-60 lg:w-80 xl:w-120 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
