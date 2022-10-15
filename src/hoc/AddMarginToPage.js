import React from "react";
import TopBar from "../components/topbar/TopBar";
import SideBar from "../components/siderbar/SideBar";
import style from "./add-margin-to-page.module.scss";

const AddMarginToPage = (Component) => (props) => {
  return (
    <>
      <TopBar />
      <div className={style.MainLayout}>
        <SideBar />
        <div className={style.Body}>
          <Component {...props} />
        </div>
      </div>
    </>
  );
};

export default AddMarginToPage;
