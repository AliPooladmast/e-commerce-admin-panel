import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddMarginToPage from "../../hoc/AddMarginToPage";
import { addUser } from "../../redux/apiCalls";
import style from "./newUser.module.scss";

const NewUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const [input, setInput] = useState({});

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (input && input.password === input.confirmPassword) {
      const { confirmPassword, ...others } = input;
      addUser(dispatch, others);
      navigate("/users");
    } else {
      setError("Password and confirm do not match");
    }
  };

  return (
    <div className={style.NewUserComponent}>
      <h1>New User</h1>

      <form>
        <div className={style.Body}>
          <div className={style.Item}>
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="enter username"
              onChange={handleInput}
            />
          </div>

          <div className={style.Item}>
            <label>Full Name</label>
            <input type="text" placeholder="enter full name" />
          </div>

          <div className={style.Item}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="enter password"
              onChange={handleInput}
            />
          </div>

          <div className={style.Item}>
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="enter password"
              onChange={handleInput}
            />
          </div>

          <div className={style.Item}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="enter email"
              onChange={handleInput}
            />
          </div>

          <div className={style.Item}>
            <label>Phone</label>
            <input type="text" placeholder="enter phone number" />
          </div>

          <div className={style.Item}>
            <label>Address</label>
            <input type="text" placeholder="enter address" />
          </div>

          <div className={style.Item}>
            <label>Admin</label>
            <select name="isAdmin" id="admin" onChange={handleInput}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className={style.Item}>
            <label>Gender</label>
            <fieldset className={style.Gender}>
              <input name="gender" type="radio" id="male" value="male" />
              <label forhtml="male">Male</label>
              <input name="gender" type="radio" id="female" value="female" />
              <label forhtml="female">Female</label>
              <input name="gender" type="radio" id="other" value="other" />
              <label forhtml="other">Other</label>
            </fieldset>
          </div>
        </div>

        <button onClick={handleCreate}>Create</button>
      </form>
    </div>
  );
};

export default AddMarginToPage(NewUser);
