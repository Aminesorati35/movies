import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allContent, heroMovies } from "../data/moviesData";
import { Play, Star } from "./icons/Icons";

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);
  const navigate = useNavigate();
  const m = heroMovies[idx];

  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % heroMovies.length);
        setVis(true);
      }, 600);
    }, 5500);

    return () => clearInterval(t);
  }, []);
  const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const handleClick = () => {
    const content = allContent.find((x) => x.id === m.id);
    if (content) navigate(`/${slugify(content.title)}-${content.id}`)
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <img
        src={m.backdrop}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.7s ease" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #050510 38%, rgba(5,5,16,0.5) 65%, transparent)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, #050510 0%, transparent 45%)",
        }}
      />

      <div
        className="relative z-10 px-6 md:px-16 max-w-2xl"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
          <Star /> Featured
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4 tracking-tight">
          {m.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <Star size={14} /> {m.rating}
          </span>
          <span className="text-white/25">·</span>
          <span className="text-white/50">
            {m.year} · {m.duration} · {m.genres}
          </span>
        </div>

        <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
          {m.description}
        </p>

        <button
          onClick={handleClick}
          className="flex items-center gap-3 text-white font-bold px-8 py-4 rounded-2xl transition-all text-base hover:scale-105 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            boxShadow: "0 8px 30px rgba(99,102,241,0.4)",
          }}
        >
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center pl-0.5">
            <Play size={25} />
          </div>
          Watch Now
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroMovies.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300 ${
              i === idx
                ? "w-6 h-2 bg-indigo-500"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}