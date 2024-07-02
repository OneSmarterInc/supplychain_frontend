import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (userData) {
    if (location.pathname === "/signin" && userData.isadmin) {
      return <Navigate to="/createsim" replace />;
    } else {
      if (location.pathname === "/signin") {
        return <Navigate to="/" replace />;
      }
      if (userData.isadmin) {
        return children;
      } else {
        if (location.pathname === "/createsim") {
          return <Navigate to="/usersidelive" replace />;
        } else {
          return children;
        }
      }
    }
  } else {
    // Redirect invalid users to the signin page
    if (location.pathname !== "/signin") {
      return <Navigate to="/signin" replace />;
    } else if (location.pathname === "/") {
      return <Navigate to="/signin" replace />;
    } else {
      return children;
    }
  }
};
