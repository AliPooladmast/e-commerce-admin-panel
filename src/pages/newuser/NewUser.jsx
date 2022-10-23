import { useState } from "react";
import style from "./newUser.module.scss";

const NewUser = () => {
  const [input, setInput] = useState();

  console.log(input);

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={style.NewUserComponent}>
      <h1>New User</h1>

      <form>
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
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="enter email"
            onChange={handleInput}
          />
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
          <label>Phone</label>
          <input type="text" placeholder="enter phone number" />
        </div>

        <div className={style.Item}>
          <label>Address</label>
          <input type="text" placeholder="enter address" />
        </div>

        <div className={style.Item}>
          <label>Admin</label>
          <select name="admin" id="admin" onChange={handleInput}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
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

        <div className={style.Item}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
