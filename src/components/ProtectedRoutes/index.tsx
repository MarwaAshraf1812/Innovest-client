import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoutes;
