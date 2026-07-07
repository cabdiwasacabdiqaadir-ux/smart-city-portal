import { Navigate } from "react-router-dom";
import { useAuth } from "@/components/useAuth";

export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}