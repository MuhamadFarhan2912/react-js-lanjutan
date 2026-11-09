
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  isAuthenticated,
  hasRole,
  clearAuthData,
} from "../_services/auth";

export default function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();

  // Cek apakah pengguna sudah login dan token masih valid
  if (!isAuthenticated()) {
    clearAuthData();

    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Cek apakah role pengguna memiliki izin
  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/" replace />;
  }

  // Jika akses diizinkan, tampilkan halaman
  return children || <Outlet />;
}
