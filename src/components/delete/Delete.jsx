import React from "react";
import style from "./delete.module.scss";

const Delete = ({ username, onClose, onConfirm, allowed = true }) => {
  return (
    <div className={style.Delete}>
      <div className={style.Message}>
        <>
          <span>{"Are you sure that you want to delete "}</span>
          <span className={style.Username}>{username}</span>
          <span>{"?"}</span>
        </>
      </div>
      <div className={style.Confirm}>
        <button onClick={onConfirm} className={style.Yes}>
          Yes
        </button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default Delete;
