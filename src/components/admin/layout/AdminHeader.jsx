// components/admin/layout/AdminHeader.jsx
import { useEffect, useState } from "react";
import { Bell, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";

const AdminHeader = ({ onToggleSidebar }) => {
  const [adminName, setAdminName] = useState("FizzAura");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching admin name:", error);
        }

        if (data && data.name) {
          setAdminName(data.name);
        }
      }
    };
    fetchAdminName();
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="h-24 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 font-montserrat">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-black/70 hover:text-black"
        >
          <Menu size={20} />
        </button>
        <div className="text-sm text-gray-500 hidden sm:block">
          Welcome back, {adminName}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
          {adminName.slice(0, 2).toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-500"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
