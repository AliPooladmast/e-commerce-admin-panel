import { useState } from "react";
import { useDispatch } from "react-redux";
import AddMarginToPage from "../../hoc/AddMarginToPage";
import { addUser } from "../../redux/apiCalls";
import style from "./newUser.module.scss";
import { setMessage } from "../../redux/uxSlice";
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().min(2).max(50).required(),
  fullname: Joi.string().min(2).max(50),
  phone: Joi.string().min(5).max(20),
  address: Joi.string().min(5).max(511),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(5).max(1024).required(),
  confirmPassword: Joi.ref("password"),
});

const NewUser = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const { error: joiError } = schema.validate(input);
    if (joiError) {
      dispatch(
        setMessage({
          type: "error",
          text: joiError.details?.[0]?.message?.toString(),
        })
      );
    } else {
      const { confirmPassword, ...others } = input;
      addUser(dispatch, others);
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
