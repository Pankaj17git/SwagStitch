/* eslint-disable react-refresh/only-export-components */
// AuthContext.jsx
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);


  useEffect(() => {
    if (user?._id) {
      getAddresses();
    }
  }, [user?._id]);


  const authLogin = (data) => {
    localStorage.setItem("auth-token", data.token);
    localStorage.setItem('auth-user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    setUser(null);
  };

  const getAddresses = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${user._id}/addresses`);
      setAddresses(res.data);
    } catch (error) {
      console.error("Failed fetching addresses", error);
    }
  };


  return (
    <AuthContext value={{ user, authLogin, logout, addresses, getAddresses, deliveryAddress, setDeliveryAddress }}>
      {!loading && children}
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);
