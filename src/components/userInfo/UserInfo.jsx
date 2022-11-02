import React from "react";
import style from "./userInfo.module.scss";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import noAvatar from "../../assets/icons/no-avatar.svg";

const UserInfo = ({ user }) => {
  return (
    <>
      <div className={style.Top}>
        <img src={user.img || noAvatar} alt="user profile" />
        <div className={style.TitleContainer}>
          <span className={style.Name}>{user.fullName || user.username}</span>
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
    </>
  );
};

export default UserInfo;
