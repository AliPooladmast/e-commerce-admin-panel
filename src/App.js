import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import NewUser from "./pages/newuser/NewUser";
import Products from "./pages/products/Products";
import SideBar from "./components/siderbar/SideBar";
import TopBar from "./components/topbar/TopBar";
import style from "./App.module.scss";
import Product from "./pages/product/Product";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <div className={style.MainLayout}>
        <SideBar />
        <div className={style.Body}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/users" element={<Users />} />
            <Route path="/newuser" element={<NewUser />} />
            <Route path="/user" element={<User />}>
              <Route path=":id" element={<User />} />
            </Route>

            <Route path="/products" element={<Products />} />
            <Route path="/newproduct" element={<NewUser />} />
            <Route path="/product" element={<Product />}>
              <Route path=":id" element={<Product />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
