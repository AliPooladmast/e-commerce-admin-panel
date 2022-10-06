import * as React from "react";
import style from "./userLists.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { userRows } from "../../../DummyData";

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
          <button className={style.Edit}>Edit</button>
          <DeleteOutlined className={style.Delete} />
        </>
      );
    },
  },
];

export default function UserLists() {
  return (
    <Box className={style.UserLists}>
      <DataGrid
        rows={userRows}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
