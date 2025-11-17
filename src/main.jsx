import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "react-hot-toast"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster position="top-right" />
          </QueryClientProvider>
        </CartProvider>
        </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>
);

