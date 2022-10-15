import style from "./register.module.scss";

const Register = () => {
  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <h1>CREATE AN ACCOUNT</h1>
        <form action="">
          <input type="text" placeholder="name" />
          <input type="text" placeholder="last name" />
          <input type="text" placeholder="username" />
          <input type="text" placeholder="email" />
          <input type="text" placeholder="password" />
          <input type="text" placeholder="confirm password" />
          <span>
            By creating an account, I consent to the precessing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button>CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
