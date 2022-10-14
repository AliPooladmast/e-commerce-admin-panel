import style from "./newProduct.module.scss";

const NewProduct = () => {
  return (
    <div className={style.NewProductComponent}>
      <h1>New Product</h1>

      <form>
        <div className={style.Item}>
          <label>Product Name</label>
          <input type="text" placeholder="Apple Macbook" />
        </div>

        <div className={style.Item}>
          <label>Stock</label>
          <input type="text" placeholder="235" />
        </div>

        <div className={style.Item}>
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className={style.Item}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
