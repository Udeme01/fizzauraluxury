import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

// pages/admin/AdminLogin.jsx
const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null);
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (error) {
      setError("Invalid email or password");
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Brand panel */}
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
          {/* <span className="text-white text-xl font-semibold tracking-wide">
            FizzAura
          </span> */}
        </Link>
      </div>

      {/* Form panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 md:py-0">
        <div className="w-full max-w-[500px] m-8">
          <div className="flex justify-end mb-6 md:mb-10">
            <a
              href="https://wa.me/07046780531?text=Hi,%20I%20need%20help%20logging%20into%20the%20admin%20dashboard"
              target="_blank"
              type="button"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Need help?
            </a>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Please enter your details.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  required
                  placeholder="hello@fizzauraluxury.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-300 pb-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 bg-transparent"
                />
              </div>
              <div className="relative z-0">
                <label className="text-xs text-gray-500 block mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-300 pb-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 bottom-2 text-gray-500 hover:text-gray-900 opacity-80"
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              {/* <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-black" />
                Remember me
              </label> */}
              <button
                type="button"
                onClick={() => navigate("/admin/forgot-password")}
                className="hover:text-gray-800"
              >
                Forgot?
              </button>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-28 h-11 rounded-full bg-black text-white text-xs font-medium tracking-wide hover:bg-gray-800 transition-colors"
              >
                {submitting ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
