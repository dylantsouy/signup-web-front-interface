import React, { useState, useEffect } from "react";
import * as localforage from "localforage";
import { authLogin } from "../apis/loginApi";
import { useHistory } from "react-router-dom";
import { noty } from "../helpers/noty";
import { getUser } from "../apis/memberApi";

export const AuthContext = React.createContext({});
export default function Auth({ children }) {
    const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    await authLogin(username, password)
      .then(async (res) => {
        if (res.data.returnCode === 2) {
          noty("此帳號尚未驗證");
          return;
        }
        if (res.data.returnCode === 1) {
          noty("帳號或密碼錯誤");
          return;
        }
        await getUser(username)
          .then(async (response) => {
            await localforage.setItem("user", response.data);
            history.push("/dashboard");
            noty("登入成功", "success");
          })
          .catch(function (error) {
            return;
          });
      })
      .catch(function (error) {
        noty("登入失敗,發生錯誤");
        return;
      });

    const user = await localforage.getItem("user");
    if (!user) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  };
  const userDetail = async ()=>{
    const user = await localforage.getItem("user");
    return user
  }
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
        userDetail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
