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
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import style from "./SideBar.module.scss";

const SideBar = () => {
  return (
    <div className={style.SideBar}>
      <div className={style.Wrapper}>
        <div className={style.Menu}>
          <h1>Dashboard</h1>
          <ul>
            <Link to="/" className={style.Link}>
              <li className={style.Active}>
                <LineStyle className={style.Icons} />
                Home
              </li>
            </Link>
            <li>
              <Timeline className={style.Icons} />
              Analytics
            </li>
            <li>
              <TrendingUp className={style.Icons} />
              Sales
            </li>
          </ul>
        </div>
        <div className={style.Menu}>
          <h1>Quick Menu</h1>
          <ul>
            <Link to="/users" className={style.Link}>
              <li>
                <Person className={style.Icons} />
                Users
              </li>
            </Link>
            <Link to="/products" className={style.Link}>
              <li>
                <Category className={style.Icons} />
                Products
              </li>
            </Link>
            <li>
              <AttachMoney className={style.Icons} />
              Transactions
            </li>
            <li>
              <AssessmentOutlined className={style.Icons} />
              Reports
            </li>
          </ul>
        </div>
        <div className={style.Menu}>
          <h1>Notifications</h1>
          <ul>
            <li>
              <MailOutline className={style.Icons} />
              Mail
            </li>
            <li>
              <DynamicFeedOutlined className={style.Icons} />
              Feedback
            </li>
            <li>
              <MessageOutlined className={style.Icons} />
              Messages
            </li>
          </ul>
        </div>
        <div className={style.Menu}>
          <h1>Staff</h1>
          <ul>
            <li>
              <WorkOutline className={style.Icons} />
              Manage
            </li>
            <li>
              <Timeline className={style.Icons} />
              Analytics
            </li>
            <li>
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
