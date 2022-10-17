import { useState } from "react";
import style from "./newProduct.module.scss";

const NewProduct = () => {
  const [input, setInput] = useState({});
  const [category, setCategory] = useState([]);

  const handleInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategory = (e) => {
    setCategory(e.target.value?.split(",")?.map((item) => item.trim()));
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
          <input type="file" id="file" />
        </div>

        <div className={style.Item}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
