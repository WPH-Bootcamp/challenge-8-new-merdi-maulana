import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "./context/FavoritesContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FavoritesProvider>
          <App />
          <Toaster position="top-center" offset={114} />
        </FavoritesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
