import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import DownloadPage from "./pages/DownloadPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  

  // ✅ الموقع عادي
  return (
    <div className="min-h-screen bg-[#050510]">
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/:slug" element={<DetailPage />} />
</Routes>
    </div>
  );
}