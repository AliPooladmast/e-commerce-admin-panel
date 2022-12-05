import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newproduct/NewProduct";
import Login from "./pages/login/Login";
import NewUser from "./pages/newuser/NewUser";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { setMessage } from "./redux/uxSlice";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isFetching: userLoading } = useSelector(
    (state) => state.user
  );
  const { isFetching: productLoading } = useSelector((state) => state.product);
  const { message } = useSelector((state) => state.ux);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setMessage({ type: "info", text: null }));
  };

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      {message?.text && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(message)}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={message?.type}
            sx={{ width: "100%" }}
          >
            {message?.text}
          </Alert>
        </Snackbar>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={userLoading || productLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
    </>
  );
}

export default App;
