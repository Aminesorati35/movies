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

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [detail, setDetail] = useState(null);
  const [showLocker, setShowLocker] = useState(false);
  const [showDownloadLocker, setShowDownloadLocker] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedPlatform, setSelectedPlatform] = useState("");

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

  return (
    <div className="min-h-screen bg-[#050510] relative">
      {page === "detail" && detail ? (
        <DetailPage
          content={detail}
          onBack={() => {
            setDetail(null);
            setPage("home");
            window.scrollTo(0, 0);
          }}
          onPlay={() => setShowLocker(true)}
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
          />

          <Section
            title="🎬 New Releases"
            items={newReleases}
            onOpenDetail={openDetail}
          />

          <Section
            title="⭐ Recommended"
            items={recommended}
            onOpenDetail={openDetail}
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

      {showLocker && <Locker onClose={() => setShowLocker(false)} />}

      {showDownloadLocker && (
        <DownloadLocker
          platform={selectedPlatform}
          onClose={() => setShowDownloadLocker(false)}
        />
      )}
    </div>
  );
}