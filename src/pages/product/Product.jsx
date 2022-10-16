import style from "./product.module.scss";
import Chart from "../../components/chart/Chart";
import { productData } from "../../DummyData";
import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = () => {
  const location = useLocation();

  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === productId)
  );

  console.log(product);

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
          <Chart data={productData} title="Sales Performance" dataKey="Sales" />
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
            <label>Product Name</label>
            <input type="text" placeholder={product.title} />
            <label>Product Desc</label>
            <input type="text" placeholder={product.desc} />
            <label>Product Price</label>
            <input type="text" placeholder={product.price} />
            <label>In Stock</label>
            <select name="inStock" id="inStock">
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
