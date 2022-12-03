import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { editProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import style from "./editProduct.module.scss";
import { Publish } from "@mui/icons-material";
import { LinearProgressWithLabel } from "../../components/linearProgress/LinearProgress";

const storage = getStorage(app);

const EditProduct = ({ product, productId }) => {
  const dispatch = useDispatch();
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

  return (
    <div className={style.EditProduct}>
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
              <label htmlFor="file">
                <Publish />
              </label>
            </div>

            <div>
              {Boolean(progress) && progress !== 100 ? (
                <LinearProgressWithLabel value={progress} />
              ) : Boolean(progress) && progress === 100 ? (
                <div className={style.Uploaded}>File Uploaded</div>
              ) : null}
            </div>

            <input type="file" id="file" onChange={handleImage} />
          </div>

          <button onClick={handleEdit}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
