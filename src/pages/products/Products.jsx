import style from "./products.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/modal/Modal";
import Delete from "../../components/delete/Delete";
import LoadingSkeleton from "../../components/loadingSkeleton/LoadingSkeleton";
import AddMarginToPage from "../../hoc/AddMarginToPage";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isFetching } = useSelector((state) => state.product);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDeleteDialog = (id) => {
    setSelectedProduct(products?.find((product) => product._id === id));
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    deleteProduct(dispatch, selectedProduct?._id);
  };

  const columns = [
    {
      field: "product",
      headerName: "Product",
      minWidth: 160,
      flex: 2,
      renderCell: (params) => {
        return (
          <div className={style.Product}>
            <img src={params.row.img} alt="product" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", minWidth: 60, flex: 1 },
    { field: "price", headerName: "Price", minWidth: 60, flex: 1 },
    {
      field: "date",
      headerName: "Register Date",
      minWidth: 160,
      flex: 2,
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
      field: "action",
      headerName: "Action",
      minWidth: 90,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
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
    <div className={style.ProductList}>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title="Delete Product"
          height="220px"
        >
          <Delete
            name={selectedProduct?.title}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmDelete}
          />
        </Modal>
      )}

      <div className={style.Title}>
        <h1>Products List</h1>
        <Link to={"/newProduct"}>
          <button>Add Product</button>
        </Link>
      </div>

      <DataGrid
        rows={isFetching ? [] : products}
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

export default AddMarginToPage(Products);
