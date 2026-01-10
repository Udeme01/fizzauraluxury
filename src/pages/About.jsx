// src/pages/About.jsx
import { Link } from "react-router-dom";
import { Award, Target, Eye, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Confidence",
      description: "Every piece should empower the wearer",
    },
    {
      icon: Target,
      title: "Intentionality",
      description: "Nothing is random; every design has meaning",
    },
    {
      icon: Eye,
      title: "Timelessness",
      description: "Pieces that outlive trends",
    },
    {
      icon: Heart,
      title: "Authenticity",
      description: "Staying true to culture and self-expression",
    },
  ];

  return (
    <div className="bg-white font-montserrat">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] bg-neutral-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            About FizzAura Luxury
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Where presence meets style
          </p>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 leading-relaxed">
            FizzAura Luxury is for people whose presence is felt before they
            speak.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <img
                src="/images/brand/about-image.jpg"
                alt="FizzAura Luxury Brand"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Our Story
              </h2>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                FizzAura Luxury was born from a long-standing passion for
                creating clothing that looks good and feels different. From
                making hoodies and joggers during school years to refining the
                craft, the vision evolved into building a brand focused on
                quality, confidence, and timeless appeal.
              </p>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                The goal was simple: upgrade streetwear into intentional pieces
                that do not rely on trends, but instead define identity. We
                believe streetwear is more than clothing — it is identity,
                attitude, and expression.
              </p>
              <div className="pt-4">
                <Link
                  to="/shop"
                  className="inline-block bg-neutral-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Name Meaning */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
            What FizzAura Means
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-8 bg-neutral-50 rounded-2xl">
              <h3 className="text-6xl md:text-7xl font-bold text-accent-500 mb-4">
                FIZZ
              </h3>
              <p className="text-neutral-700 text-lg">
                Energy, boldness, spark
              </p>
            </div>
            <div className="text-center p-8 bg-neutral-50 rounded-2xl">
              <h3 className="text-6xl md:text-7xl font-bold text-primary-600 mb-4">
                AURA
              </h3>
              <p className="text-neutral-700 text-lg">
                Presence, influence, identity
              </p>
            </div>
          </div>
          <p className="text-center text-neutral-600 mt-8 text-base md:text-lg">
            FizzAura Luxury represents individuals whose aura speaks before
            words do.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                To design intentional, wearable, and bold streetwear pieces that
                allow individuals to express identity, confidence, and presence
                effortlessly.
              </p>
            </div>

            {/* Vision */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                To become a globally recognized luxury streetwear brand that
                represents presence, culture, and confidence without
                explanation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="text-center p-6 bg-neutral-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Founder Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl">
                  <img
                    src="/images/brand/founder.jpg"
                    alt="Binuyo Feranmi Jeremiah - Founder & CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Founder Info */}
            <div className="space-y-6 text-center lg:text-left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                  Binuyo Feranmi Jeremiah
                </h2>
                <p className="text-primary-600 text-lg font-semibold uppercase tracking-wider">
                  Founder & CEO
                </p>
              </div>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                Binuyo Feranmi Jeremiah is the Founder and CEO of FizzAura
                Luxury, a fashion label built on culture, confidence, and
                originality. With a strong creative eye and business mindset, he
                leads the brand's vision from concept to collection.
              </p>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                Inspired by street culture, lifestyle, and modern expression,
                Binuyo positions the brand as more than clothing — it is an
                identity. His approach focuses on quality, storytelling, and
                designs that connect emotionally with a new generation of
                style-conscious individuals.
              </p>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                As CEO, he is committed to building a fashion brand that stands
                out, evolves with culture, and leaves a lasting imprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Personality */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
            Brand Personality
          </h2>
          <div className="bg-neutral-900 text-white p-8 md:p-12 rounded-2xl">
            <p className="text-lg md:text-xl mb-6 text-center">
              If FizzAura Luxury were a person, it would be:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="font-semibold text-lg">Confident</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="font-semibold text-lg">Calm but Powerful</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="font-semibold text-lg">Minimal yet Bold</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="font-semibold text-lg">Intentional</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="font-semibold text-lg">Culture-Aware</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="font-semibold text-lg">Timeless</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-accent-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Define Your Presence?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            Explore our collection of timeless pieces designed for the confident
            individual.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-neutral-900 px-10 py-4 rounded-full font-semibold text-lg hover:bg-neutral-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
