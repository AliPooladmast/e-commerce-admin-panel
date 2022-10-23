import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import style from "./user.module.scss";
import noAvatar from "../../assets/icons/no-avatar.svg";
import { useState } from "react";

const User = () => {
  const location = useLocation();
  const userId = location.pathname?.split("/")?.[2];
  const user = useSelector((state) =>
    state.user.users?.find((user) => user._id === userId)
  );
  const [draftUser, setDraftUser] = useState(user);

  const handleInput = (e) => {
    setDraftUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={style.UserComponent}>
      <div className={style.TitleContainer}>
        <h1>Edit User</h1>
        <Link to={"/register"}>
          <button>Create</button>
        </Link>
      </div>
      <div className={style.UserContainer}>
        <div className={style.Show}>
          <div className={style.Top}>
            <img src={user.img || noAvatar} alt="user profile" />
            <div className={style.TitleContainer}>
              <span className={style.Name}>
                {user.fullName || user.username}
              </span>
              <span className={style.Title}>{user.title}</span>
            </div>
          </div>
          <div className={style.Bottom}>
            <span className={style.Title}>Account Details</span>
            <div className={style.Info}>
              <PermIdentity className={style.Icon} />
              <span>{user.username}</span>
            </div>
            <div className={style.Info}>
              <CalendarToday className={style.Icon} />
              <span>{user.birthdate || "-- / -- / ----"}</span>
            </div>
            <span className={style.Title}>Contact Details</span>
            <div className={style.Info}>
              <PhoneAndroid className={style.Icon} />
              <span>{user.phoneNumber || "-------"}</span>
            </div>
            <div className={style.Info}>
              <MailOutline className={style.Icon} />
              <span>{user.email}</span>
            </div>
            <div className={style.Info}>
              <LocationSearching className={style.Icon} />
              <span>{user.address || "-----"}</span>
            </div>
          </div>
        </div>

        <div className={style.Update}>
          <span className={style.Title}>Edit</span>
          <form action="">
            <div className={style.Left}>
              <div className={style.Item}>
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder={user.username}
                  onChange={handleInput}
                />
              </div>
              <div className={style.Item}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.fullName || user.username}
                />
              </div>
              <div className={style.Item}>
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder={user.phoneNumber || "enter phone number"}
                />
              </div>
              <div className={style.Item}>
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder={user.email}
                  onChange={handleInput}
                />
              </div>
              <div className={style.Item}>
                <label>Address</label>
                <input
                  type="text"
                  placeholder={user.address || "enter address"}
                />
              </div>
            </div>
            <div className={style.Right}>
              <div className={style.Upload}>
                <img src={user.img || noAvatar} alt="edit profile" />
                <label htmlFor="upload">
                  <Publish />
                </label>
                <input type="file" id="upload" style={{ display: "none" }} />
              </div>
              <button>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
