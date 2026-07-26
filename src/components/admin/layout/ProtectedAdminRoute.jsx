// components/admin/layout/ProtectedAdminRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAdminAuth from "../../../hooks/useAdminAuth";

const ProtectedAdminRoute = () => {
  const { isAdmin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Checking access...</div>;
  }

  if (!isAdmin) {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
