import React, { useState } from 'react'
import BillingDetails from '../billingDetails/BillingDetails'
import './CheckoutSection.css'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import ShippingForm from '../shippingForm/ShippingForm'
import { useShopContext } from '../../context/ShopContext'

const CheckoutSection = () => {
  const [openAddress, setOpenAddress] = useState(false);
  const {addresses} = useShopContext();
  console.log(addresses);
  
  return (
    <>
      <div className="main-container">
        <h3>Delivery to</h3>
        <div className="section-container">
          <div className="left-section">
            <div className="address" onClick={() => setOpenAddress(true)}>
              <span className='add-icon'>+</span>
              <span className='add-text'>ADD ADDRESS</span>
            </div>
            <div className="saved-addresses">
              {addresses.map((addr) => (
                <div key={addr.id} className="address-card">
                  <p className="addr-name">{addr.fullName}</p>
                  <p className="addr-line">{addr.address}</p>
                  <p className="addr-line">{addr.city} - {addr.postalCode}</p>
                  <p className="addr-line">{addr.state},</p>
                  <p className="addr-line"><strong>Phone:</strong>{addr.phone}</p>
                  <button className="select-btn">Deliver Here</button>
                </div>
              ))}
            </div>

          </div>
          <div className="right-section">
            <div>
              <BillingDetails path='payment' label='PAYMENT' />
            </div>
          </div>
        </div>
        <Dialog open={openAddress} onClose={() => setOpenAddress(false)} maxWidth="sm" fullWidth>
          <DialogContent>
            <ShippingForm  onClose={() => setOpenAddress(false)}/>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default CheckoutSection
