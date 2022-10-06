import * as React from "react";
import style from "./userLists.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@material-ui/icons";
import { Box } from "@material-ui/core";

const rows = [
  {
    id: 1,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 2,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 3,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 4,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 5,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 6,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 7,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 8,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 9,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 10,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 11,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
  {
    id: 12,
    username: "Mathew Perry",
    avatar:
      "https://www.stuttgarter-nachrichten.de/media.media.0341ffdd-892c-4752-99b3-7ef350d6780f.original1024.jpg",
    email: "mathew.perry@gmail.com",
    status: "active",
    transaction: "$320.00",
  },
];

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
        rows={rows}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
