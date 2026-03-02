import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const hasToken = document.cookie.includes("token");

  if (!hasToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
