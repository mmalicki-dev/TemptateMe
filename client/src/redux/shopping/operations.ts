import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../apiClient.ts";

interface AddProductPayload {
  id: string;
  measure: string;
  recipeId: string;
  recipeName: string;
}

interface DeleteProductPayload {
  id: string;
}

const fetchShoppingList = createAsyncThunk(
  "shoppingList/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await api.get("user/shopping");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const addProduct = createAsyncThunk(
  "shoppingList/addProduct",
  async (product: AddProductPayload, thunkAPI) => {
    try {
      return await api.post("user/shopping", product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const deleteProduct = createAsyncThunk(
  "shoppingList/deleteProduct",
  async (payload: DeleteProductPayload, thunkAPI) => {
    try {
      return await api.patch("user/shopping", payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export { fetchShoppingList, addProduct, deleteProduct };
