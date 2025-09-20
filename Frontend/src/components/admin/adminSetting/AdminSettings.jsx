import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}settings`);
        setSettings(res.data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);


  const handleChange = (e, path) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setSettings((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let ref = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addDiscountRule = () => {
    setSettings((prev) => ({
      ...prev,
      discountRules: [...(prev.discountRules || []), { minAmount: 0, discount: 0 }]
    }));
  };

  const updateDiscountRule = (index, field, value) => {
    setSettings((prev) => {
      const updatedRules = [...prev.discountRules];
      updatedRules[index][field] = Number(value);
      return { ...prev, discountRules: updatedRules };
    });
  };

  const removeDiscountRule = (index) => {
    setSettings((prev) => {
      const updatedRules = prev.discountRules.filter((_, i) => i !== index);
      return { ...prev, discountRules: updatedRules };
    });
  };

  const saveSettings = async () => {
    try {
      await axios.put(`${BASE_URL}settings`, settings);
      alert("Settings updated successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Failed to update settings.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!settings) return <p>No settings found.</p>;

  return (
    <div className="admin-settings">
      <h2>Admin Settings</h2>

      {/* Discount Rules Section */}
      <section>
        <h3>Discount Rules</h3>
        {settings.discountRules?.map((rule, i) => (
          <div className="discount-rule" key={i}>
            <input
              type="number"
              placeholder="Min Amount"
              value={rule.minAmount}
              onChange={(e) => updateDiscountRule(i, "minAmount", e.target.value)}
            />
            <input
              type="number"
              placeholder="Discount %"
              value={rule.discount * 100}
              onChange={(e) => updateDiscountRule(i, "discount", e.target.value / 100)}
            />
            <button className="remove-btn" onClick={() => removeDiscountRule(i)}>
              Remove
            </button>
          </div>
        ))}
        <button className="add-btn" onClick={addDiscountRule}>
          + Add Rule
        </button>
      </section>

      {/* Tax Section */}
      <section>
        <h3>Tax Settings</h3>
        <label>
          GST (%):{" "}
          <input
            type="number"
            value={settings.tax?.gst * 100 || 0}
            onChange={(e) => handleChange(e, "tax.gst")}
          />
        </label>
      </section>

      {/* Shipping Section */}
      <section>
        <h3>Shipping Settings</h3>
        <label>
          Base Shipping Charge:{" "}
          <input
            type="number"
            value={settings.shippingCharge || 0}
            onChange={(e) => handleChange(e, "shippingCharge")}
          />
        </label>
        <br />
        <label>
          Free Shipping Above:{" "}
          <input
            type="number"
            value={settings.freeShippingThreshold || 0}
            onChange={(e) => handleChange(e, "freeShippingThreshold")}
          />
        </label>
      </section>

      <button className="save-btn" onClick={saveSettings}>
        Save Settings
      </button>
    </div>
  );
};

export default AdminSettings;
