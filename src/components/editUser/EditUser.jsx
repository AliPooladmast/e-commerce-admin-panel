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
import { setMessage } from "../../redux/uxSlice";
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().min(2).max(50),
  fullname: Joi.string().min(0).max(50),
  phone: Joi.string().min(0).max(20),
  address: Joi.string().min(0).max(511),
  email: Joi.string()
    .min(5)
    .max(255)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
});

const storage = getStorage(app);

const EditUser = ({ user }) => {
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
    const {
      username,
      email,
      fullname,
      phone,
      address,
      _id: userId,
    } = draftUser;

    const { error: joiError } = schema.validate({
      username,
      email,
      fullname,
      phone,
      address,
    });

    if (joiError) {
      dispatch(
        setMessage({
          type: "error",
          text: joiError.details?.[0]?.message?.toString(),
        })
      );
    } else {
      const editedUser = {
        username,
        email,
        fullname,
        phone,
        address,
        img: image,
      };

      editUser(dispatch, userId, editedUser);
    }
  };

  return (
    <div className={style.EditUser}>
      <span className={style.Title}>Edit</span>
      <form className={style.Form}>
        <div className={style.Left}>
          <div className={style.Item}>
            <label>Username</label>
            <input
              name="username"
              type="text"
              value={draftUser?.username}
              onChange={handleInput}
              placeholder="username"
            />
          </div>
          <div className={style.Item}>
            <label>Full Name</label>
            <input
              type="text"
              value={draftUser?.fullname}
              name="fullname"
              onChange={handleInput}
              placeholder="fullname"
            />
          </div>
          <div className={style.Item}>
            <label>Phone Number</label>
            <input
              type="tel"
              value={draftUser?.phone}
              name="phone"
              onChange={handleInput}
              placeholder="phone"
            />
          </div>
          <div className={style.Item}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={draftUser?.email}
              onChange={handleInput}
              placeholder="email"
            />
          </div>
          <div className={style.Item}>
            <label>Address</label>
            <input
              type="text"
              value={draftUser?.address}
              name="address"
              onChange={handleInput}
              placeholder="address"
            />
          </div>
        </div>
        <div className={style.Right}>
          <div className={style.Upload}>
            <div className={style.ImageContainer}>
              <img
                src={image || draftUser.img || noAvatar}
                alt="edit profile"
              />
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
    </div>
  );
};

export default EditUser;
