// components/admin/settings/PromoBannerSettings.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";

const PromoBanner = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [linkType, setLinkType] = useState(
    banner?.button_link?.startsWith("/product/") ? "product" : "custom",
  );
  const [selectedProductId, setSelectedProductId] = useState(
    banner?.button_link?.startsWith("/product/")
      ? banner.button_link.replace("/product/", "")
      : "",
  );

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name")
        .eq("status", "active")
        .order("name");
      setProducts(data || []);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const loadBanner = async () => {
      const { data, error } = await supabase
        .from("promo_banners")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching promo banner:", error);
        setLoading(false);
        return;
      }

      setBanner(data);
      setLoading(false);
    };

    loadBanner();
  }, []);

  const [form, setForm] = useState({
    id: banner?.id || null,
    tag_line: banner?.tag_line || "",
    main_heading: banner?.main_heading || "",
    subheading: banner?.subheading || "",
    button_text: banner?.button_text || "",
    button_link: banner?.button_link || "",
    background_color: banner?.background_color || "#1F2937",
    is_active: banner?.is_active ?? true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    banner?.product_image || null,
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    let productImage = banner?.product_image || null;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `promo-${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error(uploadError);
        setMessage("Image upload failed.");
        setSaving(false);
        return;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      productImage = data.publicUrl;
    }

    const payload = {
      tag_line: form.tag_line,
      main_heading: form.main_heading,
      subheading: form.subheading,
      button_text: form.button_text,
      button_link: form.button_link,
      background_color: form.background_color,
      is_active: form.is_active,
      product_image: productImage,
    };

    const { error } = form.id
      ? await supabase.from("promo_banners").update(payload).eq("id", form.id)
      : await supabase.from("promo_banners").insert(payload);

    setSaving(false);

    if (error) {
      console.error(error);
      setMessage("Could not save banner.");
      return;
    }

    setMessage("Banner saved.");
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading promo banner...</p>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-medium text-gray-900">
          Homepage Promo Banner
        </p>
        <label className="flex items-center gap-2 text-xs text-gray-500">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            className="accent-black"
          />
          Show on site
        </label>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Manage the promotional banner shown on your homepage.
      </p>

      {message && <p className="text-xs text-gray-600 mb-3">{message}</p>}

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Banner image
          </label>
          <label className="w-40 h-40 border border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer hover:border-gray-400">
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-gray-400">Click to upload</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Tag line</label>
          <input
            value={form.tag_line}
            onChange={(e) => setForm({ ...form, tag_line: e.target.value })}
            placeholder="New Collection"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Main heading
          </label>
          <input
            value={form.main_heading}
            onChange={(e) => setForm({ ...form, main_heading: e.target.value })}
            placeholder="Elevate Your Style"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Subheading</label>
          <textarea
            rows={2}
            value={form.subheading}
            onChange={(e) => setForm({ ...form, subheading: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              Button text
            </label>
            <input
              value={form.button_text}
              onChange={(e) =>
                setForm({ ...form, button_text: e.target.value })
              }
              placeholder="Shop Now"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          {/* <div>
            <label className="text-xs text-gray-500 block mb-1">
              Button link
            </label>
            <input
              value={form.button_link}
              onChange={(e) =>
                setForm({ ...form, button_link: e.target.value })
              }
              placeholder="/shop"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div> */}

          {/* 
          .....................
          Button link selection logic has been updated to allow choosing between a specific product or a custom link. The following code block handles the UI for selecting the link type and updating the form state accordingly.
          .....................
          */}
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              Button links to
            </label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-1.5 text-xs text-gray-600">
                <input
                  type="radio"
                  checked={linkType === "product"}
                  onChange={() => {
                    setLinkType("product");
                    if (selectedProductId) {
                      setForm({
                        ...form,
                        button_link: `/product/${selectedProductId}`,
                      });
                    }
                  }}
                />
                A specific product
              </label>
              <label className="flex items-center gap-1.5 text-xs text-gray-600">
                <input
                  type="radio"
                  checked={linkType === "custom"}
                  onChange={() => setLinkType("custom")}
                />
                Custom link
              </label>
            </div>

            {linkType === "product" ? (
              <select
                value={selectedProductId}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  setForm({
                    ...form,
                    button_link: `/product/${e.target.value}`,
                  });
                }}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              >
                <option value="" disabled>
                  Select a product
                </option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={form.button_link}
                onChange={(e) =>
                  setForm({ ...form, button_link: e.target.value })
                }
                placeholder="/shop"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              />
            )}
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Background color
          </label>
          <input
            type="color"
            value={form.background_color}
            onChange={(e) =>
              setForm({ ...form, background_color: e.target.value })
            }
            className="w-16 h-9 rounded-md border border-gray-200 cursor-pointer"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="self-start bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800"
        >
          {saving ? "Saving..." : "Save banner"}
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
