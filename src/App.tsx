import { Routes, Route, useLocation } from "react-router-dom";
import Top from "./pages/Top";
import ProductInfo from "./pages/ProductInfo";
import ProductRegister from "./pages/ProductRegister";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ProductEdit from "./pages/ProductEdit";

function App() {
  const location = useLocation();

  const showFooter =
    location.pathname === "/" ||
    location.pathname.startsWith("/productInfo/") ||
    location.pathname === "/productRegister";

  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/productRegister" element={<ProductRegister />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/productEdit/:id" element={<ProductEdit />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default App;
