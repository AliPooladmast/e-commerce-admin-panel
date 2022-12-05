import style from "./product.module.scss";
import Chart from "../../components/chart/Chart";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import AddMarginToPage from "../../hoc/AddMarginToPage";
import { setMessage } from "../../redux/uxSlice";
import ProductInfo from "../../components/productInfo/ProductInfo";
import EditProduct from "../../components/editProduct/EditProduct";

const Product = () => {
  const dispatch = useDispatch();
  const [productStats, setProductStats] = useState([]);
  const [productStatsLoading, setProductStatsLoading] = useState(false);
  const location = useLocation();
  const productId = location.pathname?.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === productId)
  );

  const MONTH = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getProductStats = async () => {
      try {
        setProductStatsLoading(true);
        const res = await userRequest.get("/orders/income?pid=" + productId);
        if (res) {
          const data = res.data?.sort((a, b) => a._id - b._id);

          setProductStats([]);
          data.forEach((item) => {
            setProductStats((prev) => [
              ...prev,
              { name: MONTH[item._id - 1], Sales: item.total },
            ]);
          });
          setProductStatsLoading(false);
        }
      } catch (err) {
        dispatch(
          setMessage({ type: "error", text: err?.response?.data?.toString() })
        );
      }
    };
    getProductStats();
  }, [MONTH, productId]); //eslint-disable-line

  return (
    <>
      <div className={style.TitleContainer}>
        <h1>Edit Product</h1>
      </div>

      <Chart
        data={productStats}
        title="Sales Performance"
        dataKey="Sales"
        loading={productStatsLoading}
        className={style.Chart}
      />

      <div className={style.Product}>
        <ProductInfo product={product} />
        <EditProduct product={product} productId={productId} />
      </div>
    </>
  );
};

export default AddMarginToPage(Product);
