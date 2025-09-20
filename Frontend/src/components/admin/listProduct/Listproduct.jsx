import React, { useEffect, useState } from "react";
import "./Listproduct.css";
import remove_icon from "../../Assets/cart_cross_icon.png";
import EditIcon from '@mui/icons-material/Edit';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

const StockStatus = ({ quantity }) => {
  if (quantity === 0) return <span style={{ color: "red" }}>Out of Stock</span>;
  if (quantity <= 10)
    return <span style={{ color: "orange" }}>Only {quantity} left</span>;
  return <span style={{ color: "green" }}>In Stock</span>;
};
  const BASE_URL = import.meta.env.VITE_BASE_URL;

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editQuantities, setEditQuantities] = useState({});
  const [editProductId, setEditProductId] = useState(null); // 🔹 track which product is being edited



  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${BASE_URL}products`);
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchInfo();
  }, [allproducts]);

  const removeProduct = async (id) => {
    try {
      await fetch(`${BASE_URL}products/removeproduct/${id}`, {
        method: "DELETE",
      });
      setAllProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity <= 0) return alert('The quantity should be greater than 0');
    try {
      const res = await fetch(`${BASE_URL}products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (res.ok) {
        setAllProducts((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, quantity: newQuantity } : p
          )
        );
        setEditQuantities((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
        setEditProductId(null); // exit edit mode
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
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
        <p>Actions</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => (
          <React.Fragment key={product._id}>
            <div className="listproduct-format-main list-format">
              <img
                src={product.image}
                alt=""
                className="listproduct-producticon"
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>

              {/* 🔹 Quantity column */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: 'center' }}>
                {editProductId === product._id ? (
                  <>
                    <input
                      type="number"
                      min="0"
                      value={editQuantities[product._id] ?? product.quantity}
                      onChange={(e) =>
                        setEditQuantities((prev) => ({
                          ...prev,
                          [product._id]: parseInt(e.target.value, 10),
                        }))
                      }
                      style={{ width: "50px", padding: "3px" }}
                    />
                    <IconButton
                      onClick={() =>
                        updateQuantity(
                          product._id,
                          editQuantities[product._id] ?? product.quantity
                        )
                      }
                    >
                      <UpgradeIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditProductId(null)}>
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <p style={{ margin: 0 }}>{product.quantity}</p>
                    <IconButton onClick={() => setEditProductId(product._id)}>
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </div>

              <StockStatus quantity={product.quantity} />

              <img
                onClick={() => removeProduct(product._id)}
                src={remove_icon}
                alt="remove"
                className="listproduct-remove-icon"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
