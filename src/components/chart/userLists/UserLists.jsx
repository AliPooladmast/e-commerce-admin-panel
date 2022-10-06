import * as React from "react";
import style from "./userLists.module.scss";
import { DataGrid } from "@mui/x-data-grid";

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
];

export default function UserLists() {
  return (
    <div className={style.UserLists}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
