import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.roles)) {
    // User doesn't have the required role
    return <Navigate to="/unauthorized" />;
  }

  // User is logged in and has the required role
  return children;
};

export default PrivateRoute;
