import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProductRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 商品登録処理
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !series.trim() || !releaseDate) {
      setErrorMessage("必須項目を入力してください。");
      return;
    }

    if (
      price !== "" &&
      (!Number.isFinite(Number(price)) || Number(price) < 0)
    ) {
      setErrorMessage("価格は0以上の数値を入力してください。");
      return;
    }

    setSaving(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.from("products").insert([
        {
          name: name.trim(),
          series: series.trim(),
          price: price === "" ? null : Number(price),
          release_date: releaseDate,
          description: description.trim() || null,
        },
      ]);

      if (error) throw error;

      alert("商品を登録しました！");
      navigate("/");
    } catch (err) {
      console.error("商品登録エラー:", err);

      setErrorMessage(
        err instanceof Error ? err.message : "商品を登録できませんでした。",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="product-edit">
      <h1 className="product-edit_title">商品登録</h1>

      {errorMessage && <p className="product-edit_error">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* 商品名 */}
        <div className="product-edit_item">
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
        <div className="product-edit_item">
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
        <div className="product-edit_item">
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
        <div className="product-edit_item">
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
        <div className="product-edit_item">
          <label htmlFor="description">商品説明</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="商品の特徴を入力してください"
            rows={4}
          />
        </div>

        {/* 登録ボタン */}
        <button type="submit" disabled={saving}>
          {saving ? "登録中..." : "商品を登録する"}
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
