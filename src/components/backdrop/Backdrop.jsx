import ReactDOM from "react-dom";
import style from "./backdrop.module.scss";

const portalElement = document.getElementById("modal");

const Backdrop = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={style.Backdrop} onClick={props.onClose} />,
        portalElement
      )}
    </>
  );
};

export default Backdrop;
