import { useSelector } from "react-redux";

import type { RootState } from "../redux/store.ts";
import type { User } from "../types/index.ts";
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectError,
} from "../redux/auth/selector.ts";

const useAuth = () => {
  const isLoggedIn = useSelector<RootState, boolean>(selectIsLoggedIn);
  const isRefreshing = useSelector<RootState, boolean>(selectIsRefreshing);
  const user = useSelector<RootState, User | null>(selectUser);
  const error = useSelector<RootState, unknown>(selectError);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    error,
  };
};

export default useAuth;
