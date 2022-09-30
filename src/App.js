import React from "react";
import SideBar from "./components/siderbar/SideBar";
import TopBar from "./components/topbar/TopBar";
import style from "./App.module.scss";

function App() {
  return (
    <div>
      <TopBar />
      <div className={style.MainLayout}>
        <SideBar />
      </div>
    </div>
  );
}

export default App;
