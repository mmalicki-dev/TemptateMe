import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App/App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { HelmetProvider } from "react-helmet-async";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { ErrorBoundary } from "./components/Atoms/ErrorBoundary/ErrorBoundary.jsx";

import { store, persistor } from "./redux/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <DarkModeProvider>
                <App />
              </DarkModeProvider>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
