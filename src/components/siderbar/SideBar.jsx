import {
  AssessmentOutlined,
  AttachMoney,
  Category,
  DynamicFeedOutlined,
  LineStyle,
  MailOutline,
  MessageOutlined,
  Person,
  ReportOutlined,
  Timeline,
  TrendingUp,
  WorkOutline,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import style from "./SideBar.module.scss";

const SideBar = () => {
  const location = useLocation();
  const { displaySideMenu } = useSelector((state) => state.style);

  return (
    <div
      className={style.SideBar}
      style={{ width: displaySideMenu ? "50vw" : "0px" }}
    >
      <div className={style.Wrapper}>
        <div className={style.Menu}>
          <h1>Dashboard</h1>
          <ul>
            <Link to="/" className={style.Link}>
              <li className={location.pathname === "/" ? style.Selected : null}>
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
        <div className={style.Menu}>
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
        </div>
      </div>
    </div>
  );
};

export default SideBar;
