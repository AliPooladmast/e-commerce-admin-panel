import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import NewUser from "./pages/newuser/NewUser";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newproduct/NewProduct";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AddMarginToPage from "./hoc/AddMarginToPage";
import { useSelector } from "react-redux";

function App() {
  const WrappedHome = AddMarginToPage(Home);
  const WrappedUsers = AddMarginToPage(Users);
  const WrappedNewUser = AddMarginToPage(NewUser);
  const WrappedUser = AddMarginToPage(User);
  const WrappedProducts = AddMarginToPage(Products);
  const WrappedNewProduct = AddMarginToPage(NewProduct);
  const WrappedProduct = AddMarginToPage(Product);

  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />

        <Route path="/" element={<WrappedHome />} />

        <Route path="/users" element={<WrappedUsers />} />
        <Route path="/newuser" element={<WrappedNewUser />} />
        <Route path="/user" element={<WrappedUser />}>
          <Route path=":id" element={<WrappedUser />} />
        </Route>

        <Route path="/products" element={<WrappedProducts />} />
        <Route path="/newproduct" element={<WrappedNewProduct />} />
        <Route path="/product" element={<WrappedProduct />}>
          <Route path=":id" element={<WrappedProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
