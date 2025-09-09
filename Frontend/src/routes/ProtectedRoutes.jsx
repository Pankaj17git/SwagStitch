import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import LoginSignUp from '../pages/LoginSignUp'

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate('/')
    }
  }, [user, navigate])

  if (!user || user.role !== "admin") {
    return null;
  }

  return children;
}

export default ProtectedRoutes
