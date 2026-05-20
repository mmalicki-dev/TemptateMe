import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/index.ts";

interface PrivateRouteProps {
  component: ReactElement;
  redirectTo?: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: PrivateRouteProps) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
