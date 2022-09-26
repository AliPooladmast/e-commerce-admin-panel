import { NotificationsNone } from "@material-ui/icons";
import React from "react";
import style from "./ToBar.module.scss";

const TopBar = () => {
  return (
    <div className={style.TopBar}>
      <div className={style.Wrapper}>
        <div className={style.LogoContainer}>
          <span className={style.Logo}>E-Shope Admin</span>
        </div>
        <div className={style.TopBarIconContainer}>
          <NotificationsNone />
          <span className={style.IconBadge}>2</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
