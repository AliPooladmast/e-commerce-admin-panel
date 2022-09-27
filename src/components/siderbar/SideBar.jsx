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
      </div>
    </div>
  );
};

export default SideBar;
