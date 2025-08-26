import './PaymentSection.css'
import BillingDetails from '../billingDetails/BillingDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const PaymentSection = () => {
  const [active, setActive] = useState(null);

  const toggleSection = (id) => {
    setActive(active === id ? null : id);

  }

  return (
    <>
      <div className="main-container">
        <div className="address-container">
          <div>
            <h5>Delever To: Pankaj ,, 174301</h5>
            <p style={{ fontSize: '12px' }}>
              WARD no1-Lalhri-UNA-Himachal,  Haroli,  Ambedkar Park  Una
            </p>
          </div>
          <button>CHANGE</button>
        </div>
        <div className="section-container">
          <div className="left-section">
            <h5>Payment Options</h5>
            <div className="payment-card">
              <span>Pay with any UPI App</span>
              <input type="radio" name="payment" />
            </div>

            <div className="payment-card collapsible">
              <div className="card-header">
                <span>Wallets</span>
                <span className={`arrow ${active === 'Wallets' ? 'arrowActive' : ''}`} onClick={() => toggleSection('Wallets')}><ExpandMoreIcon /></span>
              </div>
              {
                active === 'Wallets' && (
                  <div className="payment-options">
                    <h1>Hello</h1>
                  </div>
                )
              }
            </div>

            <div className="payment-card collapsible">
              <div className="card-header">
                <span>Credit & Debit Cards</span>
                <span className={`arrow ${active === 'Credit' ? 'arrowActive' : ''}`} onClick={() => toggleSection('Credit')}><ExpandMoreIcon /></span>
              </div>
              {
                active === 'Credit' && (
                  <div className="payment-options">
                    <h1>Hello</h1>
                  </div>
                )
              }
            </div>

            <div className="payment-card collapsible">
              <div className="card-header">
                <span>Netbanking</span>
                <span className={`arrow ${active === 'Netbanking' ? 'arrowActive' : ''}`} onClick={() => toggleSection('Netbanking')}><ExpandMoreIcon /></span>
              </div>
              {
                active === 'Netbanking' && (
                  <div className="payment-options">
                    <h1>Hello</h1>
                  </div>
                )
              }
            </div>

            <div className="payment-card disabled">
              <label htmlFor="">
                <span>
                  <img src="./cred_logo_black_021123.png" alt="" style={{ height: '24px', width: 'auto' }} />
                  CRED pay
                </span>
                <input type="radio" name="payment" disabled />
                <p className="note">You're not eligible for this payment option</p>
              </label>
            </div>

            <div className="payment-card">
              <label htmlFor="">
                <span>COD</span>
                <input type="radio" name="payment" />
                <p className="note">
                  We recommend making prepaid payments to ensure your deliveries are contactless.
                </p>
              </label>
            </div>
          </div>
          <div className="right-section">
            <p>BILLING DETAILS</p>
            <div className='payment-container'>
              <BillingDetails path='payment' label='PAY NOW' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentSection;
