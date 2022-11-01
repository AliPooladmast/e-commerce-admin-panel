import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import style from "./widgetSmall.module.scss";
import noAvatar from "../../assets/icons/no-avatar.svg";

const WidgetSmall = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?=new");
        setUsers(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  return (
    <div className={style.WidgetSmall}>
      <div className={style.Wrapper}>
        <div className={style.Title}>New Join Members</div>
        <ul className={style.List}>
          {users?.map((user) => (
            <li className={style.ListItem} key={user._id}>
              <img src={user.img || noAvatar} alt="profile" />
              <div className={style.User}>
                <span className={style.UserName}>{user.username}</span>
                <span className={style.UserTitle}>{user.title || ""}</span>
              </div>
              <button>
                <Visibility className={style.Icon} /> Display
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WidgetSmall;
