// src/pages/Contact.jsx
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Button from "../components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

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
    const phoneNumber = "2349138965388"; // Replace with your WhatsApp number

    // Open WhatsApp
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      value: "+234 913 896 5388",
      link: "tel:+2349138965388",
    },
    {
      icon: Mail,
      title: "Email",
      value: "Fizzaurabrand@gmail.com",
      link: "mailto:Fizzaurabrand@gmail.com",
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
      value: "+234 913 896 5388",
      link: "https://wa.me/2349138965388",
    },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen py-12 md:py-16 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-neutral-600 text-md sm:text-lg md:text-xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Methods */}
            <div className="bg-white p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl text-neutral-900 mb-6">
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
                      <div className="shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
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
            <div className="bg-white rounded- p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl text-neutral-900 mb-6">Follow Us</h2>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/fizzaura_brand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@fizzaura_luxury1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faTiktok} className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl text-neutral-900 mb-6">Business Hours</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Monday - Saturday</span>
                  <span className="font-semibold text-neutral-900">
                    7:00 AM - 8:00 PM
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-neutral-600">Saturday</span>
                  <span className="font-semibold text-neutral-900">
                    10:00 AM - 4:00 PM
                  </span>
                </div> */}
                <div className="flex justify-between">
                  <span className="text-neutral-600">Sunday</span>
                  <span className="font-semibold text-neutral-900">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 md:p-8 lg:p-10 shadow-lg">
              <h2 className="text-2xl md:text-3xl text-neutral-900 mb-6">
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
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us what you need..."
                  />
                </div>

                {/* WhatsApp Submit Button */}
                <div>
                  <Button
                    icon={MessageCircle}
                    variant=""
                    size="md"
                    className="w-full bg-green-800 text-neutral-white py-4 hover:bg-green-700 transform transition-all duration-500 inline-flex items-center justify-center gap-2"
                  >
                    Send via WhatsApp
                  </Button>
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
        <div className="mt-12 bg-neutral-white shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl text-neutral-900 mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-neutral-800 mb-6 text-base md:text-lg">
            Chat with us directly on WhatsApp for quick responses
          </p>
          {/* WhatsApp Btn */}
          <Button
            href={"https://wa.me/2349138965388"}
            target="_blank"
            rel="noopener noreferrer"
            icon={MessageCircle}
            variant=""
            size="md"
            className="bg-green-800 text-neutral-white py-4 hover:bg-green-700 transform transition-all duration-500 inline-flex items-center justify-center gap-2"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
