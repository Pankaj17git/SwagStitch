import React from 'react'
import './Item.css'
import { Link } from 'react-router';
import dollarToRupees from '../../utils/formatCurrency';

const Item = (props) => {
 
  return (
    <>
      <div className="item">
        <Link to={`/product/${props.id}`} onClick={window.scrollTo(0,0) }><img src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">
            ₹{dollarToRupees(props.new_price, 60)}
          </div>
          <div className="item-price-old">
            ₹{dollarToRupees(props.old_price, 60)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Item
