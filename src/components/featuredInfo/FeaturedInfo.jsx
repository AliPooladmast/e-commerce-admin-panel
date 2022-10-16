import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import style from "./featuredInfo.module.scss";

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [monthChange, setMonthChange] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const { data } = await userRequest.get("/orders/income");
        data.sort((a, b) => a._id - b._id);
        setIncome(data);
        setMonthChange(
          (data[data.length - 1].total / data[data.length - 2].total) * 100 -
            100
        );
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, []);

  return (
    <div className={style.FeaturedInfo}>
      <div className={style.Item}>
        <span className={style.Title}>Revenue</span>
        <div className={style.MoneyContainer}>
          <span className={style.Money}>
            ${income[income.length - 1]?.total}
          </span>
          <span className={style.MoneyRate}>
            % {Math.floor(monthChange)}
            {monthChange > 0 ? (
              <ArrowUpward className={style.Icon} />
            ) : (
              <ArrowDownward className={style["Icon--Negetive"]} />
            )}
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
            <ArrowDownward className={style["Icon--Negetive"]} />
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
            <ArrowUpward className={style.Icon} />
          </span>
        </div>
        <span className={style.SubTitle}>Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
