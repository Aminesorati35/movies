import { useEffect, useState } from "react";
import {
  trendingMovies,
  newReleases,
  recommended,
  allContent,
} from "./data/moviesData";

import Locker from "./components/Locker";
import DownloadLocker from "./components/DownloadLocker";
import DownloadPage from "./components/DownloadPage";
import DetailPage from "./components/DetailPage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Footer from "./components/Footer";
import SignUpModal from "./components/SignUpModal";
import AccessPromptModal from "./components/AccessPromptModal";
import TutorialModal from "./components/TutorialModal";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [detail, setDetail] = useState(null);
  const [showLocker, setShowLocker] = useState(false);
  const [showDownloadLocker, setShowDownloadLocker] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [showAccessPrompt, setShowAccessPrompt] = useState(false);
  const [step, setStep] = useState("prompt");

  const [isTikTokBrowser, setIsTikTokBrowser] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const ua = (navigator.userAgent || "").toLowerCase();

    const isTikTok =
      ua.includes("tiktok") ||
      ua.includes("bytedance") ||
      ua.includes("musical_ly") ||
      ua.includes("aweme");

    setIsTikTokBrowser(isTikTok);
    setChecked(true);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openDetail = (idOrContent) => {
    const content =
      typeof idOrContent === "number"
        ? allContent.find((c) => c.id === idOrContent)
        : idOrContent;

    if (content) {
      setDetail(content);
      setPage("detail");
      window.scrollTo(0, 0);
    }
  };

  const openDownloadLocker = (platform) => {
    setSelectedPlatform(platform);
    setShowDownloadLocker(true);
  };

  if (!checked) return null;

  // 👉 ONLY SHOW GIF IF TIKTOK
  if (isTikTokBrowser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <img
          src="/images/browser/5.gif"
          alt="Open in browser"
          style={{
            width: "300px",
            maxWidth: "90%",
          }}
        />
      </div>
    );
  }

  // 👉 NORMAL WEBSITE
  return (
    <div className="min-h-screen bg-[#050510] relative">
      <Navbar />
      {page === "detail" && detail ? (
        <DetailPage
          content={detail}
          onBack={() => {
            setDetail(null);
            setPage("home");
            window.scrollTo(0, 0);
          }}
          onPlay={() => {
            setStep("prompt");
            setShowAccessPrompt(true);
          }}
          onOpenDetail={openDetail}
        />
      ) : page === "download" ? (
        <DownloadPage
          onBackHome={() => {
            setPage("home");
            window.scrollTo(0, 0);
          }}
          onSelectPlatform={openDownloadLocker}
        />
      ) : (
        <>
          <Navbar
            scrolled={scrolled}
            onSignUp={() => setShowSignUp(true)}
            onDownloadApp={() => {
              setPage("download");
              window.scrollTo(0, 0);
            }}
          />

          <Hero onOpenDetail={openDetail} />

          <Section
            title="🔥 Trending Now"
            items={trendingMovies}
            onOpenDetail={openDetail}
            onClickSeeAll={() => setShowLocker(true)}
          />

          <Section
            title="🎬 New Releases"
            items={newReleases}
            onOpenDetail={openDetail}
            onClickSeeAll={() => setShowLocker(true)}
          />

          <Section
            title="⭐ Recommended"
            items={recommended}
            onOpenDetail={openDetail}
            onClickSeeAll={() => setShowLocker(true)}
          />

          <Footer />
        </>
      )}

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onLocker={() => {
            setShowSignUp(false);
            setShowLocker(true);
          }}
        />
      )}
      {showAccessPrompt && (
        <AccessPromptModal
          title={detail.title}
          backdrop={detail.backdrop}
          poster={detail.poster}
          onClose={() => setShowAccessPrompt(false)}
          onContinue={() => setStep("tutorial")}
        />
      )}

      {showLocker && <Locker onClose={() => setShowLocker(false)} />}

      {showAccessPrompt && step === "prompt" && (
        <AccessPromptModal
          title={detail.title}
          backdrop={detail.backdrop}
          poster={detail.poster}
          onClose={() => setShowAccessPrompt(false)}
          onContinue={() => setStep("tutorial")}
        />
      )}
      {showAccessPrompt && step === "tutorial" && (
        <TutorialModal
          onFinish={() => {
            setShowAccessPrompt(false);
            setShowLocker(true);
          }}
        />
      )}
    </div>
  );
}
