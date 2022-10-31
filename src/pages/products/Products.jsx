import style from "./products.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className={style.Product}>
            <img src={params.row.img} alt="product" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className={style.Edit}>Edit</button>
            </Link>
            <DeleteOutlined
              className={style.Delete}
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className={style.ProductList}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
    </div>
  );
}
