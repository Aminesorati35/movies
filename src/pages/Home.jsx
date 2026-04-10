import {
  trendingMovies,
  newReleases,
  recommended,
  animes,
} from "../data/moviesData";

import Hero from "../components/Hero";
import Section from "../components/Section";
import Footer from "../components/Footer";

export default function Home({ onStartAccessFlow }) {
  return (
    <div className="min-h-screen bg-[#050510] relative">
      <Hero />

      <Section
        title="🔥 Trending Now"
        items={trendingMovies}
        onClickSeeAll={onStartAccessFlow}
      />

      <Section
        title="🎬 New Releases"
        items={newReleases}
        onClickSeeAll={onStartAccessFlow}
      />

      <Section
        title="⭐ Recommended"
        items={recommended}
        onClickSeeAll={onStartAccessFlow}
      />

      <Section
        title="Animes Recommended"
        items={animes.slice(0, 6)}
        onClickSeeAll={onStartAccessFlow}
      />

      <Footer />
    </div>
  );
}
