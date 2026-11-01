import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 編集する商品の情報を取得
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMessage("商品IDが正しくありません。");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", Number(id))
          .single();

        if (error) throw error;

        setName(data.name ?? "");
        setSeries(data.series ?? "");
        setPrice(data.price !== null ? String(data.price) : "");
        setReleaseDate(data.release_date ?? "");
        setDescription(data.description ?? "");
      } catch (err) {
        console.error("商品情報取得エラー:", err);
        setErrorMessage("商品情報を取得できませんでした。");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 商品情報を更新
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id || !name.trim() || !series.trim() || !releaseDate) {
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
      const { error } = await supabase
        .from("products")
        .update({
          name: name.trim(),
          series: series.trim(),
          price: price === "" ? null : Number(price),
          release_date: releaseDate,
          description: description.trim() || null,
        })
        .eq("id", Number(id));

      if (error) throw error;

      alert("商品情報を更新しました！");
      navigate(`/productInfo/${id}`);
    } catch (err) {
      console.error("商品更新エラー:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "商品情報を更新できませんでした。",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>商品情報を読み込み中...</p>;
  }

  return (
    <div className="product-edit">
      <h1 className="product-edit_title">商品編集</h1>

      {errorMessage && <p className="product-edit_error">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="product-edit_item">
          <label htmlFor="name">商品名 *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div className="product-edit_item">
          <label htmlFor="series">シリーズ名 *</label>
          <input
            id="series"
            type="text"
            value={series}
            onChange={(event) => setSeries(event.target.value)}
            required
          />
        </div>

        <div className="product-edit_item">
          <label htmlFor="price">価格（円）</label>
          <input
            id="price"
            type="number"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

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

        <div className="product-edit_item">
          <label htmlFor="description">商品説明</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
          />
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "更新中..." : "変更を保存する"}
        </button>
      </form>

      <button type="button" onClick={() => navigate(`/productInfo/${id}`)}>
        商品詳細に戻る
      </button>
    </div>
  );
}

export default ProductEdit;
