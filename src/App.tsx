import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminUploadPage from "./pages/AdminUploadPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/admin" element={<AdminUploadPage />} />
      </Routes>
      <Toaster 
        theme="dark" 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'oklch(0.13 0.005 285)',
            border: '1px solid oklch(0.25 0.005 285)',
            color: 'oklch(0.98 0 0)',
          },
        }}
      />
    </>
  );
}
