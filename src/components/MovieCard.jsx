import { useNavigate } from "react-router-dom";
import { Star, Play } from "./icons/Icons";
import { PLACEHOLDER } from "../data/moviesData";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div
      onClick={() => navigate(`/${slugify(movie.title)}-${movie.id}`)}
      className="group relative rounded-xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: "2/3" }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          e.target.src = PLACEHOLDER;
        }}
      />

      <div className="absolute top-2 left-2 z-10 bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded tracking-wider">
        {movie.quality}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-300" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center border border-white/25 transition-all duration-300 group-hover:scale-110 pl-0.5"
          style={{
            background: "rgba(99,102,241,0.82)",
            boxShadow: "0 4px 24px rgba(99,102,241,0.55)",
          }}
        >
          <Play size={18} />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-3">
        <p className="text-white text-[13px] font-bold truncate mb-1">
          {movie.title}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400 flex items-center gap-0.5 text-[10px] font-semibold">
            <Star />
            {movie.rating}
          </span>
          <span className="text-white/35 text-[10px]">· {movie.year}</span>
        </div>
      </div>
    </div>
  );
}