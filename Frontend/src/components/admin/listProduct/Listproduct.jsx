import React, { useEffect, useState } from "react";
import "./Listproduct.css";
import remove_icon from "../../Assets/cart_cross_icon.png";

const StockStatus = ({ quantity }) => {
  if (quantity === 0) return <span style={{ color: "red" }}>Out of Stock</span>;
  if (quantity <= 10)
    return <span style={{ color: "orange" }}>Only {quantity} left</span>;
  return <span style={{ color: "green" }}>In Stock</span>;
};

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch("http://localhost:4000/products");
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch(`http://localhost:4000/products/removeproduct/${id}`, {
        method: "DELETE",
      });
      setAllProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
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
          <p>Quantity</p>
          <p>Stock</p>
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
                <p>{product.quantity}</p>
                <StockStatus quantity={product.quantity}/>
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
