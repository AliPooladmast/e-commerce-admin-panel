import style from "./userComponent.module.scss";

const UserComponent = () => {
  return (
    <div className={style.UserComponent}>
      <div className={style.TitleContainer}>
        <h1>Edit User</h1>
        <button>Create</button>
      </div>
    </div>
  );
};

export default UserComponent;
