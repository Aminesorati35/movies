import { useEffect, useState } from "react";
import {
  trendingMovies,
  newReleases,
  recommended,
  animes,
} from "../data/moviesData";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Footer from "../components/Footer";
import SignUpModal from "../components/SignUpModal";
import Locker from "../components/Locker";

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLocker, setShowLocker] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] relative">
      <Navbar scrolled={scrolled} onSignUp={() => setShowSignUp(true)} />

      <Hero />

      <Section
        title="🔥 Trending Now"
        items={trendingMovies}
        onClickSeeAll={() => navigate("/category/trending")}
      />

      <Section
        title="🎬 New Releases"
        items={newReleases}
        onClickSeeAll={() => navigate("/category/new")}
      />

      <Section
        title="⭐ Recommended"
        items={recommended}
        onClickSeeAll={() => navigate("/category/recommended")}
      />

      <Section
        title="Animes Recommended"
        items={animes.slice(0, 6)}
        onClickSeeAll={() => navigate("/category/anime")}
      />

      <Footer />

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
