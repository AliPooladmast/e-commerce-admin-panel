import style from "./userComponent.module.scss";

const UserComponent = () => {
  return (
    <div className={style.UserComponent}>
      <div className={style.TitleContainer}>
        <h1>Edit User</h1>
        <button>Create</button>
      </div>
      <div className={style.UserContainer}>
        <div className={style.Show}>
          <div className={style.Top}>
            <img
              src="https://t4.ftcdn.net/jpg/01/87/14/51/360_F_187145146_SB34n4kdiNqlVSvaTy4YUJcUWjNO540N.jpg"
              alt="user profile"
            />
            <div className={style.TitleContainer}>
              <span className={style.Name}>Emily Dimmer</span>
              <span className={style.Title}>IT Specialist</span>
            </div>
          </div>
        </div>
        <div className={style.Update}>Update</div>
      </div>
    </div>
  );
};

export default UserComponent;
