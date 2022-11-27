import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../redux/uxSlice";
import { userRequest } from "../../requestMethods";
import FeatureCard from "../featureCard/FeatureCard";
import style from "./featuredInfo.module.scss";

const FeaturedInfo = () => {
  const dispatch = useDispatch();
  const [income, setIncome] = useState([]);
  const [incomeLoading, setIncomeLoading] = useState(false);
  const [monthChange, setMonthChange] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        setIncomeLoading(true);
        const res = await userRequest.get("/orders/income");
        if (res) {
          const data = res.data?.sort((a, b) => a._id - b._id);
          setIncome(data);
          data.length > 1 &&
            setMonthChange(
              (data[data.length - 1]?.total / data[data.length - 2]?.total) *
                100 -
                100
            );
          setIncomeLoading(false);
        }
      } catch (err) {
        dispatch(
          setMessage({ type: "error", text: err?.response?.data?.toString() })
        );
      }
    };
    getIncome();
  }, []); //eslint-disable-line

  return (
    <div className={style.FeaturedInfo}>
      <FeatureCard
        loading={incomeLoading}
        title="Revenue"
        amount={income[income.length - 1]?.total}
        percentage={Math.floor(monthChange)}
      />
      <FeatureCard
        title="Sales"
        amount="724"
        percentage=" -11.8"
        loading={incomeLoading}
      />
      <FeatureCard
        title="Costs"
        amount="267"
        percentage=" +9.8"
        loading={incomeLoading}
      />
    </div>
  );
};

export default FeaturedInfo;
