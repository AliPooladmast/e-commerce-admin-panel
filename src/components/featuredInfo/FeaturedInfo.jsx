import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
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
      <div className={style.Item}>
        <span className={style.Title}>Sales</span>
        <div className={style.MoneyContainer}>
          <span className={style.Money}>$7.24</span>
          <span className={style.MoneyRate}>
            -11.8
            <ArrowDownward />
          </span>
        </div>
        <span className={style.SubTitle}>Compared to last month</span>
      </div>
      <div className={style.Item}>
        <span className={style.Title}>Costs</span>
        <div className={style.MoneyContainer}>
          <span className={style.Money}>$2.67</span>
          <span className={style.MoneyRate}>
            +9.8
            <ArrowUpward />
          </span>
        </div>
        <span className={style.SubTitle}>Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
