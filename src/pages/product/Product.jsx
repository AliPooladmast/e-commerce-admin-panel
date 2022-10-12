import style from "./product.module.scss";

const Product = () => {
  return (
    <div className={style.Product}>
      <div className={style.TitleContainer}>
        <h1>Product</h1>
        <button>Create</button>
      </div>
    </div>
  );
};

export default Product;
