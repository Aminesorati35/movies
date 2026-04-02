import { useEffect, useState } from "react";
import {
  trendingMovies,
  newReleases,
  recommended,
  allContent,
} from "./data/moviesData";

import Locker from "./components/Locker";
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
  const [showSignUp, setShowSignUp] = useState(false);

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
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] relative">
      {detail ? (
        <DetailPage
          content={detail}
          onBack={() => {
            setDetail(null);
            window.scrollTo(0, 0);
          }}
          onPlay={() => setShowLocker(true)}
          onOpenDetail={openDetail}
        />
      ) : (
        <>
          <Navbar scrolled={scrolled} onSignUp={() => setShowSignUp(true)} />
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
    </div>
  );
}
