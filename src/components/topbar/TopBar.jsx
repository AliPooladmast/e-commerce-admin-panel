import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React from "react";
import style from "./ToBar.module.scss";

const TopBar = () => {
  return (
    <div className={style.TopBar}>
      <div className={style.Wrapper}>
        <div className={style.LogoContainer}>
          <span className={style.Logo}>E-Shope Admin</span>
        </div>
        <div className={style.Icons}>
          <div className={style.IconContainer}>
            <NotificationsNone />
            <span className={style.IconBadge}>2</span>
          </div>
          <div className={style.IconContainer}>
            <Language />
          </div>
          <div className={style.IconContainer}>
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
