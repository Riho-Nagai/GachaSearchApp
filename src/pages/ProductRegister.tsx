import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProductRegister() {
  const navigate = useNavigate();

  // 入力フォームの状態
  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 商品登録処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !series.trim()) {
      setError("商品名とシリーズ名を入力してください。");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.from("products").insert({
        name: name.trim(),
        series: series.trim(),
        price: price === "" ? null : Number(price),
        release_date: releaseDate,
        description: description.trim() || null,
      });

      if (error) {
        throw error;
      }

      alert("商品を登録しました！");
      navigate("/");
    } catch (err) {
      console.error("商品登録エラー:", err);
      setError("商品を登録できませんでした。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-register">
      <h1 className="product-register_title">商品登録</h1>

      <form onSubmit={handleSubmit}>
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

        {error && <p className="product-register_error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "登録中..." : "商品を登録する"}
        </button>
      </form>

      <button type="button" onClick={() => navigate("/")}>
        トップページに戻る
      </button>
    </div>
  );
}

export default ProductRegister;
