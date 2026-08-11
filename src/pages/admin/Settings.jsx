// pages/admin/Settings.jsx
import ProfileSettings from "../../components/admin/settings/ProfileSettings";
import StoreSettings from "../../components/admin/settings/StoreSettings";
import TeamSettings from "../../components/admin/settings/TeamSettings";
import NotificationSettings from "../../components/admin/settings/NotificationSettings";
import { mockAdminProfile, mockStoreInfo, mockTeamMembers } from "../../data/mockSettings";


const Settings = () => {
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account, store, and team.
        </p>
      </div>

      <ProfileSettings profile={mockAdminProfile} />
      <StoreSettings storeInfo={mockStoreInfo} />
      <TeamSettings members={mockTeamMembers} />
      <NotificationSettings />
    </div>
  );
};

export default Settings;
