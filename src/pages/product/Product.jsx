import style from "./product.module.scss";
import Chart from "../../components/chart/Chart";
import { productData } from "../../DummyData";
import { Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Product = () => {
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
            <img
              src="https://static.giga.de/wp-content/uploads/2021/10/hero_intro_endframe__e6khcva4hkeq_large.jpg"
              alt="product view"
            />
            <span>MacBook Pro</span>
          </div>

          <div className={style.Details}>
            <div className={style.Item}>
              <span className={style.Key}>id:</span>
              <span className={style.Value}>135</span>
            </div>

            <div className={style.Item}>
              <span className={style.Key}>sales:</span>
              <span className={style.Value}>3246</span>
            </div>

            <div className={style.Item}>
              <span className={style.Key}>active:</span>
              <span className={style.Value}>yes</span>
            </div>

            <div className={style.Item}>
              <span className={style.Key}>in stock:</span>
              <span className={style.Value}>no</span>
            </div>
          </div>
        </div>
      </div>

      <div className={style.Bottom}>
        <form>
          <div className={style.EditDetails}>
            <label>Product Name</label>
            <input type="text" placeholder="Apple MacBook Pro" />
            <label>In Stock</label>
            <select name="inStock" id="inStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className={style.Upload}>
            <div className={style.FileUpload}>
              <img
                src="https://static.giga.de/wp-content/uploads/2021/10/hero_intro_endframe__e6khcva4hkeq_large.jpg"
                alt="upload product"
              />
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
