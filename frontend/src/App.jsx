import LoadingSpinner from "./components/LoadingSpinner";
import FloatingShape from "./components/FloatingShape";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

// protect routes that requires authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

// Redirected authentiacted users to the home page
const RedirectAuthentecatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <div
      className="min-h-screen bg-gradient-to-br
  from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      {/* First shape: large, top-left to center */}
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-10%"
        left="-10%"
        delay={0}
        direction="diagonal"
      />

      {/* Second shape: middle-left to right */}
      <FloatingShape
        color="bg-green-500"
        size="w-40 h-40"
        top="40%"
        left="-10%"
        delay={5}
        direction="horizontal"
      />

      {/* Third shape: bottom-right up and to the left */}
      <FloatingShape
        color="bg-green-500"
        size="w-32 h-32"
        top="70%"
        left="90%"
        delay={2}
        direction="reverse-up"
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <RedirectAuthentecatedUser>
              <SignUpPage />
            </RedirectAuthentecatedUser>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <RedirectAuthentecatedUser>
              <LoginPage />
            </RedirectAuthentecatedUser>
          }
        ></Route>
        <Route path="/verify-email" element={<EmailVerificationPage />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}
