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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinearProgressWithLabel } from "../../components/linearProgress/LinearProgress";
import AddMarginToPage from "../../hoc/AddMarginToPage";
import { setMessage } from "../../redux/uxSlice";
import { AddCircle } from "@mui/icons-material";
import useUpdate from "../../hook/useUpdate";
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

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.product);
  const [input, setInput] = useState({});
  const [multipleInput, setMultipleInput] = useState({});
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [colors, setColors] = useState(["#000000"]);

  const handleInput = (e) => {
    setInput((prev) => {
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
    const product = { ...input, ...multipleInput, color: colors, img: image };
    const { error: joiError } = schema.validate(product);

    if (joiError) {
      dispatch(
        setMessage({
          type: "error",
          text: joiError.details?.[0]?.message?.toString(),
        })
      );
    } else {
      addProduct(dispatch, product);
    }
  };

  useUpdate(() => {
    success && navigate("/products");
  }, [success]); //eslint-disable-line

  return (
    <div className={style.NewProductComponent}>
      <h1>New Product</h1>

      <form>
        <div className={style.Left}>
          <div className={style.Item}>
            <label>
              Title<span>*</span>
            </label>
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
            <label>
              Price<span>*</span>
            </label>
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
            <label>
              Sizes<span>*</span>
            </label>
            <input
              name="size"
              type="text"
              placeholder="L, XL, ..."
              onChange={handleMultipleInput}
              className={style.Input}
            />
          </div>

          <div className={style.Item}>
            <label>
              Stock<span>*</span>
            </label>
            <input
              name="inStock"
              type="number"
              placeholder="1"
              onChange={handleInput}
              className={style.Input}
              min={1}
            />
          </div>

          <div className={style.Item}>
            <label className={style.ColorTitle}>
              <div>
                Colors<span>*</span>
              </div>
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
