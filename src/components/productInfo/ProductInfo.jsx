import style from "./productInfo.module.scss";

const ProductInfo = ({ product }) => {
  return (
    <div className={style.InfoContainer}>
      <div className={style.ImageContainer}>
        <img src={product.img} alt="product view" />
        <span>{product.title}</span>
      </div>

      <div className={style.Details}>
        <div className={style.Item}>
          <span className={style.Key}>Description:</span>
          <span className={style.Value}>{product.desc}</span>
        </div>

        <div className={style.Item}>
          <span className={style.Key}>Sales:</span>
          <span className={style.Value}>{product.price}</span>
        </div>

        <div className={style.Item}>
          <span className={style.Key}>Categories:</span>
          <span className={style.Value}>{product.categories?.join(", ")}</span>
        </div>

        <div className={style.Item}>
          <span className={style.Key}>In stock:</span>
          <span className={style.Value}>{product.inStock ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
