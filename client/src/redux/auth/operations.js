import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
const MAIN_ENDPOINT = import.meta.env.VITE_MAIN_ENDPOINT;

axios.defaults.baseURL =
  API_URL || `http://localhost:${SERVER_PORT}${MAIN_ENDPOINT}`;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

const register = createAsyncThunk(
  "auth/register",
  async (credentails, thunkAPI) => {
    try {
      const response = await axios.post("auth/register", credentails);
      setAuthHeader(response.data.confirmToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const login = createAsyncThunk("auth/login", async (credentails, thunkAPI) => {
  try {
    const response = await axios.post("auth/login", credentails);
    setAuthHeader(response.data.accessToken);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("auth/logout");
    clearAuthHeader();
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
    setAuthHeader(persistedToken);
    const response = await axios.get("auth/refresh");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const deleteUser = createAsyncThunk("auth/delete", async (_, thunkAPI) => {
  try {
    await axios.delete("auth/delete");
    clearAuthHeader();
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
      const response = await axios.put("user/edit/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateUsersInfo = createAsyncThunk(
  "auth/updateInfo",
  async (info, thunkAPI) => {
    try {
      const response = await axios.put("user/edit/info", info);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
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
