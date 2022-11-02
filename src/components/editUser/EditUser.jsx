import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { LinearProgressWithLabel } from "../linearProgress/LinearProgress";
import noAvatar from "../../assets/icons/no-avatar.svg";
import { Publish } from "@mui/icons-material";
import style from "./editUser.module.scss";

const storage = getStorage(app);

const EditUser = ({ user, userId }) => {
  const dispatch = useDispatch();
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

  const handleEdit = (e) => {
    e.preventDefault();
    const editedUser = { ...draftUser, img: image };
    editUser(dispatch, userId, editedUser);
  };

  return (
    <>
      <span className={style.Title}>Edit</span>
      <form className={style.Form}>
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
            <input type="text" placeholder={user.fullName || user.username} />
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
            <input type="text" placeholder={user.address || "enter address"} />
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
          <button onClick={handleEdit}>Update</button>
        </div>
      </form>
    </>
  );
};

export default EditUser;
