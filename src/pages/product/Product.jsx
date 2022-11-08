import style from "./product.module.scss";
import Chart from "../../components/chart/Chart";
import { Publish } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { LinearProgressWithLabel } from "../../components/linearProgress/LinearProgress";
import { editProduct } from "../../redux/apiCalls";
import AddMarginToPage from "../../hoc/AddMarginToPage";
const storage = getStorage(app);

const Product = () => {
  const dispatch = useDispatch();
  const [productStats, setProductStats] = useState([]);
  const [productStatsLoading, setProductStatsLoading] = useState(false);
  const location = useLocation();
  const productId = location.pathname?.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === productId)
  );
  const [draftProduct, setDraftProduct] = useState(product);
  const [categories, setCategories] = useState(product.categories);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleInput = (e) => {
    setDraftProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategory = (e) => {
    setCategories(e.target.value?.split(",")?.map((item) => item.trim()));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
          default:
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const editedProduct = { ...draftProduct, categories, img: image };
    editProduct(dispatch, productId, editedProduct);
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
        console.log(err);
      }
    };
    getProductStats();
  }, [MONTH, productId]);

  return (
    <div className={style.Product}>
      <div className={style.TitleContainer}>
        <h1>Product</h1>
      </div>

      <div className={style.Top}>
        <div className={style.ChartContainer}>
          <Chart
            data={productStats}
            title="Sales Performance"
            dataKey="Sales"
            loading={productStatsLoading}
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
              <div className={style.ImageContainer}>
                <img src={image || product.img} alt="upload product" />
                {Boolean(progress) && progress !== 100 ? (
                  <LinearProgressWithLabel value={progress} />
                ) : Boolean(progress) && progress === 100 ? (
                  <div className={style.Uploaded}>File Uploaded</div>
                ) : null}
              </div>
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" onChange={handleImage} />
            </div>

            <button onClick={handleEdit}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarginToPage(Product);
