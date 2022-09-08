import reportWebVitals from "./reportWebVitals";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import App from "./App";
import useAuth from "../src/utils/useAuth";
import { CartProvider } from "react-use-cart";
const queryClient = new QueryClient();
const token = localStorage.getItem("token");
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
const root = ReactDOM.createRoot(document.getElementById("root"));
const auth = useAuth(token);
const userContext = createContext();

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <CartProvider>
        <userContext.Provider value={auth}>
          <App />
        </userContext.Provider>
      </CartProvider>
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { userContext };
