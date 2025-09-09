import "./ShippingForm.css";
import { useForm } from 'react-hook-form'
import { useAuth } from "../../context/AuthContext";
import axios from 'axios'
import { useEffect } from "react";


const ShippingForm = ({ onClose, addressData, isEdit }) => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const { user, getAddresses } = useAuth();

  useEffect(() => {
    if (isEdit) {
      reset(addressData)
    } else {
      reset({});
    }
  }, [])

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:4000/user/${user._id}/updateaddress/${addressData._id}`, data);
      } else {
        await axios.post(`http://localhost:4000/user/${user._id}/addaddress`, data);
      }
      getAddresses();
      onClose();
    } catch (error) {
      console.error("Unable to Process Request", error);
    }
  }

  return (
    <div className="shipping-container">
      <h2>Add Shipping Address</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="shipping-form">
        <input
          {...register('label', { required: "Label is required" })}
          type="text"
          placeholder="( Home, Office, etc.. )"
        />
        {errors.label && (<p className="error">{errors.label.message}</p>)}
        <input
          {...register('street', { required: "Street is required" })}
          type="text"
          placeholder="Enter you street"
        />
        {errors.street && (<p className="error">{errors.street.message}</p>)}
        <input
          {...register('city', { required: "City is required" })}
          type="text"
          placeholder="Enter you city"
        />
        {errors.city && (<p className="error">{errors.city.message}</p>)}
        <input
          {...register('pincode', { required: "pincode is required" })}
          type="number"
          placeholder="Enter you pincode"
        />
        {errors.pincode && (<p className="error">{errors.pincode.message}</p>)}
        <input
          {...register('phone', {
            required: "Phone no. is required",
            minLength: { value: 10, message: "Invalid phone no." }
          })}
          type="number"
          placeholder="Enter you phone no."
        />
        {errors.phone && (<p className="error">{errors.phone.message}</p>)}

        <button type="submit" className="shipping-btn">
          {
            isEdit ? 'Update Address' : 'Save Address'
          }
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
