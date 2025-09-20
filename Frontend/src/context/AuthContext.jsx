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
  const [customer, setCustomer] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;


  useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}user`);
        setCustomer(res.data.users)
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    fetchCustomers();
  }, [])


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
      const res = await axios.get(`${BASE_URL}user/${user._id}/addresses`);
      setAddresses(res.data);
    } catch (error) {
      console.error("Failed fetching addresses", error);
    }
  };


  return (
    <AuthContext value={{
      user, authLogin, logout,
      addresses, getAddresses, deliveryAddress,
      setDeliveryAddress, customer
    }}>
      {!loading && children}
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);
