const PaymentMethodRow = ({ icon, label, radioName, value, checked, onChange }) => {
  return (
    <div className="payment-method-row">
      <div className="payment-info">
        {icon && <img src={icon} alt={label} style={{ height: '24px', width: 'auto' }} />}
        <span>{label}</span>
      </div>
      <div className="payment-select">
        <input
          type="radio"
          name={radioName}
          value={value}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PaymentMethodRow;