import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../hooks/index.ts";
import { PrivateRoute } from "../../components/Atoms/PrivateRoute/PrivateRoute.tsx";
import { RestrictedRoute } from "../../components/Atoms/RestrictedRoute/RestrictedRoute.tsx";
import { Helmet } from "react-helmet-async";
import { SharedLayout } from "../SharedLayout/SharedLayout.tsx";
import styles from "./App.module.css";
import { refresh } from "../../redux/auth/operations.ts";
import { useDarkMode } from "../../context/DarkModeContext.tsx";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import type { AppDispatch } from "../../redux/store.ts";

const HomePage = lazy(() =>
  import("../Home/HomePage.tsx").then((module) => ({ default: module.HomePage }))
);
const AuthPage = lazy(() =>
  import("../Auth/AuthPage.tsx").then((module) => ({ default: module.AuthPage }))
);
const StartPage = lazy(() =>
  import("../Start/StartPage.tsx").then((module) => ({ default: module.StartPage }))
);
const FavoritesPage = lazy(() =>
  import("../Favorites/Favorites.tsx").then((module) => ({ default: module.FavoritesPage }))
);
const AddRecipePage = lazy(() =>
  import("../AddRecipe/AddRecipe.tsx").then((module) => ({ default: module.AddRecipePage }))
);
const MyRecipesPage = lazy(() =>
  import("../MyRecipes/MyRecipes.tsx").then((module) => ({ default: module.MyRecipesPage }))
);
const ShoppingPage = lazy(() =>
  import("../Shopping/Shopping.tsx").then((module) => ({ default: module.ShoppingPage }))
);
const CategoriesPage = lazy(() =>
  import("../Categories/CategoriesPage.tsx").then((module) => ({ default: module.CategoriesPage }))
);
const SearchRecipePage = lazy(() =>
  import("../SearchRecipe/SearchRecipe.tsx").then((module) => ({ default: module.SearchRecipePage }))
);
const Recipe = lazy(() =>
  import("../../components/Templates/Recipe/Recipe.tsx").then((module) => ({ default: module.Recipe }))
);
const NotFoundPage = lazy(() =>
  import("../NotFound/NotFound.tsx").then((module) => ({ default: module.NotFoundPage }))
);
const EmailVerifiedPage = lazy(() =>
  import("../EmailVerified/EmailVerifiedPage.tsx").then((module) => ({ default: module.EmailVerifiedPage }))
);

function App() {
  const { error } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { isDark } = useDarkMode();

  useEffect(() => {
    error &&
      Notify.failure((error as any)?.resultMessage?.en || "Something went wrong...");
  }, [error]);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <div className={[styles.App, isDark && styles.isDark].join(" ")}>
      <Helmet>
        <title>Temptate Me</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={<RestrictedRoute redirectTo="/home" component={<StartPage />} />}
          />
          <Route
            path="/register"
            element={<RestrictedRoute redirectTo="/home" component={<AuthPage isRegister={true} />} />}
          />
          <Route
            path="/signin"
            element={<RestrictedRoute redirectTo="/home" component={<AuthPage isRegister={false} />} />}
          />
          <Route
            path="/home"
            element={<PrivateRoute redirectTo="/" component={<HomePage />} />}
          />
          <Route
            path="/categories"
            element={<PrivateRoute redirectTo="/" component={<CategoriesPage />} />}
          />
          <Route
            path="/addRecipe"
            element={<PrivateRoute redirectTo="/" component={<AddRecipePage />} />}
          />
          <Route
            path="/myRecipes"
            element={<PrivateRoute redirectTo="/" component={<MyRecipesPage />} />}
          />
          <Route
            path="/favorites"
            element={<PrivateRoute redirectTo="/" component={<FavoritesPage />} />}
          />
          <Route
            path="/shopping"
            element={<PrivateRoute redirectTo="/" component={<ShoppingPage />} />}
          />
          <Route
            path="/searchRecipes"
            element={<PrivateRoute redirectTo="/" component={<SearchRecipePage />} />}
          />
          <Route
            path="/recipe/:recipeId"
            element={<PrivateRoute redirectTo="/" component={<Recipe />} />}
          />
          <Route path="/email-verified" element={<EmailVerifiedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
