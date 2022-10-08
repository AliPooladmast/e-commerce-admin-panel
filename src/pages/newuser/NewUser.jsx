import NewUserComponent from "../../components/newUserComponent/NewUserComponent";
import SideBar from "../../components/siderbar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import style from "./newUser.module.scss";

const NewUser = () => {
  return (
    <>
      <TopBar />
      <div className={style.MainLayout}>
        <SideBar />
        <div className={style.Body}>
          <NewUserComponent />
        </div>
      </div>
    </>
  );
};

export default NewUser;
