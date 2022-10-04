import SideBar from "../../components/siderbar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import style from "./users.module.scss";

const home = () => {
  return (
    <>
      <TopBar />
      <div className={style.MainLayout}>
        <SideBar />
        <div className={style.Body}></div>
      </div>
    </>
  );
};

export default home;