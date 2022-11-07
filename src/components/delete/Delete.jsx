import React from "react";
import style from "./delete.module.scss";

const Delete = ({ name, onClose, onConfirm, allowed = true }) => {
  return (
    <div className={style.Delete}>
      <div className={style.Message}>
        {allowed ? (
          <>
            <span>{"Are you sure that you want to delete "}</span>
            <span className={style.Username}>{name}</span>
            <span>{"?"}</span>
          </>
        ) : (
          <>
            <span>{"Sorry, admin users like "}</span>
            <span className={style.Username}>{name}</span>
            <span>{" could not be deleted."}</span>
          </>
        )}
      </div>
      <div className={style.Confirm}>
        {allowed ? (
          <>
            <button onClick={onConfirm} className={style.Yes}>
              Yes
            </button>
            <button onClick={onClose}>No</button>
          </>
        ) : (
          <button onClick={onClose} className={style.Yes}>
            OK
          </button>
        )}
      </div>
    </div>
  );
};

export default Delete;
