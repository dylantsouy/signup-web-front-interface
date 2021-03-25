import React, { useState, useEffect } from "react";
import * as localforage from "localforage";
import { authLogin } from "../apis/loginApi";
import { noty } from "../helpers/noty";

export const AuthContext = React.createContext({});
export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);
  
  const checkAuth = async () => {
    const storedToken = await localforage.getItem("token");
    if (!storedToken) {
      await localforage.clear();
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
  };

  const login = async (username, password) => {
    return await authLogin(username, password)
  };

  const logout = async () => {
    // await authLogout();
    noty("登出成功", "success");
    await localforage.clear();
    setIsAuthenticated(false);
  };

  return (
    // AuthContext.Provider will wrap the components
    // The wrapped components can use the value sent from the AuthContext.Provider
    // To use the value, the wrapped components should delcare 'useContext(AuthContext)'
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
