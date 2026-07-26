import { Link } from "react-router-dom";

// pages/admin/AdminLogin.jsx
const AdminLogin = () => {
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
            <button
              type="button"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Need help?
            </button>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Please enter your details.
          </p>

          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border-b border-gray-300 pb-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 bg-transparent"
                  placeholder="you@fizzauraluxury.com"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border-b border-gray-300 pb-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 bg-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-black" />
                Remember me
              </label>
              <button type="button" className="hover:text-gray-800">
                Forgot?
              </button>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="w-28 h-11 rounded-full bg-black text-white text-xs font-medium tracking-wide hover:bg-gray-800 transition-colors"
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
