import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext({
  activeUser: {},
  setActiveUser: () => {},
  config: {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  },
  setConfig: () => {},
});

const AuthContextProvider = (props: any) => {
  const [activeUser, setActiveUser] = useState({});
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  useEffect(() => {
    const controlAuth = async () => {
      try {
        const { data } = await axios.get("/auth/private", config);
        setActiveUser(data.user);
      } catch (error) {
        localStorage.removeItem("authToken");

        setActiveUser({});
      }
    };
    controlAuth();
  }, []);

  return (
    <AuthContext
      value={{ activeUser, setActiveUser, config, setConfig }}
    ></AuthContext.Provider>
  );
};

export default AuthContextProvider;
