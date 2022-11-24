import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import style from "./login.module.scss";
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(5).max(1024).required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentUser,
    error: serverError,
    isFetching,
  } = useSelector((state) => state.user);
  const [input, setInput] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { error: joiError } = schema.validate(input);
    if (joiError) {
      setErrorMessage(joiError.details?.[0]?.message);
      setShowSnackbar(true);
    } else {
      login(dispatch, input);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  useEffect(() => {
    if (serverError) {
      setErrorMessage(serverError);
      setShowSnackbar(true);
    } else if (currentUser?.isAdmin) {
      navigate("/");
    }
  }, [currentUser, serverError]); //eslint-disable-line

  return (
    <div className={style.Container}>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <div className={style.Wrapper}>
        <h1>SIGN IN</h1>
        <form action="">
          <div className={style.InputContainer}>
            <input
              name="username"
              type="text"
              placeholder="username"
              onChange={handleInput}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleInput}
            />
          </div>
          <div className={style.LoginButton}>
            <button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </button>
          </div>
        </form>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Login;
