import {
  Language,
  Menu,
  NotificationsNone,
  Settings,
} from "@mui/icons-material";
import React from "react";
import style from "./ToBar.module.scss";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { sideMenuToggle } from "../../redux/uxSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const { displaySideMenu } = useSelector((state) => state.ux);

  return (
    <div className={style.TopBar}>
      <div className={style.Wrapper}>
        <div className={style.LogoContainer}>
          <Menu
            className={style.Menu}
            style={{
              transform: displaySideMenu ? "rotate(90deg)" : "",
              transition: "transform 0.3s",
            }}
            onClick={() => dispatch(sideMenuToggle())}
          />
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
