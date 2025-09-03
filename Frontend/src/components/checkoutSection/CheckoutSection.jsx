import React, { useState } from 'react'
import BillingDetails from '../billingDetails/BillingDetails'
import './CheckoutSection.css'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import ShippingForm from '../shippingForm/ShippingForm'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/AuthContext'

const CheckoutSection = () => {
  const [openAddress, setOpenAddress] = useState(false);
  const { addresses } = useAuth();

  // State for delivery method
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [deliveryCharge, setDeliveryCharge] = useState(0); // Default standard charge

  // Handle delivery method change
  const handleDeliveryChange = (e) => {
    const method = e.target.value;
    setDeliveryMethod(method);

    if (method === "standard") setDeliveryCharge('Free');
    if (method === "express") setDeliveryCharge(80);
    if (method === "sameDay") setDeliveryCharge(120);
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
                <div key={addr.id} className="address-card">
                  <p className="addr-label">{addr.label}</p>
                  <p className="addr-line">{addr.street}</p>
                  <p className="addr-line">{addr.city}</p>
                  <p className="addr-line">{addr.pincode},</p>
                  <p className="addr-line"><strong>Phone:</strong> {addr.phone}</p>
                  <button className="select-btn">Deliver Here</button>
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
                  Express Delivery (1-2 Days) - ₹80
                </label>
                <label>
                  <input
                    type="radio"
                    value="sameDay"
                    checked={deliveryMethod === "sameDay"}
                    onChange={handleDeliveryChange}
                  />
                  Same Day Delivery - ₹120
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
            <ShippingForm onClose={() => setOpenAddress(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default CheckoutSection
