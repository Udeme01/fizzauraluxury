import { useEffect, useState } from "react";

import ProfileSettings from "../../components/admin/settings/ProfileSettings";
import StoreSettings from "../../components/admin/settings/StoreSettings";
import NotificationSettings from "../../components/admin/settings/NotificationSettings";
import { supabase } from "../../services/supabaseClient";

const Settings = () => {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [storeInfo, setStoreInfo] = useState(null);
  // const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      setUserId(session.user.id);

      const [{ data: profileData }, { data: storeData }] = await Promise.all([
        supabase
          .from("profiles")
          .select("name, email")
          .eq("id", session.user.id)
          .single(),
        supabase.from("store_settings").select("*").eq("id", 1).single(),
        // supabase
        //   .from("profiles")
        //   .select("id, name, email, role")
        //   .order("created_at"),
      ]);

      setProfile(profileData);
      setStoreInfo(storeData);
      // setTeamMembers(teamData || []);
      setLoading(false);
    };

    loadSettings();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading settings...</p>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account, store, and team.
        </p>
      </div>

      <ProfileSettings profile={profile} userId={userId} />
      <StoreSettings storeInfo={storeInfo} />
      {/* <TeamSettings members={teamMembers} /> */}
      {/* <NotificationSettings userId={userId} /> */}
    </div>
  );
};

export default Settings;
