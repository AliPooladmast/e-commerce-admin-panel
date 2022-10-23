import style from "./users.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUsers } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import noAvatar from "../../assets/icons/no-avatar.svg";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const handleDelete = (id) => {};

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 270 },
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
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Box className={style.UserLists}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
    </Box>
  );
}
