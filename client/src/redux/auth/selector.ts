import type { RootState } from "../store.ts";
import type { AuthState, User } from "../../types/index.ts";

const auth = (state: RootState): AuthState => state.auth as AuthState;

const selectIsLoggedIn = (state: RootState): boolean => auth(state).isLoggedIn;

const selectUser = (state: RootState): User | null => auth(state).user;

const selectIsRefreshing = (state: RootState): boolean =>
  auth(state).isRefreshing;

const selectError = (state: RootState): unknown => auth(state).error;

export { selectIsLoggedIn, selectUser, selectIsRefreshing, selectError };
