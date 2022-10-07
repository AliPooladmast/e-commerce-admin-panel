import style from "./userComponent.module.scss";

const UserComponent = () => {
  return (
    <div className={style.UserComponent}>
      <div className={style.TitleContainer}>
        <h1>Edit User</h1>
        <button>Create</button>
      </div>
      <div className={style.UserContainer}>
        <div className={style.Show}>Show</div>
        <div className={style.Update}>Update</div>
      </div>
    </div>
  );
};

export default UserComponent;
