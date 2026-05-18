import { createSlice } from "@reduxjs/toolkit";
import type { UnknownAction, PayloadAction } from "@reduxjs/toolkit";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Report } from "notiflix/build/notiflix-report-aio";

import type { AuthState, User } from "../../types/index.ts";
import {
  updateUsersAvatar,
  updateUsersInfo,
  logout,
  refresh,
  deleteUser,
  login,
  register,
} from "./operations.ts";

Notify.init({
  position: "center-top",
  showOnlyTheLastOne: true,
  clickToClose: true,
});
Loading.init({ clickToClose: true });

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: true,
  isRefreshing: false,
  error: null,
};

const isPendingAction = (action: UnknownAction): boolean =>
  action.type.startsWith("auth") && action.type.endsWith("/pending");

const isRejectAction = (
  action: UnknownAction,
): action is PayloadAction<unknown> =>
  action.type.startsWith("auth") && action.type.endsWith("/rejected");

const handlePending = (state: AuthState): void => {
  state.isRefreshing = true;
  state.error = null;
  Loading.pulse("Loading...");
};

const handleRejected = (
  state: AuthState,
  action: PayloadAction<unknown>,
): void => {
  state.token = null;
  state.isLoggedIn = false;
  state.isRefreshing = false;
  state.error = action.payload ?? null;
  Loading.remove();
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload as unknown as {
          user: User;
          accessToken?: string;
          confirmToken?: string;
        };
        state.user = payload.user;
        if (payload.accessToken) state.token = payload.accessToken;
        if (payload.confirmToken) state.token = payload.confirmToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
        Loading.remove();
        Notify.success("Logged in successfuly.");
      })
      .addCase(register.fulfilled, (state) => {
        state.isRefreshing = false;
        state.error = null;
        Report.success(
          "Almost done,",
          "We just need you to confirm email provided when signing up. Check SPAM folder if you haven't recieved any email.",
          "Okay"
        );
        Loading.remove();
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
        Loading.remove();
        Notify.success("Logged out successfuly.");
      })
      .addCase(refresh.fulfilled, (state, action) => {
        const payload = action.payload as unknown as { user: User };
        state.user = payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
        Loading.remove();
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
        Report.success(
          "User deleted",
          "We're sorry to let you go. But we will always welcome you back!",
          "Bye"
        );
      })
      .addCase(updateUsersAvatar.fulfilled, (state, action) => {
        const payload = action.payload as unknown as { user: User };
        if (state.user) state.user.photoUrl = payload.user.photoUrl;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
        Notify.merge({ showOnlyTheLastOne: false });
        Notify.success("User avatar updated.");
        Loading.remove();
      })
      .addCase(updateUsersInfo.fulfilled, (state, action) => {
        const payload = action.payload as unknown as { user: User };
        if (state.user) state.user.name = payload.user.name;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
        Notify.merge({ showOnlyTheLastOne: false });
        Notify.success("User name updated.");
        Loading.remove();
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectAction, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
