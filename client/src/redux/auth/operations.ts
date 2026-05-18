import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthToken, clearAuthToken } from "../apiClient.js";

const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const data = await api.post("auth/register", credentials);
      setAuthToken(data.confirmToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const data = await api.post("auth/login", credentials);
    setAuthToken(data.accessToken);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("auth/logout");
    clearAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue(null);
  }

  try {
    setAuthToken(persistedToken);
    const data = await api.get("auth/refresh");
    return data;
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
  async (avatar, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const data = await api.put("user/edit/avatar", formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const updateUsersInfo = createAsyncThunk(
  "auth/updateInfo",
  async (info, thunkAPI) => {
    try {
      const data = await api.put("user/edit/info", info);
      return data;
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
