import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  let isToken = JSON.parse(localStorage.getItem("token")) || null;
  const location = useLocation();

  if (isToken !== null) {
    //temporary , actual must be (isToken !== null)

    return children;
  }
  return <Navigate to={"/signin"} state={location.pathname} replace />;
};
