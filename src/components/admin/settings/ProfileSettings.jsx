// components/admin/settings/ProfileSettings.jsx
import { useState } from "react";

const ProfileSettings = ({ profile }) => {
  const [form, setForm] = useState(profile);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-900 mb-1">Profile</p>
      <p className="text-xs text-gray-500 mb-4">Your personal account info.</p>

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
        <button className="self-start bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
