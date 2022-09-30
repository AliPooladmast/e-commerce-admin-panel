import { ArrowDownward } from "@material-ui/icons";
import style from "./featuredInfo.module.scss";

const FeaturedInfo = () => {
  return (
    <div className={style.FeaturedInfo}>
      <div className={style.Item}>
        <span className={style.Title}>Revenue</span>
        <div className={style.MoneyContainer}>
          <span className={style.Money}>$5.14</span>
          <span className={style.MoneyRate}>
            -13.2
            <ArrowDownward />
          </span>
        </div>
        <span className={style.SubTitle}>Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
