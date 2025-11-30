import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("bad_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("bad_token"));

  useEffect(() => {
    if (user) localStorage.setItem("bad_user", JSON.stringify(user));
    else localStorage.removeItem("bad_user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("bad_token", token);
    else localStorage.removeItem("bad_token");
  }, [token]);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
