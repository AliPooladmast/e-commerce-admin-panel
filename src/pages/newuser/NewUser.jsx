import style from "./newUser.module.scss";

const NewUser = () => {
  return (
    <div className={style.NewUserComponent}>
      <h1>New User</h1>

      <form>
        <div className={style.Item}>
          <label>Username</label>
          <input type="text" placeholder="enter username" />
        </div>

        <div className={style.Item}>
          <label>Full Name</label>
          <input type="text" placeholder="enter full name" />
        </div>

        <div className={style.Item}>
          <label>Email</label>
          <input type="email" placeholder="enter email" />
        </div>

        <div className={style.Item}>
          <label>Password</label>
          <input type="password" placeholder="enter password" />
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
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className={style.Item}>
          <label>Gender</label>
          <div className={style.Gender}>
            <input name="gender" type="radio" id="male" value="male" />
            <label forhtml="male">Male</label>
            <input name="gender" type="radio" id="female" value="female" />
            <label forhtml="female">Female</label>
            <input name="gender" type="radio" id="other" value="other" />
            <label forhtml="other">Other</label>
          </div>
        </div>

        <div className={style.Item}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
