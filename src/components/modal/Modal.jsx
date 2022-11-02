import { Close } from "@mui/icons-material";
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
        <div className={style.Modal}>
          <div className={style.Header}>
            <h1>{props.title}</h1>
            <div className={style.IconContainer} onClick={props.onClose}>
              <Close className={style.CloseIcon} />
            </div>
          </div>
          {props.children}
        </div>,
        portalElement
      )}
    </>
  );
};

export default Modal;
