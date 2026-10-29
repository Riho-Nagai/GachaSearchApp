import { Link } from "react-router-dom";
import type { Product } from "./Top";

type SearchResultProps = {
  searchQuery: string;
  products: Product[];
};

function SearchResult({ searchQuery, products }: SearchResultProps) {
  return (
    <section className="search-results">
      <h2>「{searchQuery}」の検索結果</h2>

      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <Link to={`/productInfo`} state={product}>
                <h3>{product.name}</h3>
              </Link>

              <p>{product.series}</p>
              <p>
                価格：
                {product.price !== null ? `${product.price}円` : "未登録"}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="no-results">該当する商品が見つかりませんでした。</p>
      )}
    </section>
  );
}

export default SearchResult;
