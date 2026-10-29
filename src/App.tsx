import { Routes, Route, useLocation } from "react-router-dom";
import Top from "./pages/Top";
import ProductInfo from "./pages/ProductInfo";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  // フッターを表示するページ
  const showFooter = location.pathname === "/" || location.pathname === "*";

  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/productInfo" element={<ProductInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default App;
