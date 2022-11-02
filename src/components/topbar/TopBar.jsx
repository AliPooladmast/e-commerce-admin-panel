import { Language, NotificationsNone, Settings } from "@mui/icons-material";
import React from "react";
import style from "./ToBar.module.scss";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";

const TopBar = () => {
  return (
    <div className={style.TopBar}>
      <div className={style.Wrapper}>
        <div className={style.LogoContainer}>
          <Link to="/" className={style.Link}>
            <span className={style.Logo}>E-Shope Admin</span>
          </Link>
        </div>
        <div className={style.Icons}>
          <div className={style["IconContainer--Disable"]}>
            <NotificationsNone />
            {/* <span className={style.IconBadge}>2</span> */}
          </div>
          <div className={style["IconContainer--Disable"]}>
            <Language />
          </div>
          <div className={style["IconContainer--Disable"]}>
            <Settings />
          </div>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
