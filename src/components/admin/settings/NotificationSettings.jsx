// components/admin/settings/NotificationSettings.jsx
import { useState } from "react";

const notificationOptions = [
  { key: "newOrder", label: "New order placed" },
  { key: "lowStock", label: "Product low on stock" },
  { key: "newCustomer", label: "New customer signed up" },
];

const NotificationSettings = () => {
  const [prefs, setPrefs] = useState({
    newOrder: true,
    lowStock: true,
    newCustomer: false,
  });

  const toggle = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-900 mb-1">Notifications</p>
      <p className="text-xs text-gray-500 mb-4">
        Choose what you get notified about.
      </p>

      <div className="flex flex-col gap-3">
        {notificationOptions.map((option) => (
          <label
            key={option.key}
            className="flex items-center justify-between text-sm cursor-pointer"
          >
            <span className="text-gray-700">{option.label}</span>
            <input
              type="checkbox"
              checked={prefs[option.key]}
              onChange={() => toggle(option.key)}
              className="accent-black w-4 h-4"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
