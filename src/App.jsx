import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import DownloadPage from "./pages/DownloadPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [isTikTokBrowser, setIsTikTokBrowser] = useState(null);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    const isTikTok =
      ua.includes("tiktok") ||
      ua.includes("bytedance") ||
      ua.includes("musical_ly") ||
      ua.includes("aweme");

    setIsTikTokBrowser(isTikTok);
  }, []);

  if (isTikTokBrowser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <img
          src="/images/browser/5.gif"
          alt="Open in browser"
          className="w-[300px] max-w-[90%]"
        />
      </div>
    );
  }

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