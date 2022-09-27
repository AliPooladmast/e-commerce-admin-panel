import { LineStyle, Timeline, TrendingUp } from "@material-ui/icons";
import style from "./SideBar.module.scss";

const SideBar = () => {
  return (
    <div className={style.SideBar}>
      <div className={style.Wrapper}>
        <div className={style.Menu}>
          <h1>Dashboard</h1>
          <ul>
            <li className={style.Active}>
              <LineStyle className={style.Icons} />
              Home
            </li>
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
            <li>
              <LineStyle className={style.Icons} />
              Users
            </li>
            <li>
              <Timeline className={style.Icons} />
              Products
            </li>
            <li>
              <TrendingUp className={style.Icons} />
              Transactions
            </li>
            <li>
              <TrendingUp className={style.Icons} />
              Reports
            </li>
          </ul>
        </div>
        <div className={style.Menu}>
          <h1>Notifications</h1>
          <ul>
            <li>
              <LineStyle className={style.Icons} />
              Mail
            </li>
            <li>
              <Timeline className={style.Icons} />
              Feedback
            </li>
            <li>
              <TrendingUp className={style.Icons} />
              Messages
            </li>
          </ul>
        </div>
        <div className={style.Menu}>
          <h1>Staff</h1>
          <ul>
            <li>
              <LineStyle className={style.Icons} />
              Manage
            </li>
            <li>
              <Timeline className={style.Icons} />
              Analytics
            </li>
            <li>
              <TrendingUp className={style.Icons} />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
