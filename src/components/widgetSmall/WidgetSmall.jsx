import { Visibility } from "@material-ui/icons";
import style from "./widgetSmall.module.scss";

const WidgetSmall = () => {
  return (
    <div className={style.WidgetSmall}>
      <span className={style.Title}>New Join Members</span>
      <ul className={style.List}>
        <li className={style.ListItem}>
          <img
            src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
            alt="profile"
          />
          <div className={style.Us}>
            <span className={style.UserName}>Mike Ford</span>
            <span className={style.UserTitle}>Web Developer</span>
          </div>
          <button>
            <Visibility /> Display
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WidgetSmall;
