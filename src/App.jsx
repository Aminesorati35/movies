import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import DownloadPage from "./pages/DownloadPage";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import AllPage from "./pages/AllPage";
import SignUpModal from "./components/SignUpModal";
import TutorialModal from "./components/TutorialModal";
import Locker from "./components/Locker";

export default function App() {
  const [isTikTokBrowser, setIsTikTokBrowser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showLocker, setShowLocker] = useState(false);

  const startAccessFlow = useCallback(() => {
    setShowTutorial(true);
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    const isTikTok =
      ua.includes("tiktok") ||
      ua.includes("bytedance") ||
      ua.includes("musical_ly") ||
      ua.includes("aweme");

    setIsTikTokBrowser(isTikTok);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
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

  return (
    <div className="min-h-screen bg-[#050510]">
      <ScrollToTop />
      <Navbar
        scrolled={scrolled}
        onSignUp={() => setShowSignUp(true)}
        onStartAccessFlow={startAccessFlow}
      />

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onLocker={() => {
            setShowSignUp(false);
            setShowLocker(true);
          }}
        />
      )}
      {showTutorial && (
        <TutorialModal
          onFinish={() => {
            setShowTutorial(false);
            setShowLocker(true);
          }}
        />
      )}
      {showLocker && <Locker onClose={() => setShowLocker(false)} />}

      <Routes>
        <Route
          path="/"
          element={<Home onStartAccessFlow={startAccessFlow} />}
        />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/:slug" element={<DetailPage />} />
        <Route path="/category/:type" element={<AllPage />} />
      </Routes>
    </div>
  );
}