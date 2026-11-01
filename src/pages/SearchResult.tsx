import type { Product } from "./Top";
import { Link } from "react-router-dom";

type SearchResultProps = {
  searchQuery: string;
  products: Product[];
};

function SearchResult({ searchQuery, products }: SearchResultProps) {
  return (
    <div className="search-results">
      <h2>検索結果</h2>

      <p className="search-keyword">
        「{searchQuery}」の検索結果：{products.length}件
      </p>

      {products.length === 0 ? (
        <p className="no-results">該当する商品が見つかりませんでした。</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/productInfo/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>

              <p>シリーズ：{product.series}</p>
              <p>
                価格：
                {product.price !== null ? `${product.price}円` : "未設定"}
              </p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
