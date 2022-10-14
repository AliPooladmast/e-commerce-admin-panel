import style from "./products.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { productRows } from "../../DummyData";

export default function Products() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className={style.Product}>
            <img src={params.row.img} alt="product" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "price", headerName: "Price", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
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
    <Box className={style.ProductList}>
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
