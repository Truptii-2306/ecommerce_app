import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user?.email) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
