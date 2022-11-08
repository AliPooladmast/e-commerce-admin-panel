import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newproduct/NewProduct";
import Login from "./pages/login/Login";
import NewUser from "./pages/newuser/NewUser";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Home />} />

      <Route path="/users" element={<Users />} />
      <Route path="/newuser" element={<NewUser />} />
      <Route path="/user" element={<User />}>
        <Route path=":id" element={<User />} />
      </Route>

      <Route path="/products" element={<Products />} />
      <Route path="/newproduct" element={<NewProduct />} />
      <Route path="/product" element={<Product />}>
        <Route path=":id" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
