import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import SideBar from "../../components/siderbar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import style from "./home.module.scss";

const home = () => {
  return (
    <>
      <TopBar />
      <div className={style.MainLayout}>
        <SideBar />
        <FeaturedInfo />
      </div>
    </>
  );
};

export default home;
