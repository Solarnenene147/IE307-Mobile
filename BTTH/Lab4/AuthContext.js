import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { countCartItems } from "./database/db";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [countCart, setCountCart] = useState(0);

  const updateCountCart = (newCount) => setCountCart(newCount);

  useEffect(() => {
    const fetchCountCart = async () => {
      if (userToken) {
        const user = jwtDecode(userToken);
        const cartCount = await countCartItems(user.sub);
        setCountCart(cartCount);
      }
    };

    fetchCountCart();
  }, [userToken]);

  const authContext = {
    logIn: async (username, password) => {
      try {
        const response = await axios.post(
          "https://fakestoreapi.com/auth/login",
          {
            username,
            password,
          }
        );
        const token = response.data.token;
        setUserToken(token);
        return token;
      } catch (error) {
        alert("Username or password is incorrect");
        throw new Error("Username or password is incorrect");
      }
    },
    logOut: () => {
      setUserToken("");
    },
    updateCountCart,
    userToken,
    countCart,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
