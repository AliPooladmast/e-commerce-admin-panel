import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import style from "./userComponent.module.scss";

const UserComponent = () => {
  return (
    <div className={style.UserComponent}>
      <div className={style.TitleContainer}>
        <h1>Edit User</h1>
        <button>Create</button>
      </div>
      <div className={style.UserContainer}>
        <div className={style.Show}>
          <div className={style.Top}>
            <img
              src="https://t4.ftcdn.net/jpg/01/87/14/51/360_F_187145146_SB34n4kdiNqlVSvaTy4YUJcUWjNO540N.jpg"
              alt="user profile"
            />
            <div className={style.TitleContainer}>
              <span className={style.Name}>Emily Dimmer</span>
              <span className={style.Title}>IT Specialist</span>
            </div>
          </div>
          <div className={style.Bottom}>
            <span className={style.Title}>Account Details</span>
            <div className={style.Info}>
              <PermIdentity className={style.Icon} />
              <span>emily_dimmer5424</span>
            </div>
            <div className={style.Info}>
              <CalendarToday className={style.Icon} />
              <span>14.06.1995</span>
            </div>
            <span className={style.Title}>Contact Details</span>
            <div className={style.Info}>
              <PhoneAndroid className={style.Icon} />
              <span>+25 253 254 24</span>
            </div>
            <div className={style.Info}>
              <MailOutline className={style.Icon} />
              <span>emily.dimmer@gmail.com</span>
            </div>
            <div className={style.Info}>
              <LocationSearching className={style.Icon} />
              <span>Berlin | Germany</span>
            </div>
          </div>
        </div>

        <div className={style.Update}>
          <span className={style.Title}>Edit</span>
          <form action="">
            <div className={style.Left}>
              <div className={style.Item}>
                <label>Username</label>
                <input type="text" placeholder="emily_dimmer5424" />
              </div>
              <div className={style.Item}>
                <label>Full Name</label>
                <input type="text" placeholder="Emily Dimmer" />
              </div>
              <div className={style.Item}>
                <label>Phone Number</label>
                <input type="text" placeholder="+25 253 254 24" />
              </div>
              <div className={style.Item}>
                <label>Email</label>
                <input type="text" placeholder="emily.dimmer@gmail.com" />
              </div>
              <div className={style.Item}>
                <label>Address</label>
                <input type="text" placeholder="Berlin | Germany" />
              </div>
            </div>
            <div className={style.Right}>
              <div className={style.Upload}>
                <img
                  src="https://t4.ftcdn.net/jpg/01/87/14/51/360_F_187145146_SB34n4kdiNqlVSvaTy4YUJcUWjNO540N.jpg"
                  alt="edit profile"
                />
                <label htmlFor="upload">
                  <Publish />
                </label>
                <input type="file" id="upload" style={{ display: "none" }} />
              </div>
              <button>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
