import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import FeatureCard from "../featureCard/FeatureCard";
import style from "./featuredInfo.module.scss";

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [monthChange, setMonthChange] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        const data = res.data?.sort((a, b) => a._id - b._id);

        setIncome(data);
        data.length > 1 &&
          setMonthChange(
            (data[data.length - 1]?.total / data[data.length - 2]?.total) *
              100 -
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
      <FeatureCard
        loading={!income?.length > 0}
        title="Revenue"
        amount={income[income.length - 1]?.total}
        percentage={Math.floor(monthChange)}
      />
      <FeatureCard
        title="Sales"
        amount="724"
        percentage=" -11.8"
        loading={!income?.length > 0}
      />
      <FeatureCard
        title="Costs"
        amount="267"
        percentage=" +9.8"
        loading={!income?.length > 0}
      />
    </div>
  );
};

export default FeaturedInfo;
