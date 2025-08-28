import React, { useEffect, useState } from 'react';
import './Listproduct.css';
import remove_icon from '../../assets/Assets/cart_cross_icon.png'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/products')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) });
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch(`http://localhost:4000/products/removeproduct/${id}`, {
      method: 'DELETE',
    });
    await fetchInfo();
  }
  return (
    <>
      <div className="list-product">
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product, index) => {
            return <>
              <div key={index} className="listproduct-format-main list-format">
                <img src={product.image} alt="" className="listproduct-producticon" />
                <p>{product.name}</p>
                <p>₹{product.old_price}</p>
                <p>₹{product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={() => { removeProduct(product.id) }} src={remove_icon} alt="" className="listproduct-remove-icon" />
              </div>
              <hr />
            </>
          })}
        </div>
      </div>
    </>
  )
}

export default ListProduct
