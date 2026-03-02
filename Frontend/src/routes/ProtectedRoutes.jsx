import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, {
      credentials: "include",
    })
      .then(res => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  if (!isAuth) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;