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
import { AddCircle, Publish } from "@mui/icons-material";
import { LinearProgressWithLabel } from "../../components/linearProgress/LinearProgress";

const storage = getStorage(app);

const EditProduct = ({ product, productId }) => {
  const dispatch = useDispatch();
  const [draftProduct, setDraftProduct] = useState(product);
  const [multipleInput, setMultipleInput] = useState({
    categories: product?.categories,
    size: product?.size,
  });
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(product?.img);
  const [colors, setColors] = useState(product?.color);

  const handleInput = (e) => {
    setDraftProduct((prev) => {
      if (e.target.value) {
        return { ...prev, [e.target.name]: e.target.value };
      } else {
        delete prev[e.target.name];
        return prev;
      }
    });
  };

  const handleMultipleInput = (e) => {
    setMultipleInput((prev) => {
      if (e.target.value) {
        return {
          ...prev,
          [e.target.name]: e.target.value
            ?.split(",")
            ?.map((item) => item.trim()),
        };
      } else {
        delete prev[e.target.name];
        return prev;
      }
    });
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
    const editedProduct = { ...draftProduct, img: image };
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
            value={draftProduct?.title || ""}
            onChange={handleInput}
          />

          <label>Description</label>
          <input
            name="desc"
            type="text"
            value={draftProduct?.desc || ""}
            onChange={handleInput}
          />

          <label>Price</label>
          <input
            name="price"
            type="text"
            value={draftProduct?.price || ""}
            onChange={handleInput}
          />

          <label>Categories</label>
          <input
            name="categories"
            type="text"
            value={multipleInput?.categories || ""}
            onChange={handleMultipleInput}
          />

          <label>Sizes</label>
          <input
            name="size"
            type="text"
            value={multipleInput?.size || ""}
            onChange={handleMultipleInput}
          />

          <label>Stock</label>
          <input
            name="inStock"
            type="number"
            value={draftProduct?.inStock || ""}
            onChange={handleInput}
            min={1}
          />

          <label className={style.ColorTitle}>
            <div>Colors</div>
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

        <div className={style.Upload}>
          <div className={style.FileUpload}>
            <div className={style.ImageContainer}>
              <img src={image} alt="upload product" />
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
