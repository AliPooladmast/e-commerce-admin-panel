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

        <Route
          path="/"
          element={user ? <WrappedHome /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/users"
          element={user ? <WrappedUsers /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/newuser"
          element={user ? <WrappedNewUser /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/user"
          element={user ? <WrappedUser /> : <Navigate to="/login" replace />}
        >
          <Route
            path=":id"
            element={user ? <WrappedUser /> : <Navigate to="/login" replace />}
          />
        </Route>

        <Route
          path="/products"
          element={
            user ? <WrappedProducts /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/newproduct"
          element={
            user ? <WrappedNewProduct /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/product"
          element={user ? <WrappedProduct /> : <Navigate to="/login" replace />}
        >
          <Route
            path=":id"
            element={
              user ? <WrappedProduct /> : <Navigate to="/login" replace />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
