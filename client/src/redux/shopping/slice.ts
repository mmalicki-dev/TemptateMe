import { createSlice } from "@reduxjs/toolkit";
import type { UnknownAction, PayloadAction } from "@reduxjs/toolkit";

import type { ShoppingState, ShoppingItem } from "../../types/index.ts";
import { addProduct, fetchShoppingList, deleteProduct } from "./operations.ts";

const isPendingAction = (action: UnknownAction): boolean =>
  action.type.startsWith("shoppingList/") && action.type.endsWith("/pending");

const isRejectAction = (
  action: UnknownAction,
): action is PayloadAction<unknown> =>
  action.type.startsWith("shoppingList/") && action.type.endsWith("/rejected");

const handlePending = (state: ShoppingState): void => {
  state.isLoading = true;
};

const handleRejected = (
  state: ShoppingState,
  action: PayloadAction<unknown>,
): void => {
  state.isLoading = false;
  state.error = action.payload ?? null;
};

const clearLoadingError = (state: ShoppingState): void => {
  state.isLoading = false;
  state.error = null;
};

const initialState: ShoppingState = {
  items: [],
  isLoading: false,
  error: null,
};

const shoppingList = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingList.fulfilled, (state, action) => {
        clearLoadingError(state);
        const payload = action.payload as unknown as { shoppingList: ShoppingItem[] };
        state.items = payload.shoppingList;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        clearLoadingError(state);
        const payload = action.payload as unknown as { newProduct: ShoppingItem };
        state.items.push(payload.newProduct);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        clearLoadingError(state);
        const { idProduct } = action.payload as unknown as { idProduct: string };
        const index = state.items.findIndex((item) => item._id === idProduct);
        if (index !== -1) state.items.splice(index, 1);
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectAction, handleRejected);
  },
});

export const shoppingListReducer = shoppingList.reducer;
