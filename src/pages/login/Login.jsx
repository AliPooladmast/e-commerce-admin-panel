import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import style from "./login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const { error, isFetching } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <h1>SIGN IN</h1>
        <form action="">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </button>
          {error && <div className={style.Error}>Somthing went wrong...</div>}
          <a href="/register">Forgot your password?</a>
          <a href="/register">Create an account</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
