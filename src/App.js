import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, lazy, Suspense, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { setMessage } from "./redux/uxSlice";

const Home = lazy(() => import("./pages/home/Home"));
const Users = lazy(() => import("./pages/users/Users"));
const User = lazy(() => import("./pages/user/User"));
const Products = lazy(() => import("./pages/products/Products"));
const Product = lazy(() => import("./pages/product/Product"));
const NewProduct = lazy(() => import("./pages/newproduct/NewProduct"));
const Login = lazy(() => import("./pages/login/Login"));
const NewUser = lazy(() => import("./pages/newuser/NewUser"));

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

      <Suspense
        fallback={
          <Backdrop sx={{ color: "#fff", zIndex: 10 }} open>
            <span style={{ marginRight: "20px" }}>Please Wait...</span>
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      >
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
      </Suspense>
    </>
  );
}

export default App;
