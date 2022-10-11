import SideBar from "../../components/siderbar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import style from "./products.module.scss";
import ProductList from "../../components/productList/ProductList";

const Products = () => {
  return (
    <>
      <TopBar />
      <div className={style.MainLayout}>
        <SideBar />
        <div className={style.Body}>
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default Products;
