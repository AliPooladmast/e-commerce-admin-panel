import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import style from "./home.module.scss";
import { userData } from "../../DummyData";
import WidgetLarge from "../../components/widgetLarge/WidgetLarge";
import WidgetSmall from "../../components/widgetSmall/WidgetSmall";

const Home = () => {
  return (
    <>
      <FeaturedInfo />
      <Chart
        title="User Analytics"
        data={userData}
        dataKey="active user"
        grid
      />
      <div className={style.Widgets}>
        <WidgetSmall />
        <WidgetLarge />
      </div>
    </>
  );
};

export default Home;
