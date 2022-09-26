import React from "react";
import style from "./ToBar.module.scss";

const TopBar = () => {
  return (
    <div className={style.TopBar}>
      <div className={style.Wrapper}>
        <div className={style.TopLeft}>
          <span className={style.Logo}>E-Shope Admin</span>
        </div>
        <div className={style.TopRight}>Right</div>
      </div>
    </div>
  );
};

export default TopBar;
