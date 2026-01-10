// src/pages/Contact.jsx
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = "2348012345678"; // Replace with your WhatsApp number

    // Open WhatsApp
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      value: "+234 801 234 5678",
      link: "tel:+2348012345678",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@fizzauraluxury.com",
      link: "mailto:info@fizzauraluxury.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Lagos, Nigeria",
      link: "#",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+234 801 234 5678",
      link: "https://wa.me/2348012345678",
    },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-neutral-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={method.title}
                      href={method.link}
                      className="flex items-start gap-4 group hover:text-primary-600 transition-colors"
                      target={
                        method.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        method.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                        <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {method.title}
                        </h3>
                        <p className="text-neutral-600 text-sm group-hover:text-primary-600 transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Follow Us
              </h2>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/fizzauraluxury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/fizzauraluxury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/fizzauraluxury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Business Hours
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Monday - Friday</span>
                  <span className="font-semibold text-neutral-900">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Saturday</span>
                  <span className="font-semibold text-neutral-900">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Sunday</span>
                  <span className="font-semibold text-neutral-900">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="johndoe@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us what you need..."
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send via WhatsApp
                  </button>
                  <p className="text-xs text-neutral-500 mt-3 text-center">
                    Your message will be sent directly to our WhatsApp for
                    faster response
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Contact Banner */}
        <div className="mt-12 bg-accent-500 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-neutral-800 mb-6 text-lg">
            Chat with us directly on WhatsApp for quick responses
          </p>
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-neutral-800 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
