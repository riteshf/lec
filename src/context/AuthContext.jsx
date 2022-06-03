import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const login = () => {
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        setIsAuth(d.token);
        localStorage.setItem("token", d.token);
      });

    if (state.from) {
      navigate(state.from, { replace: true });
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    setIsAuth(false);
    navigate("/");
    localStorage.setItem("token", "");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsAuth(token);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
