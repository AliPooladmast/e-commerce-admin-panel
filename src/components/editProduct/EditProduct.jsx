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
import { setMessage } from "../../redux/uxSlice";
import MultipleSelectChip from "../multipleSelect/MultipleSelect";

const storage = getStorage(app);

const Joi = require("joi");
const schema = Joi.object({
  title: Joi.string().min(3).max(50).required().trim(),
  desc: Joi.string().min(3).max(1024),
  img: Joi.string().min(0),
  categories: Joi.array().max(10).items(Joi.string().min(1).max(20)),
  size: Joi.array().required().max(10).items(Joi.string().min(1).max(5)),
  color: Joi.array().required().max(10).items(Joi.string().min(1).max(20)),
  price: Joi.number().min(1).required(),
  inStock: Joi.number().min(1).required(),
});

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
    setDraftProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

    const { title, desc, price, inStock } = draftProduct;

    const editedProduct = {
      title,
      desc,
      price,
      inStock,
      ...multipleInput,
      color: colors,
      img: image,
    };

    const { error: joiError } = schema.validate(editedProduct);

    if (joiError) {
      dispatch(
        setMessage({
          type: "error",
          text: joiError.details?.[0]?.message?.toString(),
        })
      );
    } else {
      editProduct(dispatch, productId, editedProduct);
    }
  };

  return (
    <div className={style.EditProduct}>
      <form>
        <div className={style.EditDetails}>
          <div className={style.Item}>
            <label>Title</label>
            <input
              name="title"
              type="text"
              value={draftProduct?.title || ""}
              onChange={handleInput}
              placeholder="title"
            />
          </div>

          <div className={style.Item}>
            <label>Description</label>
            <input
              name="desc"
              type="text"
              value={draftProduct?.desc || ""}
              onChange={handleInput}
              placeholder="description"
            />
          </div>

          <div className={style.Item}>
            <label>Price</label>
            <input
              name="price"
              type="text"
              value={draftProduct?.price || ""}
              onChange={handleInput}
              placeholder="price"
            />
          </div>

          <div className={style.Item}>
            <label>Categories</label>
            <input
              name="categories"
              type="text"
              value={multipleInput?.categories || ""}
              onChange={handleMultipleInput}
              placeholder="categories"
            />
          </div>

          <div className={style.Item}>
            <label>Sizes</label>
            <input
              name="size"
              type="text"
              value={multipleInput?.size || ""}
              onChange={handleMultipleInput}
              placeholder="sizes"
            />
          </div>

          <div className={style.Item}>
            <label>Stock</label>
            <input
              name="inStock"
              type="number"
              value={draftProduct?.inStock || ""}
              onChange={handleInput}
              min={1}
              placeholder="stock number"
            />
          </div>

          <div className={style.Item}>
            <label className={style.ColorTitle}>
              <div>Colors</div>
            </label>

            <MultipleSelectChip colors={colors} setColors={setColors} />
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
