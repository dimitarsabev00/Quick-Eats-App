import { Navigate, Route, Routes, useLocation } from "react-router";
import { Auth, Main } from "../screens";
import { auth } from "../configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ReactNode } from "react";

const RoutesComp = () => {
  const [user] = useAuthState(auth);

  const PrivateRoute = ({ children }: { children: ReactNode }) => {
    let location = useLocation();
    if (!user)
      return <Navigate to="/auth" state={{ from: location }} replace />;
    return children;
  };

  const AuthRoute = ({ children }: { children: ReactNode }) => {
    let location = useLocation();
    if (user) return <Navigate to={"/"} state={{ from: location }} replace />;
    return children;
  };

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default RoutesComp;
