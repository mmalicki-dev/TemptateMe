// ─── API Response ────────────────────────────────────────────────────────────

export type ApiOk<T = undefined> = T extends undefined
  ? { ok: true }
  : { ok: true; data: T };

export type ApiError = { ok: false; message: string };

export type ApiResponse<T = undefined> = ApiOk<T> | ApiError;

// ─── Domain ──────────────────────────────────────────────────────────────────

export interface ShoppingItem {
  _id: string;
  ingredientId: string;
  measure: string;
  recipeId: string;
  recipeName: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  name: string;
  photoUrl: string;
  isVerified: boolean;
  newsletter: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeIngredient {
  id: string;
  measure: string;
}

export interface Recipe {
  _id: string;
  title: string;
  category: string;
  area?: string;
  instructions: string;
  preview: string;
  time: string;
  youtube?: string;
  tags: string[];
  favorites: string[];
  ingredients: RecipeIngredient[];
  thumb: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ingredient {
  _id: string;
  ttl: string;
  desc: string;
  t?: string;
  thb: string;
}

export interface Category {
  _id: string;
  title: string;
  thumb: string;
  description: string;
}

// ─── Redux State ─────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: unknown;
}

export interface RecipesState {
  items: Recipe[];
  currentRecipe: Recipe | null;
  pageAmount: number;
  page: number;
  isLoading: boolean;
  error: unknown;
}

export interface ShoppingState {
  items: ShoppingItem[];
  isLoading: boolean;
  error: unknown;
}

export interface CategoriesState {
  items: Category[];
  isLoading: boolean;
  error: unknown;
}

export interface IngredientsState {
  items: Ingredient[];
  isLoading: boolean;
  error: unknown;
}

