// src/context/ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
interface ProtectedRouteProps {
  children: JSX.Element;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const context = useContext(AuthContext);
const location = useLocation();
  // Check if context is undefined (i.e., not wrapped in AuthProvider)
  if (context === undefined) {
    throw new Error("ProtectedRoute must be used within an AuthProvider");
  }

  const { user, loading } = context;



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }


  return children;
};

export default ProtectedRoute;
