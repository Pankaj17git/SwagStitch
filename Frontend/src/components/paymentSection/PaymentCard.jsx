import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PaymentCard = ({ 
  title, 
  children, 
  collapsible = false, 
  isOpen, 
  onToggle, 
  radioName, 
  onChange,
  value,
  disabled = false, 
  note, 
  icon 
}) => {
  return (
    <div className={`payment-card ${collapsible ? 'collapsible' : ''} ${disabled ? 'disabled' : ''}`}>
      {!collapsible ? (
        <label>
          <span>
            {icon && <img src={icon} alt={title} style={{ height: '24px', width: 'auto', marginRight: '8px' }} />}
            {title}
          </span>
          <input type="radio" name={radioName} value={value} onChange={onChange} disabled={disabled} />
          {note && <p className="note">{note}</p>}
        </label>
      ) : (
        <>
          <div className="card-header">
            <span>{title}</span>
            <span className={`arrow ${isOpen ? 'arrowActive' : ''}`} onClick={onToggle}>
              <ExpandMoreIcon />
            </span>
          </div>
          {isOpen && <div className="payment-options">{children}</div>}
        </>
      )}
    </div>
  );
};

export default PaymentCard;
