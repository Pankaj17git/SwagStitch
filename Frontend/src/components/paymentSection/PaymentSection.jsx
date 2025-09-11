import './PaymentSection.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useShopContext } from '../../context/ShopContext';
import BillingDetails from '../billingDetails/BillingDetails';
import AddressSummary from './AddressSummary';
import PaymentCard from './PaymentCard';
import PaymentMethodRow from './PaymentMethodRow';
import axios from 'axios';


const PaymentSection = () => {
  const [active, setActive] = useState(null);
  const { user, addresses, deliveryAddress, setDeliveryAddress } = useAuth();
  const { setPaymentMethod, paymentMethod,
  getTotalOrderAmount, getTotalCartAmount,
  deliveryCharge, cartItemDetail, cleanUp } = useShopContext();

  const address = deliveryAddress !== null ? deliveryAddress : addresses[0];

  useEffect(() => {
    if (!deliveryAddress && addresses.length > 0) {
      setDeliveryAddress(addresses[0]);
    }
  }, [addresses, deliveryAddress, setDeliveryAddress]);

  const handlePayment = (method) => {
    setPaymentMethod(method);
  }

  const handleSubmit = async () => {
    try {
      if (!user) return alert("please Login First!")

      const newOrder = {
        userId: user._id,
        items: cartItemDetail,
        subtotal: getTotalCartAmount,
        total: getTotalOrderAmount,
        shippingfee: deliveryCharge,
        address: deliveryAddress,
        paymentmethod: paymentMethod,
      }

      await axios.post('http://localhost:4000/order', newOrder)

      alert('orderPlaced successfully!')

      await axios.patch('http://localhost:4000/cart/clearcart', { id: user._id })
      cleanUp();

    } catch (error) {
      alert("Unable to process the request", error)
    }
  }

  const toggleSection = (id) => {
    setActive(active === id ? null : id);
  };

  return (
    <div className="main-container">
      {/* Delivery Address */}
      <AddressSummary user={user} address={address} />

      {/* Payment Options */}
      <div className="section-container">
        <div className="left-section">
          <h5>Payment Options</h5>

          {/* Simple Option */}
          <PaymentCard title="Pay with any UPI App" radioName="payment" value="UPI" onChange={() => handlePayment("UPI")}></PaymentCard>

          {/* Collapsible Wallets */}
          <PaymentCard
            title="Wallets"
            collapsible
            isOpen={active === 'Wallets'}
            onToggle={() => toggleSection('Wallets')}
          >
            <PaymentMethodRow
              icon="./paytem.png"
              label="Paytm"
              radioName="payment"
              value="Paytm"
              checked={paymentMethod === "Paytm"}
              onChange={() => handlePayment("Paytm")}
            />
            <PaymentMethodRow
              icon="./googlePay.png"
              label="GooglePay"
              radioName="payment"
              value="GooglePay"
              checked={paymentMethod === "GooglePay"}
              onChange={() => handlePayment("GooglePay")}
            />
            <PaymentMethodRow
              icon="./phonePay.png"
              label="PhonePe"
              radioName="payment"
              value="PhonePe"
              checked={paymentMethod === "PhonePe"}
              onChange={() => handlePayment("PhonePe")}
            />
          </PaymentCard>

          {/* Collapsible Credit Cards */}
          <PaymentCard
            title="Credit & Debit Cards"
            collapsible
            isOpen={active === 'Credit'}
            onToggle={() => toggleSection('Credit')}
          >
            <p>Hello!</p>
          </PaymentCard>

          {/* Collapsible Netbanking */}
          <PaymentCard
            title="Netbanking"
            collapsible
            isOpen={active === 'Netbanking'}
            onToggle={() => toggleSection('Netbanking')}
          >
            <PaymentMethodRow
              icon="./bank1.png"
              label="AXIS"
              radioName="payment"
              value="AXIS"
              checked={paymentMethod === "AXIS"}
              onChange={() => handlePayment("AXIS")}
            />
            <PaymentMethodRow
              icon="./bank2.png"
              label="SBI"
              radioName="payment"
              value="SBI"
              checked={paymentMethod === "SBI"}
              onChange={() => handlePayment("SBI")}
            />
            <PaymentMethodRow
              icon="./bank3.png"
              label="HDFC"
              radioName="payment"
              value="HDFC"
              checked={paymentMethod === "HDFC"}
              onChange={() => handlePayment("HDFC")}
            />
          </PaymentCard>

          {/* Disabled Option */}
          <PaymentCard title="CRED pay" radioName="payment" disabled note="You're not eligible for this payment option" icon="./cred_logo_black_021123.png" />

          {/* COD */}
          <PaymentCard
            title="COD"
            radioName="payment"
            value="COD"
            onChange={() => handlePayment("COD")}
            note="We recommend making prepaid payments to ensure your deliveries are contactless."
          />
        </div>

        {/* Right Section */}
        <div className="right-section">
          <p>BILLING DETAILS</p>
          <div className="payment-container">
            <BillingDetails onClick={handleSubmit} path="payment" label="PAY NOW" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
