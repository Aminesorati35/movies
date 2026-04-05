import { useParams } from "react-router-dom";
import {
  trendingMovies,
  newReleases,
  recommended,
  animes,
} from "../data/moviesData";

import MovieCard from "../components/MovieCard";
import BackButton from "../components/BackButton";

export default function AllPage() {
  const { type } = useParams();

  let data = [];
  let title = "";

  switch (type) {
    case "trending":
      data = trendingMovies;
      title = "🔥 Trending Now";
      break;
    case "new":
      data = newReleases;
      title = "🎬 New Releases";
      break;
    case "recommended":
      data = recommended;
      title = "⭐ Recommended";
      break;
    case "anime":
      data = animes;
      title = "🎌 Animes";
      break;
    default:
      data = [];
      title = "Not Found";
  }

  return (
    <div className="px-6 md:px-12 py-10">
        <BackButton/>
      <h1 className="text-white text-2xl font-bold mb-6 mt-30">{title}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {data.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}