import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/index.ts";

interface RestrictedRouteProps {
  component: ReactElement;
  redirectTo?: string;
}

export const RestrictedRoute = ({
  component: Component,
  redirectTo = "/",
}: RestrictedRouteProps) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
