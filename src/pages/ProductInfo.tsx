import { useLocation } from "react-router-dom";

const productImages = [];

function ProductInfo() {
  //子コンポーネントでなくても受け取れる
  const { state: product } = useLocation();

  return (
    <div className="product-info">
      <h2 className="product-info_title">商品情報</h2>
      <ul>
        <div className="product-info_image">
          <img src={product.img} />
        </div>
        <div className="product-info_details">{product.name}</div>
        <div className="product-info_series">{product.series}</div>
        <div className="product-info_price">{product.price}円</div>
        <div className="product-info_description">{product.description}</div>
      </ul>
    </div>
  );
}

export default ProductInfo;
