import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const savedTokens = localStorage.getItem("authTokens");
    return savedTokens ? JSON.parse(savedTokens) : null;
  });

  const [user, setUser] = useState(() => {
    if (authTokens) {
      return jwtDecode(authTokens);
    }
    return null;
  });

  useEffect(() => {
    if (authTokens) {
      localStorage.setItem("authTokens", JSON.stringify(authTokens));
    } else {
      localStorage.removeItem("authTokens");
    }
  }, [authTokens]);

  const loginUser = (tokens) => {
    setAuthTokens(tokens);
    setUser(jwtDecode(tokens));
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
