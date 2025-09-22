import React, { useEffect, useState } from 'react'
import BillingDetails from '../billingDetails/BillingDetails'
import './CheckoutSection.css'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import ShippingForm from '../shippingForm/ShippingForm'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/AuthContext'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import {toast} from 'react-toastify'
import { useShopContext } from '../../context/ShopContext'


const CheckoutSection = () => {
  const [openAddress, setOpenAddress] = useState(false);
  const [editAddressData, setEditAddressData] = useState();
  const [isEditAddress, setEditAddress] = useState(false);
  const { addresses, user, getAddresses, setDeliveryAddress } = useAuth();
  const { setDeliveryCharge, deliveryCharge, extraCharges } = useShopContext()
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const DELIVERY_OPTIONS = {
    standard: { label: "Standard", charge: 0 },
    express: { label: "Express", charge: extraCharges?.shippingCharge },
    sameDay: { label: "Same Day", charge: extraCharges?.freeShippingThreshold },
  };

  // State for delivery method
  const [deliveryMethod, setDeliveryMethod] = useState("standard");

  useEffect(() => {
    setDeliveryCharge(DELIVERY_OPTIONS[deliveryMethod].charge);
  }, [deliveryMethod, setDeliveryCharge]);

  // Handle delivery method change
  const handleDeliveryChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handleAddress = (data) => {
    setDeliveryAddress(data)
  }

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}user/${user._id}/removeaddress/${id}`);
    toast.success('address deleted Successfully!');
    await getAddresses();
  }

  const handleEdit = (address) => {
    setEditAddressData(address)
    setEditAddress(true);
    setOpenAddress(true);
  };

  return (
    <>
      <div className="main-container">
        <h3>Delivery to</h3>
        <div className="section-container">
          {/* LEFT SIDE */}
          <div className="left-section">
            <div className="address" onClick={() => setOpenAddress(true)}>
              <span className='add-icon'>+</span>
              <span className='add-text'>ADD ADDRESS</span>
            </div>

            <div className="saved-addresses">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`address-card ${addr.isDefault ? "default" : ""}`}
                >
                  <p className="addr-label">
                    {addr.label} {addr.isDefault && <span>Default</span>}
                  </p>
                  <p className="addr-line">{addr.street}</p>
                  <p className="addr-line">{addr.city}</p>
                  <p className="addr-line">{addr.pincode}</p>
                  <p className="addr-line"><strong>Phone:</strong> {addr.phone}</p>

                  <div className="btn-group">
                    <button className="select-btn" onClick={() => { handleAddress(addr) }}>Deliver Here</button>
                    <IconButton style={{ float: 'right' }}
                      onClick={() =>
                        handleEdit(addr) // Replace with form data
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton style={{ float: 'right' }} onClick={() => handleDelete(addr._id)}><DeleteIcon /></IconButton>
                  </div>
                </div>
              ))}
            </div>

            {/* DELIVERY METHOD SECTION */}
            <div className="delivery-method">
              <h4>Select Delivery Method</h4>
              <div className="delivery-options">
                <label>
                  <input
                    type="radio"
                    value="standard"
                    checked={deliveryMethod === "standard"}
                    onChange={handleDeliveryChange}
                  />
                  Standard Delivery (3-5 Days) - Free
                </label>
                <label>
                  <input
                    type="radio"
                    value="express"
                    checked={deliveryMethod === "express"}
                    onChange={handleDeliveryChange}
                  />
                  Express Delivery (1-2 Days) - ₹{extraCharges?.shippingCharge}
                </label>
                <label>
                  <input
                    type="radio"
                    value="sameDay"
                    checked={deliveryMethod === "sameDay"}
                    onChange={handleDeliveryChange}
                  />
                  Same Day Delivery - ₹{extraCharges?.freeShippingThreshold}
                </label>
              </div>

              <div className="delivery-charge">
                <p><strong>Selected Method:</strong> {deliveryMethod}</p>
                <p><strong>Delivery Charge:</strong> {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right-section">
            <BillingDetails path='payment' label='PROCEED TO PAYMENT' deliveryCharge={deliveryCharge} />
          </div>
        </div>

        {/* ADD ADDRESS DIALOG */}
        <Dialog open={openAddress} onClose={() => setOpenAddress(false)} maxWidth="sm" fullWidth>
          <DialogContent>
            <div >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, padding: 0 }}
                onClick={() => setOpenAddress(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <ShippingForm onClose={() => setOpenAddress(false)} addressData={editAddressData} isEdit={isEditAddress} />
          </DialogContent>
        </Dialog>
      </div >
    </>
  )
}

export default CheckoutSection
