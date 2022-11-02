import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import style from "./user.module.scss";
import UserInfo from "../../components/userInfo/UserInfo";
import EditUser from "../../components/editUser/EditUser";

const User = () => {
  const location = useLocation();
  const userId = location.pathname?.split("/")?.[2];
  const user = useSelector((state) =>
    state.user.users?.find((user) => user._id === userId)
  );

  return (
    <div className={style.UserComponent}>
      <div className={style.TitleContainer}>
        <h1>Edit User</h1>
        <Link to={"/newUser"}>
          <button>Create</button>
        </Link>
      </div>
      <div className={style.UserContainer}>
        <div className={style.UserInfo}>
          <UserInfo user={user} />
        </div>
        <div className={style.EditUser}>
          <EditUser user={user} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default User;
