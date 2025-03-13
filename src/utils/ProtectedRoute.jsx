import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import PomodoroWidget from "../components/PomodoroWidget";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading screen while checking auth state
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <PomodoroWidget />
      {children}
    </>
  );
}
