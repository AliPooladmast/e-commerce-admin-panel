import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import style from "./home.module.scss";
import WidgetLarge from "../../components/widgetLarge/WidgetLarge";
import WidgetSmall from "../../components/widgetSmall/WidgetSmall";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

const Home = () => {
  const [stats, setStats] = useState([]);

  const MONTH = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        const data = res.data?.sort((a, b) => a._id - b._id);
        setStats([]);
        data.forEach((item) => {
          setStats((prev) => [
            ...prev,
            { name: MONTH[item._id - 1], "active user": item.total },
          ]);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTH]);

  return (
    <>
      <FeaturedInfo />
      <Chart title="User Analytics" data={stats} dataKey="active user" grid />
      <div className={style.Widgets}>
        <WidgetSmall />
        <WidgetLarge />
      </div>
    </>
  );
};

export default Home;
