const AddressSummary = ({ user, address }) => {
  if (!address) return null;

  return (
    <div className="address-container">
      <div>
        <h5>Deliver To: {user?.name} , {address.pincode}</h5>
        <p style={{ fontSize: '12px' }}>
          ({address.label}) {address.street}, {address.city}
        </p>
      </div>
      <button>CHANGE</button>
    </div>
  );
};

export default AddressSummary;
