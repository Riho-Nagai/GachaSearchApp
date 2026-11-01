import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProductRegister() {
  const navigate = useNavigate();

  // 入力項目
  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");

  // 登録状態
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 登録ボタンを押したときの処理
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      // Supabaseのproductsテーブルに登録
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: name.trim(),
            series: series.trim(),
            price: price === "" ? null : Number(price),
            release_date: releaseDate,
            description: description.trim() || null,
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      console.log("登録成功:", data);

      alert("商品を登録しました！");

      // 登録完了後、Top画面へ戻る
      navigate("/");
    } catch (error) {
      console.error("商品登録エラー:", error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("商品を登録できませんでした。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-register">
      <h1 className="product-register_title">商品登録</h1>

      <form onSubmit={handleSubmit}>
        {/* 商品名 */}
        <div className="product-register_item">
          <label htmlFor="name">商品名 *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例：猫のミニチュア"
            required
          />
        </div>

        {/* シリーズ名 */}
        <div className="product-register_item">
          <label htmlFor="series">シリーズ名 *</label>
          <input
            id="series"
            type="text"
            value={series}
            onChange={(event) => setSeries(event.target.value)}
            placeholder="例：動物シリーズ"
            required
          />
        </div>

        {/* 価格 */}
        <div className="product-register_item">
          <label htmlFor="price">価格（円）</label>
          <input
            id="price"
            type="number"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="例：300"
          />
        </div>

        {/* 発売日 */}
        <div className="product-register_item">
          <label htmlFor="releaseDate">発売日 *</label>
          <input
            id="releaseDate"
            type="date"
            value={releaseDate}
            onChange={(event) => setReleaseDate(event.target.value)}
            required
          />
        </div>

        {/* 商品説明 */}
        <div className="product-register_item">
          <label htmlFor="description">商品説明</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="商品の特徴を入力してください"
            rows={4}
          />
        </div>

        {/* エラーメッセージ */}
        {errorMessage && (
          <p className="product-register_error">{errorMessage}</p>
        )}

        {/* 登録ボタン */}
        <button type="submit" disabled={loading}>
          {loading ? "登録中..." : "商品を登録する"}
        </button>
      </form>

      {/* 戻るボタン */}
      <button type="button" onClick={() => navigate("/")}>
        トップページに戻る
      </button>
    </div>
  );
}

export default ProductRegister;
