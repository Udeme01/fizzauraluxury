// components/admin/settings/ProfileSettings.jsx
import { useState } from "react";
import { supabase } from "../../../services/supabaseClient";

const ProfileSettings = ({ profile, userId }) => {
  const [form, setForm] = useState(profile);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ name: form.name })
      .eq("id", userId);

    let emailError = null;
    if (form.email !== profile.email) {
      const { error } = await supabase.auth.updateUser({ email: form.email });
      emailError = error;
    }

    setSaving(false);

    if (profileError || emailError) {
      setMessage("Something went wrong saving your profile.");
      return;
    }

    setMessage(
      form.email !== profile.email
        ? "Saved. Check your new email to confirm the change."
        : "Profile updated.",
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-900 mb-1">Profile</p>
      <p className="text-xs text-gray-500 mb-4">Your personal account info.</p>

      {message && <p className="text-xs text-gray-600 mb-3">{message}</p>}

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="self-start bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800"
        >
          {saving ? "Saving Changes..." : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
