import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import style from "./user.module.scss";
import noAvatar from "../../assets/icons/no-avatar.svg";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { LinearProgressWithLabel } from "../../components/linearProgress/LinearProgress";
const storage = getStorage(app);

const User = () => {
  const location = useLocation();
  const userId = location.pathname?.split("/")?.[2];
  const user = useSelector((state) =>
    state.user.users?.find((user) => user._id === userId)
  );
  const [draftUser, setDraftUser] = useState(user);
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleInput = (e) => {
    setDraftUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
          default:
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  return (
    <div className={style.UserComponent}>
      <div className={style.TitleContainer}>
        <h1>Edit User</h1>
        <Link to={"/register"}>
          <button>Create</button>
        </Link>
      </div>
      <div className={style.UserContainer}>
        <div className={style.Show}>
          <div className={style.Top}>
            <img src={user.img || noAvatar} alt="user profile" />
            <div className={style.TitleContainer}>
              <span className={style.Name}>
                {user.fullName || user.username}
              </span>
              <span className={style.Title}>{user.title}</span>
            </div>
          </div>
          <div className={style.Bottom}>
            <span className={style.Title}>Account Details</span>
            <div className={style.Info}>
              <PermIdentity className={style.Icon} />
              <span>{user.username}</span>
            </div>
            <div className={style.Info}>
              <CalendarToday className={style.Icon} />
              <span>{user.birthdate || "-- / -- / ----"}</span>
            </div>
            <span className={style.Title}>Contact Details</span>
            <div className={style.Info}>
              <PhoneAndroid className={style.Icon} />
              <span>{user.phoneNumber || "-------"}</span>
            </div>
            <div className={style.Info}>
              <MailOutline className={style.Icon} />
              <span>{user.email}</span>
            </div>
            <div className={style.Info}>
              <LocationSearching className={style.Icon} />
              <span>{user.address || "-----"}</span>
            </div>
          </div>
        </div>

        <div className={style.Update}>
          <span className={style.Title}>Edit</span>
          <form>
            <div className={style.Left}>
              <div className={style.Item}>
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder={user.username}
                  onChange={handleInput}
                />
              </div>
              <div className={style.Item}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.fullName || user.username}
                />
              </div>
              <div className={style.Item}>
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder={user.phoneNumber || "enter phone number"}
                />
              </div>
              <div className={style.Item}>
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder={user.email}
                  onChange={handleInput}
                />
              </div>
              <div className={style.Item}>
                <label>Address</label>
                <input
                  type="text"
                  placeholder={user.address || "enter address"}
                />
              </div>
            </div>
            <div className={style.Right}>
              <div className={style.Upload}>
                <div className={style.ImageContainer}>
                  <img src={image || user.img || noAvatar} alt="edit profile" />
                  {Boolean(progress) && progress !== 100 ? (
                    <LinearProgressWithLabel value={progress} />
                  ) : Boolean(progress) && progress === 100 ? (
                    <div className={style.Uploaded}>File Uploaded</div>
                  ) : null}
                </div>

                <label htmlFor="upload">
                  <Publish />
                </label>
                <input
                  type="file"
                  id="upload"
                  style={{ display: "none" }}
                  onChange={handleImage}
                />
              </div>
              <button>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
