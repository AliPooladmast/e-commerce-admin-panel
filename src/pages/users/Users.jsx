import style from "./users.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userRows } from "../../DummyData";

export default function Users() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.User}>
            <img src={params.row.avatar} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "transaction", headerName: "Transaction Volume", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
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
        rows={data}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
