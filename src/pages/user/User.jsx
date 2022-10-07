import SideBar from "../../components/siderbar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import UserComponent from "../../components/userComponent/UserComponent";
import style from "./user.module.scss";

const User = () => {
  return (
    <>
      <TopBar />
      <div className={style.MainLayout}>
        <SideBar />
        <div className={style.Body}>
          <UserComponent />
        </div>
      </div>
    </>
  );
};

export default User;
