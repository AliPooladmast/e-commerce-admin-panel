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
const storage = getStorage(app);

const NewProduct = () => {
  const [input, setInput] = useState({});
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategory = (e) => {
    setCategories(e.target.value?.split(",")?.map((item) => item.trim()));
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
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
          console.log("File available at", downloadURL);
          const product = { ...input, categories, img: downloadURL };
          addProduct(dispatch, product);
        });
      }
    );
  };

  return (
    <div className={style.NewProductComponent}>
      <h1>New Product</h1>

      <form>
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

        <div className={style.Image}>
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </div>

        <div className={style.Item}>
          <button onClick={handleCreate}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
