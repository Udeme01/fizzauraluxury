// pages/admin/ResetPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError("Could not update password. Try the link again.");
      return;
    }

    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 lg:w-[500px] flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-gray-900">
          Set new password
        </h1>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-gray-900 bg-transparent"
        />

        <button
          type="submit"
          className="mt-2 bg-black text-white text-sm font-medium py-2.5 rounded-md hover:bg-gray-800"
        >
          Update password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
