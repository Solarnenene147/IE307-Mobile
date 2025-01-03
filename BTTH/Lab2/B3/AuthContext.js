import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false); 

  const login = (email, password) => {
    if (email === '22521152@gm.uit.edu.vn' && password === 'huynhminhphuoc') {
      setUser({ email }); 
      setAuthStatus(true); 
    }
  };

  const logout = () => {
    setUser(null); 
    setAuthStatus(false);
  };

  return (
    <AuthContext.Provider value={{ user, authStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
