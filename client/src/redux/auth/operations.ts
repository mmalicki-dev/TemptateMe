import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthToken, clearAuthToken } from "../apiClient.ts";
import type { AuthState } from "../../types/index.ts";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface UpdateInfo {
  name?: string;
  username?: string;
}

const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const data = await api.post<{ confirmToken: string }>(
        "auth/register",
        credentials,
      );
      setAuthToken(data.confirmToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const data = await api.post<{ accessToken: string }>(
        "auth/login",
        credentials,
      );
      setAuthToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("auth/logout");
    clearAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as { auth: AuthState };
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue(null);
  }

  try {
    setAuthToken(persistedToken);
    return await api.get("auth/refresh");
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const deleteUser = createAsyncThunk("auth/delete", async (_, thunkAPI) => {
  try {
    await api.delete("auth/delete");
    clearAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const updateUsersAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (avatar: File, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      return await api.put("user/edit/avatar", formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const updateUsersInfo = createAsyncThunk(
  "auth/updateInfo",
  async (info: UpdateInfo, thunkAPI) => {
    try {
      return await api.put("user/edit/info", info);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export {
  deleteUser,
  register,
  login,
  logout,
  refresh,
  updateUsersAvatar,
  updateUsersInfo,
};
