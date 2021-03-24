/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../auths/Auth";

const PrivateRoute = ({ component: Component, ...props }) => {
  // Declare the useContext() so this component will have the same context as AuthContext.Provider
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
