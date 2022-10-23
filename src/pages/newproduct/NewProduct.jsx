import { useState } from "react";
import style from "./newProduct.module.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinearProgressWithLabel } from "../../components/linearProgress/LinearProgress";
const storage = getStorage(app);

const NewProduct = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
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

  const handleCreate = (e) => {
    e.preventDefault();
    const product = { ...input, categories, img: image };
    addProduct(dispatch, product);
    navigate("/products");
  };

  return (
    <div className={style.NewProductComponent}>
      <h1>New Product</h1>

      <form>
        <div className={style.Left}>
          <div className={style.Item}>
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder="product title"
              onChange={handleInput}
            />
          </div>

          <div className={style.Item}>
            <label>Description</label>
            <input
              name="desc"
              type="text"
              placeholder="description..."
              onChange={handleInput}
            />
          </div>

          <div className={style.Item}>
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="100"
              onChange={handleInput}
            />
          </div>

          <div className={style.Item}>
            <label>Categories</label>
            <input
              type="text"
              placeholder="jeans, t-shirts, ..."
              onChange={handleCategory}
            />
          </div>

          <div className={style.Item}>
            <label>Stock</label>
            <select name="inStock" id="inStock" onChange={handleInput}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <div className={style.Right}>
          <div className={style.Image}>
            {image && <img src={image} alt="upload product" />}

            <input type="file" id="file" onChange={handleImage} />

            {Boolean(progress) && progress !== 100 ? (
              <LinearProgressWithLabel value={progress} />
            ) : Boolean(progress) && progress === 100 ? (
              <div className={style.Uploaded}>File Uploaded</div>
            ) : null}
          </div>

          <button onClick={handleCreate}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
