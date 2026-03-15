import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  requiredRole?: "creator" | "brand";
}

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const { user, role, loading, onboardingCompleted } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!onboardingCompleted) return <Navigate to="/onboarding/role" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/feed" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
