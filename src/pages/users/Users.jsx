import style from "./users.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import noAvatar from "../../assets/icons/no-avatar.svg";
import Modal from "../../components/modal/Modal";
import Delete from "../../components/delete/Delete";
import LoadingSkeleton from "../../components/loadingSkeleton/LoadingSkeleton";
import AddMarginToPage from "../../hoc/AddMarginToPage";

const Users = () => {
  const dispatch = useDispatch();
  const { users, isFetching } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteDialog = (id) => {
    setSelectedUser(users?.find((user) => user._id === id));
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(dispatch, selectedUser?._id);
    setShowModal(false);
  };

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const columns = [
    {
      field: "user",
      headerName: "User",
      width: 220,
      renderCell: (params) => {
        return (
          <div className={style.User}>
            <img src={params.row.img || noAvatar} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 270 },
    {
      field: "date",
      headerName: "Register Date",
      width: 270,
      renderCell: (params) => {
        const date = params.row.createdAt.split("T")?.[0];
        const time = params.row.createdAt.split("T")?.[1];
        const cleanTime = time.split(".")?.[0];
        return (
          <>
            <span style={{ marginRight: "20px" }}>{date}</span>
            <span>{cleanTime}</span>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return <span>{params.row.isAdmin ? "admin" : "user"}</span>;
      },
    },
    // { field: "transaction", headerName: "Transaction Volume", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className={style.Edit}>Edit</button>
            </Link>
            <DeleteOutlined
              className={style.Delete}
              onClick={() => handleDeleteDialog(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className={style.UserLists}>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title="Delete User"
          height="220px"
        >
          <Delete
            name={selectedUser?.username}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmDelete}
            allowed={!selectedUser?.isAdmin}
          />
        </Modal>
      )}

      <div className={style.Title}>
        <h1>Users List</h1>
        <Link to={"/newUser"}>
          <button>Create Account</button>
        </Link>
      </div>

      <DataGrid
        rows={isFetching ? [] : users}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
        components={{
          LoadingOverlay: LoadingSkeleton,
        }}
        loading={isFetching}
      />
    </div>
  );
};

export default AddMarginToPage(Users);
