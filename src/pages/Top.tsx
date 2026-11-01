import { useState } from "react";
import SearchResult from "./SearchResult";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export type Product = {
  id: number;
  name: string;
  series: string;
  price: number | null;
  description: string | null;
};

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
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSearch = async () => {

  //   const query = searchQuery.trim();

  //   if (!query) {
  //     alert("検索キーワードを入力してください");
  //     return;
  //   }

  //   setSubmittedQuery(query);
  //   setError("");
  //   setLoading(true);

  //   try {
  //     // Supabaseから商品情報を取得
  //     const { data, error } = await supabase
  //       .from("products")
  //       .select("*")
  //       .order("id", { ascending: true });

  //     if (error) {
  //       throw error;
  //     }

  //     // 検索キーワードを正規化
  //     const normalizedQuery = normalizeSearchText(query);

  //     // 商品名・シリーズ名・説明文から検索
  //     const filteredProducts = (data ?? []).filter((product) => {
  //       const productText = normalizeSearchText(
  //         `${product.name} ${product.series ?? ""} ${
  //           product.description ?? ""
  //         }`,
  //       );

  //       return productText.includes(normalizedQuery);
  //     });

  //     setProducts(filteredProducts);
  //   } catch (err) {
  //     console.error("商品情報取得エラー:", err);
  //     setError("商品情報を取得できませんでした。");
  //     setProducts([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // return (
  //   <div className="l_main">
  //     <section className="l_search-area">
  //       <h1 className="top_title" data-text="Gacha Search">
  //         Gacha Search
  //       </h1>

  //       <div className="l_search-bar">
  //         <input
  //           className="search-bar"
  //           type="text"
  //           placeholder="ここで検索"
  //           value={searchQuery}
  //           onChange={(event) => setSearchQuery(event.target.value)}
  //           onKeyDown={(event) => {
  //             if (event.key === "Enter") {
  //               handleSearch();
  //             }
  //           }}
  //         />

  //         <button
  //           className="search-button"
  //           type="button"
  //           onClick={handleSearch}
  //           disabled={loading}
  //         >
  //           <span>検索</span>
  //         </button>
  //       </div>

  //       {/* 商品登録ボタン */}
  //       <div className="register-link">
  //         <button type="button" onClick={() => navigate("/productRegister")}>
  //           商品を登録する
  //         </button>
  //       </div>
  //     </section>

  //     <section className="results-area">
  //       {loading && <p>検索中...</p>}

  //       {error && <p>{error}</p>}

  //       {!loading && !error && submittedQuery !== "" && (
  //         <SearchResult searchQuery={submittedQuery} products={products} />
  //       )}
  //     </section>
  //   </div>
  // );

  const handleSearch = async () => {
    const query = searchQuery.trim();

    if (!query) {
      alert("検索キーワードを入力してください");
      return;
    }

    setSubmittedQuery(query);
    setError("");
    setLoading(true);

    try {
      // Supabaseから商品情報をすべて取得
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      console.log("Supabase取得データ:", data);

      // 検索キーワードを正規化
      const normalizedQuery = normalizeSearchText(query);

      // 商品名・シリーズ名・説明文から検索
      const filteredProducts = (data ?? []).filter((product) => {
        const productText = normalizeSearchText(
          `${product.name ?? ""} ${
            product.series ?? ""
          } ${product.description ?? ""}`,
        );

        return productText.includes(normalizedQuery);
      });

      console.log("検索結果:", filteredProducts);

      setProducts(filteredProducts);
    } catch (err) {
      console.error("商品情報取得エラー:", err);
      setError("商品情報を取得できませんでした。");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

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
            disabled={loading}
          >
            <span>検索</span>
          </button>
        </div>
      </section>

      {/* 商品登録ボタン */}
      <div className="register-link">
        <button type="button" onClick={() => navigate("/productRegister")}>
          商品を登録する
        </button>
      </div>

      <section className="results-area">
        {loading && <p>検索中...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && submittedQuery !== "" && (
          <SearchResult searchQuery={submittedQuery} products={products} />
        )}
      </section>
    </div>
  );
}

export default Top;
