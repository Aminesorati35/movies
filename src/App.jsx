import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import DownloadPage from "./pages/DownloadPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050510]">
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<DetailPage />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </div>
  );
}