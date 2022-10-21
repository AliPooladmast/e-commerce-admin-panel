import style from "./product.module.scss";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

const Product = () => {
  const [productStats, setProductStats] = useState([]);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === productId)
  );
  const [draftProduct, setDraftProduct] = useState(product);
  const [categories, setCategories] = useState(product.categories);

  const handleInput = (e) => {
    setDraftProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategory = (e) => {
    setCategories(e.target.value?.split(",")?.map((item) => item.trim()));
  };

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
        const res = await userRequest.get("/orders/income?pid=" + productId);
        const data = res.data?.sort((a, b) => a._id - b._id);

        setProductStats([]);
        data.forEach((item) => {
          setProductStats((prev) => [
            ...prev,
            { name: MONTH[item._id - 1], Sales: item.total },
          ]);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getProductStats();
  }, [MONTH, productId]);

  return (
    <div className={style.Product}>
      <div className={style.TitleContainer}>
        <h1>Product</h1>
        <Link to="/newproduct">
          <button>Create</button>
        </Link>
      </div>

      <div className={style.Top}>
        <div className={style.ChartContainer}>
          <Chart
            data={productStats}
            title="Sales Performance"
            dataKey="Sales"
          />
        </div>

        <div className={style.InfoContainer}>
          <div className={style.ImageContainer}>
            <img src={product.img} alt="product view" />
            <span>{product.title}</span>
          </div>

          <div className={style.Details}>
            <div className={style.Item}>
              <span className={style.Key}>id:</span>
              <span className={style.Value}>{product._id}</span>
            </div>

            <div className={style.Item}>
              <span className={style.Key}>sales:</span>
              <span className={style.Value}>{product.price}</span>
            </div>

            <div className={style.Item}>
              <span className={style.Key}>in stock:</span>
              <span className={style.Value}>{product.inStock.toString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={style.Bottom}>
        <form>
          <div className={style.EditDetails}>
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder={product.title}
              onChange={handleInput}
            />

            <label>Description</label>
            <input
              name="desc"
              type="text"
              placeholder={product.desc}
              onChange={handleInput}
            />

            <label>Price</label>
            <input
              name="price"
              type="text"
              placeholder={product.price}
              onChange={handleInput}
            />

            <label>Categories</label>
            <input
              type="text"
              placeholder={product.categories}
              onChange={handleCategory}
            />

            <label>Stock</label>
            <select name="inStock" id="inStock" onChange={handleInput}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className={style.Upload}>
            <div className={style.FileUpload}>
              <img src={product.img} alt="upload product" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" />
            </div>

            <button>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
