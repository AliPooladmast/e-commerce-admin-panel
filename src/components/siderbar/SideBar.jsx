import { LineStyle, Timeline, TrendingUp } from "@material-ui/icons";
import style from "./SideBar.module.scss";

const SideBar = () => {
  return (
    <div className={style.SideBar}>
      <div className={style.Wrapper}>
        <div className={style.Menu}>
          <h1>Dashboard</h1>
          <ul>
            <li>
              <LineStyle />
              Home
            </li>
            <li>
              <Timeline />
              Analytics
            </li>
            <li>
              <TrendingUp />
              Sales
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
