import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Section from "./pages/collection/section";
import Category from "./pages/collection/category";
import Product from "./pages/collection/product";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";
import Register from "./pages/auth/register";
import Profile from "./pages/user/profile";
import Error from "./pages/error";
import NotFound from "./pages/error/404";
import ProtectedRoutes from "./components/protectedRoutes";
import AuthRoutes from "./components/AuthRoutes";
import Cart from "./pages/cart";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Layout />}>
        <Route path="/cart" element={<Cart />} />
          <Route index element={<Home />} />
          <Route path="/collection/:section" element={<Section />} />
          <Route path="/collection/:section/:category" element={<Category />} />
          <Route
            path="/collection/:section/:category/:product"
            element={<Product />}
          />
          {/* user profile  cart etc pages */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/error/:code" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
