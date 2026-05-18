import type { RootState } from "../store.ts";
import type { User } from "../../types/index.ts";

const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;

const selectUser = (state: RootState): User | null => state.auth.user;

const selectIsRefreshing = (state: RootState): boolean =>
  state.auth.isRefreshing;

const selectError = (state: RootState): unknown => state.auth.error;

export { selectIsLoggedIn, selectUser, selectIsRefreshing, selectError };
