import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../apiClient.js";

const fetchShoppingList = createAsyncThunk(
  "shoppingList/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await api.get("user/shopping");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addProduct = createAsyncThunk(
  "shoppingList/addProduct",
  async (product, thunkAPI) => {
    try {
      return await api.post("user/shopping", product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteProduct = createAsyncThunk(
  "shoppingList/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await api.patch("user/shopping", id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export { fetchShoppingList, addProduct, deleteProduct };
