import style from "./productInfo.module.scss";

const ProductInfo = ({ product }) => {
  return (
    <div className={style.InfoContainer}>
      <div className={style.ImageContainer}>
        <img src={product?.img} alt="product view" />
        <span>{product?.title}</span>
      </div>

      <div className={style.Details}>
        <div className={style.Item}>
          <span className={style.Key}>Description:</span>
          <span className={style.Value}>{product?.desc}</span>
        </div>

        <div className={style.Item}>
          <span className={style.Key}>Sales:</span>
          <span className={style.Value}>{product?.price}</span>
        </div>

        <div className={style.Item}>
          <span className={style.Key}>Categories:</span>
          <span className={style.Value}>{product?.categories?.join(", ")}</span>
        </div>

        <div className={style.Item}>
          <span className={style.Key}>Sizes:</span>
          <span className={style.Value}>{product?.size?.join(", ")}</span>
        </div>

        <div className={style.Item}>
          <span className={style.Key}>Colors:</span>
          <div className={style.ColorContainer}>
            {product?.color?.map((color, index) => (
              <div
                key={index}
                className={style.ColorCircle}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>

        <div className={style.Item}>
          <span className={style.Key}>In stock:</span>
          <span className={style.Value}>{product?.inStock}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
