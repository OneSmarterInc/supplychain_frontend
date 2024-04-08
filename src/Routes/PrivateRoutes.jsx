import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  let isAdminToken = JSON.parse(localStorage.getItem("admin")) || null;

  const location = useLocation();

  if (isAdminToken !== null) {
    //temporary , actual must be (isToken !== null)
    return children;
  }
  return <Navigate to={"/"} state={location.pathname} replace />;
};
