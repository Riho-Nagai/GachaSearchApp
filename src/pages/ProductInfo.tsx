import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

// 商品情報の型定義
type Product = {
  id: number;
  name: string;
  series: string;
  price: number | null;
  description: string | null;
  release_date: string | null;
};

function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Supabaseから商品情報を取得
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || !/^\d+$/.test(id)) {
        setError("商品IDが正しくありません。");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", Number(id))
          .single();

        if (error) {
          throw error;
        }

        setProduct(data as Product);
      } catch (err) {
        console.error("商品情報取得エラー:", err);
        setError("商品情報を取得できませんでした。");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 商品削除処理
  const handleDelete = async () => {
    if (!product) return;

    const confirmed = window.confirm(`「${product.name}」を削除しますか？`);

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) {
        throw error;
      }

      alert("商品を削除しました。");
      navigate("/");
    } catch (err) {
      console.error("商品削除エラー:", err);
      setError(
        err instanceof Error ? err.message : "商品を削除できませんでした。",
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p>商品情報を読み込み中...</p>;
  }

  if (error && !product) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>商品が見つかりませんでした。</p>;
  }

  return (
    <div className="product-info">
      <h2 className="product-info_title">商品情報</h2>

      <div className="product-info_image">
        <img src="/images/products/no-image.jpg" alt={product.name} />
      </div>

      {/* 商品名 */}
      <div className="product-info_details">{product.name}</div>

      {/* シリーズ */}
      <div className="product-info_series">{product.series}</div>

      {/* 価格 */}
      <div className="product-info_price">
        {product.price !== null ? `${product.price}円` : "価格未登録"}
      </div>

      {/* 発売日 */}
      <div className="product-info_release-date">
        発売日：{product.release_date ?? "未登録"}
      </div>

      {/* 商品説明 */}
      <div className="product-info_description">
        {product.description ?? "商品説明はありません。"}
      </div>

      {/* エラー表示 */}
      {error && <p className="product-info_error">{error}</p>}

      {/* 編集・削除ボタン */}
      <div className="product-info_actions">
        <button
          type="button"
          onClick={() => navigate(`/productEdit/${product.id}`)}
        >
          商品を編集する
        </button>

        <button type="button" onClick={handleDelete} disabled={deleting}>
          {deleting ? "削除中..." : "商品を削除する"}
        </button>
      </div>

      {/* トップページに戻る */}
      <button type="button" onClick={() => navigate("/")}>
        トップページに戻る
      </button>
    </div>
  );
}

export default ProductInfo;
