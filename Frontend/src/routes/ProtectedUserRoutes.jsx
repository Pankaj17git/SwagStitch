import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";

const ProtectedUserRoutes = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Please Login first!");
      setTimeout(() => {
        navigate("/login");
      }, 300); 
    }
  }, [user, navigate]); 

  if (!user) {
    return null; 
  }

  return children;
};

export default ProtectedUserRoutes;
