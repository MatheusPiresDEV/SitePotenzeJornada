import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { ProductsPage } from './pages/ProductsPage';
// import { UMLDiagrams } from './pages/UMLDiagrams';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/produto/:slug" element={<ProductDetail />} />
          {/* <Route path="/uml" element={<UMLDiagrams />} /> */}
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}