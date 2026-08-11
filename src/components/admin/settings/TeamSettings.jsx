// components/admin/settings/TeamSettings.jsx
import { useState } from "react";
import { Mail } from "lucide-react";

const TeamSettings = ({ members }) => {
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = (e) => {
    e.preventDefault();
    console.log("inviting:", inviteEmail);
    setInviteEmail("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-900 mb-1">Team</p>
      <p className="text-xs text-gray-500 mb-4">
        People with access to this admin dashboard.
      </p>

      <div className="flex flex-col divide-y divide-gray-100 mb-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between py-2.5 text-sm"
          >
            <div>
              <p className="text-gray-900">{member.name}</p>
              <p className="text-xs text-gray-400">{member.email}</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize">
              {member.role}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleInvite} className="flex gap-2">
        <div className="relative flex-1">
          <Mail
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="email"
            required
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@email.com"
            className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800 whitespace-nowrap"
        >
          Send invite
        </button>
      </form>
    </div>
  );
};

export default TeamSettings;
