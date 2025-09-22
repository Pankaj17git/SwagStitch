import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProtectedUserRoutes = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please Login first!");
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
