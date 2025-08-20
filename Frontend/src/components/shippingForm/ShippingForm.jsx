import React, { useState } from "react";
import "./ShippingForm.css";
import { useShopContext } from "../../context/ShopContext";

const ShippingForm = ({onClose}) => {
  const { addAddress } = useShopContext();
  const [formData, setFormData] = useState({
    id:'',
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData,[name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = {
      ...formData,
      id: Math.round((Math.random() * 100))
    }

    addAddress(newAddress)
    onClose();
    setFormData({
      id:'',
      fullName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
    });
  };

  return (
    <div className="shipping-container">
      <h2>Add Shipping Address</h2>
      <form onSubmit={handleSubmit} className="shipping-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State/Province"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit" className="shipping-btn">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
