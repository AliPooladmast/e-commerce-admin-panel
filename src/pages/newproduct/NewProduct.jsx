import style from "./newProduct.module.scss";

const NewProduct = () => {
  return (
    <div className={style.NewProductComponent}>
      <h1>New Product</h1>

      <form>
        <div className={style.Item}>
          <label>Title</label>
          <input type="text" placeholder="product title" />
        </div>

        <div className={style.Item}>
          <label>Description</label>
          <input type="text" placeholder="description..." />
        </div>

        <div className={style.Item}>
          <label>Price</label>
          <input type="number" placeholder="100" />
        </div>

        <div className={style.Item}>
          <label>Categories</label>
          <input type="text" placeholder="jeans, t-shirts, ..." />
        </div>

        <div className={style.Item}>
          <label>Stock</label>
          <select name="inStock" id="inStock">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
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
