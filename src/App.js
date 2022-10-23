import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newproduct/NewProduct";
import Login from "./pages/login/Login";
import NewUser from "./pages/newuser/NewUser";
import AddMarginToPage from "./hoc/AddMarginToPage";
import { useSelector } from "react-redux";

function App() {
  const WrappedHome = AddMarginToPage(Home);
  const WrappedUsers = AddMarginToPage(Users);
  const WrappedUser = AddMarginToPage(User);
  const WrappedProducts = AddMarginToPage(Products);
  const WrappedNewProduct = AddMarginToPage(NewProduct);
  const WrappedProduct = AddMarginToPage(Product);
  const WrappedNewUser = AddMarginToPage(NewUser);

  const user = useSelector((state) => state.user.currentUser);
  const isAdmin = user?.isAdmin;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAdmin ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/"
          element={isAdmin ? <WrappedHome /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/users"
          element={
            isAdmin ? <WrappedUsers /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/newuser"
          element={
            isAdmin ? <WrappedNewUser /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/user"
          element={isAdmin ? <WrappedUser /> : <Navigate to="/login" replace />}
        >
          <Route
            path=":id"
            element={
              isAdmin ? <WrappedUser /> : <Navigate to="/login" replace />
            }
          />
        </Route>

        <Route
          path="/products"
          element={
            isAdmin ? <WrappedProducts /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/newproduct"
          element={
            isAdmin ? <WrappedNewProduct /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/product"
          element={
            isAdmin ? <WrappedProduct /> : <Navigate to="/login" replace />
          }
        >
          <Route
            path=":id"
            element={
              isAdmin ? <WrappedProduct /> : <Navigate to="/login" replace />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
