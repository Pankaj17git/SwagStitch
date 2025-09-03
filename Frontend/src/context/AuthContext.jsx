// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const authLogin = (data) => {
    localStorage.setItem("auth-token", data.token);
    localStorage.setItem('auth-user', JSON.stringify(data.user));
    setUser({ name: data.user.name, role: data.user.role });
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    setUser(null);
  };

  return (
    <AuthContext value={{ user, authLogin, logout }}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);
