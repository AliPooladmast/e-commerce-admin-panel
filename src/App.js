import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import NewUser from "./pages/newuser/NewUser";
import Products from "./pages/products/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users" element={<Users />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/user" element={<User />}>
          <Route path=":id" element={<User />} />
        </Route>

        <Route path="/products" element={<Products />} />
        <Route path="/newproduct" element={<NewUser />} />
        <Route path="/product" element={<User />}>
          <Route path=":id" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
