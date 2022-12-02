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
import AddMarginToPage from "../../hoc/AddMarginToPage";
import { setMessage } from "../../redux/uxSlice";
import { AddCircle } from "@mui/icons-material";
const storage = getStorage(app);

const NewProduct = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [multipleInput, setMultipleInput] = useState([]);
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [colors, setColors] = useState(["#000000"]);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleMultipleInput = (e) => {
    setMultipleInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value?.split(",")?.map((item) => item.trim()),
    }));
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
      },
      (error) => {
        dispatch(setMessage({ type: "error", text: error.code?.toString() }));
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
    const product = { ...input, ...multipleInput, img: image };
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
              className={style.Input}
            />
          </div>

          <div className={style.Item}>
            <label>Description</label>
            <input
              name="desc"
              type="text"
              placeholder="description..."
              onChange={handleInput}
              className={style.Input}
            />
          </div>

          <div className={style.Item}>
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="100"
              onChange={handleInput}
              className={style.Input}
            />
          </div>

          <div className={style.Item}>
            <label>Categories</label>
            <input
              name="categories"
              type="text"
              placeholder="jeans, t-shirts, ..."
              onChange={handleMultipleInput}
              className={style.Input}
            />
          </div>

          <div className={style.Item}>
            <label>Sizes</label>
            <input
              name="size"
              type="text"
              placeholder="L, XL, ..."
              onChange={handleMultipleInput}
              className={style.Input}
            />
          </div>

          <div className={style.Item}>
            <label>Stock</label>
            <select name="inStock" id="inStock" onChange={handleInput}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className={style.Item}>
            <label className={style.ColorTitle}>
              <span>Colors</span>
              <AddCircle
                className={style.AddIcon}
                onClick={() => setColors((prev) => [...prev, "#000000"])}
              />
            </label>
            <div className={style.ColorContainer}>
              {colors.map((color, index) => (
                <input
                  type="color"
                  value={color}
                  className={style.ColorInput}
                  key={index}
                  onChange={(e) =>
                    setColors((prev) => {
                      prev[index] = e.target.value;
                      return [...prev];
                    })
                  }
                />
              ))}
            </div>
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

            <button onClick={handleCreate}>Create</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMarginToPage(NewProduct);
