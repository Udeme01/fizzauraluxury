// pages/admin/ForgotPassword.jsx
import { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) {
      setError("Something went wrong. Try again.");
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full md:w-1/2 text-center">
          <p className="text-md text-gray-700 font-bold">
            If that email is registered, a reset link has been sent.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="relative w-full md:w-1/2 bg-black flex items-center justify-center overflow-hidden h-60 md:h-auto">
        {/* Faint watermark */}
        <span
          className="absolute select-none pointer-events-none font-black tracking-wide whitespace-nowrap
             text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)]
             text-[18vw] md:text-[8vw]"
        >
          FIZZAURA
          <img
            src="/images/brand/fizzaura_logo.png"
            alt="FizzAura Luxury Logo"
            className="w-[24rem] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.7] md:w-[40rem]"
          />
        </span>

        {/* Logo */}
        <Link
          to="/"
          className="absolute top-4 left-0 md:top-8 md:left-8 z-10 flex items-center"
        >
          <img
            src="/images/brand/fizzaura_logo.png"
            alt="FizzAura Luxury Logo"
            className="w-14 h-auto"
          />
        </Link>
      </div>

      <div className="w-full h-full min-h-[700px] md:h-auto flex flex-col px-6 justify-center md:w-1/2 lg:w-[500px] mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset password
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email and we'll send a reset link.
          </p>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@fizzauraluxury.com"
            className="w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-gray-900 bg-transparent"
          />

          <button
            type="submit"
            className="mt-2 bg-black text-white text-sm font-medium py-2.5 rounded-md hover:bg-gray-800"
          >
            Send reset link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
