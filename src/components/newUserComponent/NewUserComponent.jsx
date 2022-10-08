import style from "./newUserComponent.module.scss";

const NewUserComponent = () => {
  return (
    <div className={style.NewUserComponent}>
      <h1>New User</h1>

      <form>
        <div className={style.Item}>
          <label>Username</label>
          <input type="text" placeholder="mike" />
        </div>

        <div className={style.Item}>
          <label>Full Name</label>
          <input type="text" placeholder="Mike Dormant" />
        </div>

        <div className={style.Item}>
          <label>Email</label>
          <input type="email" placeholder="mike.dormant@gmail.com" />
        </div>

        <div className={style.Item}>
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>

        <div className={style.Item}>
          <label>Phone</label>
          <input type="text" placeholder="+15 254 356 98" />
        </div>

        <div className={style.Item}>
          <label>Address</label>
          <input type="text" placeholder="Calgary | Canada" />
        </div>

        <div className={style.Item}>
          <label>Gender</label>
          <div className={style.Gender}>
            <label forhtml="male">Male</label>
            <input type="radio" id="male" value="male" />
            <label forhtml="female">Female</label>
            <input type="radio" id="female" value="female" />
            <label forhtml="other">Other</label>
            <input type="radio" id="other" value="other" />
          </div>
        </div>

        <div className={style.Item}>
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className={style.Item}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewUserComponent;
