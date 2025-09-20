import React, { useRef } from 'react'
import './productdisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import dollarToRupees from '../../utils/formatCurrency';
import { useShopContext } from '../../context/ShopContext';

const Productdisplay = (props) => {
  const { product } = props;
  const { addToCart } = useShopContext();
  const boxRef = useRef(null);
  
  const StockStatus = ({ quantity }) => {
    if (quantity === 0) return <span style={{ color: "red", fontSize: "20px", fontWeight: 650 }}>Out of Stock</span>;
    if (quantity <= 10)
      return <span style={{ color: "orange", fontSize: "20px", fontWeight: 650 }}>Only {quantity} left</span>;
    return <span style={{ color: "green", fontSize: "20px", fontWeight: 650 }}>In Stock</span>;
  };

  const HandleHover = (e) => {
    const { left, top, width, height } = boxRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    boxRef.current.style.setProperty('--display', 'block');
    boxRef.current.style.setProperty("--zoom-x", `${x}%`);
    boxRef.current.style.setProperty("--zoom-y", `${y}%`);

  }

  const handleMouseLeave = () => {
    boxRef.current.style.setProperty("--display", "none");
  };

  return (
    <>
      <div className="productdisplay">
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
          </div>
          <div className="productdisplay-img"
            ref={boxRef}
            onMouseMove={HandleHover}
            onMouseLeave={handleMouseLeave}
            style={{
              '--Url': `url(${product.image})`,
              '--zoom-x': "0%", '--zoom-y': "0%",
              '--display': 'none'
            }}
          >
            <img className='productdisplay-main-img' src={product.image} alt="" />
          </div>
        </div>
        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">₹{dollarToRupees(product.old_price, 60)}</div>
            <div className="productdisplay-right-price-new">₹{dollarToRupees(product.new_price, 60)}</div>
          </div>
          <div className="productdisplay-right-discription">
            Allen Solly Men's Cotton Regular Fit Polo T-Shirt
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
          </div>
          <div className="productdisplay-right-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <button onClick={() => { addToCart(product.id) }}
            style={{background: !product.quantity? '#ff41415d': '#FF4141'}}
            disabled={!product.quantity}
          >ADD TO CART</button>
          <StockStatus quantity={product.quantity} />
          <p className="productdisplay-right-category"><span>Category :</span>Women , T-Shirt, Crop Top</p>
          <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest</p>
        </div>
      </div>
    </>
  )
}

export default Productdisplay
