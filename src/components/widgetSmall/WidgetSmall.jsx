import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import style from "./widgetSmall.module.scss";
import noAvatar from "../../assets/icons/no-avatar.svg";
import Modal from "../../components/modal/Modal";
import UserInfo from "../userInfo/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/apiCalls";

const WidgetSmall = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDisplay = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className={style.WidgetSmall}>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserInfo user={selectedUser} />
        </Modal>
      )}
      <div className={style.Wrapper}>
        <div className={style.Title}>New Join Members</div>
        <ul className={style.List}>
          {users?.map((user) => (
            <li className={style.ListItem} key={user._id}>
              <img src={user.img || noAvatar} alt="profile" />
              <div className={style.User}>
                <span className={style.UserName}>{user.username}</span>
                <span className={style.UserTitle}>{user.title || ""}</span>
              </div>
              <button onClick={() => handleDisplay(user)}>
                <Visibility className={style.Icon} /> Display
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WidgetSmall;
