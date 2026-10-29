import { useState } from "react";
import SearchResult from "./SearchResult";

export type Product = {
  id: number;
  name: string;
  series: string;
  price: number | null;
  description: string | null;
};

// テスト用の商品データ
const testProducts: Product[] = [
  {
    id: 1,
    name: "猫のミニチュア",
    series: "動物シリーズ",
    price: 300,
    description: "猫をモチーフにしたミニチュアです。",
  },
  {
    id: 2,
    name: "ねこのフィギュア",
    series: "猫シリーズ",
    price: 400,
    description: "ねこの姿を再現したフィギュアです。",
  },
  {
    id: 3,
    name: "犬のミニチュア",
    series: "動物シリーズ",
    price: 300,
    description: "犬をモチーフにしたミニチュアです。",
  },
  {
    id: 4,
    name: "猫のキーホルダー",
    series: "猫シリーズ",
    price: 200,
    description: "猫のデザインのキーホルダーです。",
  },
];

function normalizeSearchText(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u3041-\u3096]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) + 0x60),
    )
    .replace(/猫/g, "ネコ")
    .replace(/犬/g, "イヌ");
}

function Top() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  // const [products, setProducts] = useState<Product[]>([]);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const query = searchQuery.trim();

    if (!query) {
      alert("検索キーワードを入力してください");
      return;
    }

    setSubmittedQuery(query);
  };
  // testデータ用
  const normalizeQuery = normalizeSearchText(submittedQuery);

  const filteredProducts = testProducts.filter((product) => {
    const productText = normalizeSearchText(
      `${product.name} ${product.series} ${product.description ?? ""}`,
    );

    return productText.includes(normalizeQuery);
  });
  //テストデータ用ここまで

  // setError("");
  // setLoading(true);

  // try {
  //   const response = await fetch(
  //     `http://localhost:3001/api/products?q=${encodeURIComponent(query)}`,
  //   );

  //   if (!response.ok) {
  //     throw new Error("商品情報を取得できませんでした。");
  //   }

  //   const data: Product[] = await response.json();
  //   setProducts(data);
  // } catch {
  //   setError(
  //     "商品情報を取得できませんでした。APIサーバーを確認してください。",
  //   );
  //   setProducts([]);
  // } finally {
  //   setLoading(false);
  // }
  // };

  return (
    <div className="l_main">
      <section className="l_search-area">
        <h1 className="top_title" data-text="Gacha Search">
          Gacha Search
        </h1>

        <div className="l_search-bar">
          <input
            className="search-bar"
            type="text"
            placeholder="ここで検索"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button
            className="search-button"
            type="button"
            onClick={handleSearch}
          >
            <span>検索</span>
          </button>
        </div>
      </section>

      {/* <section className="results-area">
        {loading && <p>検索中...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && submittedQuery !== "" && (
          <SearchResult searchQuery={submittedQuery} products={products} />
        )}
      </section> */}

      <section className="results-area">
        {submittedQuery !== "" && (
          <SearchResult
            searchQuery={submittedQuery}
            products={filteredProducts}
          />
        )}
      </section>
    </div>
  );
}

export default Top;
