import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(AppContext);
  const user = context?.user;

  if (user) {
    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
      return <Navigate to="/admin-dashboard" />;
    } else if (user.role === 'INVESTOR') {
      return <Navigate to="/investor-dashboard" />;
    } else if (user.role === 'ENTREPRENEUR') {
      return <Navigate to="/entrepreneur-dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return children;
}

export default PublicRoutes;
