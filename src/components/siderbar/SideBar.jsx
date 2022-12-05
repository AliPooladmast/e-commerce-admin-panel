import {
  AssessmentOutlined,
  AttachMoney,
  Category,
  LineStyle,
  Person,
  Timeline,
  TrendingUp,
  // DynamicFeedOutlined,
  // MailOutline,
  // MessageOutlined,
  // ReportOutlined,
  // WorkOutline,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { sideMenuToggle } from "../../redux/uxSlice";
import Backdrop from "../backdrop/Backdrop";
import style from "./SideBar.module.scss";

const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { displaySideMenu } = useSelector((state) => state.ux);

  useEffect(() => {
    if (displaySideMenu) {
      dispatch(sideMenuToggle());
    }
  }, [location]); // eslint-disable-line

  return (
    <>
      {displaySideMenu && (
        <Backdrop onClose={() => dispatch(sideMenuToggle())} />
      )}
      <div className={displaySideMenu ? style["SideBar--Open"] : style.SideBar}>
        <div className={style.Wrapper}>
          <div className={style.Menu}>
            <h1>Dashboard</h1>
            <ul>
              <Link to="/" className={style.Link}>
                <li
                  className={location.pathname === "/" ? style.Selected : null}
                >
                  <LineStyle className={style.Icons} />
                  Home
                </li>
              </Link>
              <li className={style.Disable}>
                <Timeline className={style.Icons} />
                Analytics
              </li>
              <li className={style.Disable}>
                <TrendingUp className={style.Icons} />
                Sales
              </li>
            </ul>
          </div>
          <div className={style.Menu}>
            <h1>Quick Menu</h1>
            <ul>
              <Link to="/users" className={style.Link}>
                <li
                  className={
                    location.pathname === "/users" ? style.Selected : null
                  }
                >
                  <Person className={style.Icons} />
                  Users
                </li>
              </Link>
              <Link to="/products" className={style.Link}>
                <li
                  className={
                    location.pathname === "/products" ? style.Selected : null
                  }
                >
                  <Category className={style.Icons} />
                  Products
                </li>
              </Link>
              <li className={style.Disable}>
                <AttachMoney className={style.Icons} />
                Transactions
              </li>
              <li className={style.Disable}>
                <AssessmentOutlined className={style.Icons} />
                Reports
              </li>
            </ul>
          </div>
          {/* <div className={style.Menu}>
            <h1>Notifications</h1>
            <ul>
              <li className={style.Disable}>
                <MailOutline className={style.Icons} />
                Mail
              </li>
              <li className={style.Disable}>
                <DynamicFeedOutlined className={style.Icons} />
                Feedback
              </li>
              <li className={style.Disable}>
                <MessageOutlined className={style.Icons} />
                Messages
              </li>
            </ul>
          </div>
          <div className={style.Menu}>
            <h1>Staff</h1>
            <ul>
              <li className={style.Disable}>
                <WorkOutline className={style.Icons} />
                Manage
              </li>
              <li className={style.Disable}>
                <Timeline className={style.Icons} />
                Analytics
              </li>
              <li className={style.Disable}>
                <ReportOutlined className={style.Icons} />
                Reports
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SideBar;
