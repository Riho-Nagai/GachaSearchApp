import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  // URLから商品IDを取得
  const { id } = useParams();

  // 商品情報を保存
  const [product, setProduct] = useState<Product | null>(null);

  // 読み込み状態
  const [loading, setLoading] = useState(true);

  // エラー状態
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

  // 読み込み中
  if (loading) {
    return <p>商品情報を読み込み中...</p>;
  }

  // エラー
  if (error) {
    return <p>{error}</p>;
  }

  // 商品が存在しない場合
  if (!product) {
    return <p>商品が見つかりませんでした。</p>;
  }

  return (
    <div className="product-info">
      <h2 className="product-info_title">商品情報</h2>

      <ul>
        <div className="product-info_image">
          {/* 商品画像 */}
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
      </ul>
    </div>
  );
}

export default ProductInfo;
