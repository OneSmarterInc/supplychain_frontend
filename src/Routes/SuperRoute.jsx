import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.is_super_admin) {
    // If the user is not logged in or not an admin, redirect to the /usersidelive page.
    return <Navigate to="/" />;
  }

  // If the user is an admin, render the requested component.
  return children;
};

export default ProtectedRoute;
