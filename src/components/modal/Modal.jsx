import ReactDOM from "react-dom";
import style from "./modal.module.scss";

const portalElement = document.getElementById("modal");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={style.Backdrop} onClick={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <div className={style.Modal}>{props.children}</div>,
        portalElement
      )}
    </>
  );
};

export default Modal;
