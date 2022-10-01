import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import SideBar from "../../components/siderbar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import style from "./home.module.scss";
import { userData } from "../../DummyData";

const home = () => {
  return (
    <>
      <TopBar />
      <div className={style.MainLayout}>
        <SideBar />
        <div className={style.Body}>
          <FeaturedInfo />
          <Chart
            title="User Analytics"
            data={userData}
            dataKey="active user"
            grid
          />
        </div>
      </div>
    </>
  );
};

export default home;
