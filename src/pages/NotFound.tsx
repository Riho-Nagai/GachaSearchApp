import { Link } from "react-router-dom";
//Routes、Route、Link、BrowserRouterをインポートし、ルーティング

function NotFound() {
  return (
    <div>
      <h2>検索結果</h2>
      <p>該当するガチャが見つかりませんでした</p>
      <Link to="/" className="top-link">
        トップページに戻る
      </Link>
    </div>
  );
}

export default NotFound;
