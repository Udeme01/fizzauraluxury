// components/admin/settings/PasswordSettings.jsx
import { useState } from "react";
import { supabase } from "../../../services/supabaseClient";

const PasswordSettings = ({ userEmail }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setSaving(false);

    if (updateError) {
      setError("Could not update password. Try again.");
      return;
    }

    setMessage("Password updated.");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-900 mb-1">Password</p>
      <p className="text-xs text-gray-500 mb-4">Change your login password.</p>

      {message && <p className="text-xs text-green-600 mb-3">{message}</p>}
      {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <input
          type="email"
          value={userEmail || ""}
          autoComplete="username"
          readOnly
          hidden
        />

        <div>
          <label className="text-xs text-gray-500 block mb-1">
            New password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Confirm new password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="self-start bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800"
        >
          {saving ? "Saving..." : "Update password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordSettings;
