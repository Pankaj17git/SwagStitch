import "./ShippingForm.css";
import { useForm } from 'react-hook-form'
import { useAuth } from "../../context/AuthContext";
import axios from 'axios'


const ShippingForm = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, getAddresses } = useAuth();

  const onSubmit = async (data) => {
    await axios.post(`http://localhost:4000/user/${user._id}/addaddress`, data)
    getAddresses();
    onClose();
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
          Save Address
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
