import React from "react";
import { Navigate, Route } from "react-router-dom";

interface PrivateRouteProps {
  path: string;
  isAuthenticated: boolean;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  element,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRoute;
