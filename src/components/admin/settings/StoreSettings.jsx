// components/admin/settings/StoreSettings.jsx
import { useState } from "react";
import { supabase } from "../../../services/supabaseClient";

const StoreSettings = ({ storeInfo }) => {
  const [form, setForm] = useState(storeInfo);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("store_settings")
      .update({
        store_name: form.store_name,
        contact_email: form.contact_email,
        currency: form.currency,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    setSaving(false);

    if (error) console.error(error);
  };

  // console.log("StoreSettings form state:", form);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-900 mb-1">Store info</p>
      <p className="text-xs text-gray-500 mb-4">
        Details customers and receipts will show.
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Store name</label>
          <input
            value={form.store_name}
            // placeholder={form.store_name}
            onChange={(e) => setForm({ ...form, store_name: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Contact email
          </label>
          <input
            value={form.contact_email}
            onChange={(e) =>
              setForm({ ...form, contact_email: e.target.value })
            }
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Currency</label>
          <select
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="NGN">NGN (₦)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="self-start bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default StoreSettings;
