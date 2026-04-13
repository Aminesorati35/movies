import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allContent, PLACEHOLDER } from "../data/moviesData";
import { Play, Star } from "../components/icons/Icons";
import MovieCard from "../components/MovieCard";
import Locker from "../components/Locker";
import AccessPromptModal from "../components/AccessPromptModal";
import TutorialModal from "../components/TutorialModal";
import BackButton from "../components/BackButton";

export default function DetailPage() {
  const { slug } = useParams();
  const id = Number(slug.split("-").pop());

  const [season, setSeason] = useState(1);
  const [showAccessPrompt, setShowAccessPrompt] = useState(false);
  const [showLocker, setShowLocker] = useState(false);
  const [step, setStep] = useState("prompt");

  const content = allContent.find((c) => c.id === id);

  useEffect(() => {
    setSeason(1);
    setShowAccessPrompt(false);
    setShowLocker(false);
    setStep("prompt");
  }, [id]);

  if (!content) return null;

  const episodeCount =
    content.type === "tv" && content.episodesPerSeason
      ? content.episodesPerSeason[season - 1]
      : 0;

  const similar = allContent
    .filter(
      (c) =>
        c.id !== content.id &&
        c.type === content.type &&
        c.genres?.some((g) => content.genres?.includes(g))
    )
    .slice(0, 6);

  const handlePlay = () => {
    setStep("prompt");
    setShowAccessPrompt(true);
  };

  return (
    <div className="min-h-screen bg-[#050510]">
      <BackButton />

      <div className="relative h-[62vh] min-h-[380px]">
        <img
          src={content.backdrop || content.poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => (e.target.src = PLACEHOLDER)}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #050510 0%, rgba(5,5,16,0.55) 45%, rgba(5,5,16,0.1) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #050510 0%, transparent 55%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={handlePlay}
            className="group flex flex-col items-center gap-3 focus:outline-none cursor-pointer"
          >
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-2 border-white/20 transition-all duration-300 group-hover:scale-105 pl-1"
              style={{
                background: "rgba(99,102,241,0.78)",
                boxShadow:
                  "0 0 50px rgba(99,102,241,0.5), 0 0 100px rgba(99,102,241,0.2)",
              }}
            >
              <Play size={60} />
            </div>

            <span className="text-white text-sm font-bold tracking-wide">
              Play Now
            </span>
          </button>
        </div>
      </div>

      <div className="px-6 md:px-14 -mt-32 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div
            onClick={handlePlay}
            className="relative flex-shrink-0 w-36 md:w-48 mx-auto md:mx-0 group cursor-pointer"
          >
            <img
              src={content.poster}
              alt={content.title}
              className="w-full rounded-2xl shadow-2xl border border-white/10 transition-transform duration-300 group-hover:scale-105"
              style={{ aspectRatio: "2/3", objectFit: "cover" }}
              onError={(e) => (e.target.src = PLACEHOLDER)}
            />

            <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-white/20 pl-1">
                <Play size={24} />
              </div>
            </div>
          </div>

          <div className="flex-1 pt-2 text-center md:text-left">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-full mb-4">
              {content.type === "tv" ? "TV Series" : "Movie"}
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-none tracking-tight">
              {content.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-5 text-sm">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star size={14} /> {content.rating}
              </span>

              <span className="text-white/20">·</span>
              <span className="text-white/50">{content.year}</span>

              <span className="text-white/20">·</span>
              <span className="text-white/50">{content.duration}</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              {content.genres?.map((g) => (
                <span
                  key={g}
                  className="text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-xl">
              {content.description}
            </p>

            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-3 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-base hover:scale-105 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 8px 30px rgba(99,102,241,0.45)",
              }}
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center pl-0.5">
                <Play size={25} />
              </div>
              Watch Now
            </button>
          </div>
        </div>

        {content.type === "tv" && content.seasons && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-black">Episodes</h2>

              <select
                value={season}
                onChange={(e) => setSeason(Number(e.target.value))}
                className="bg-white/5 border border-white/10 text-white text-sm px-4 py-2 rounded-xl outline-none hover:border-indigo-500/50 cursor-pointer transition-colors"
              >
                {Array.from({ length: content.seasons }, (_, i) => (
                  <option key={i + 1} value={i + 1} className="bg-[#0d0d1a]">
                    Season {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: Math.min(episodeCount, 16) }, (_, i) => (
                <div
                  key={i}
                  onClick={handlePlay}
                  className="group flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/8 cursor-pointer hover:border-indigo-500/40 hover:bg-white/5 transition-all"
                >
                  <div className="relative w-28 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-black/40">
                    <img
                      src={content.poster}
                      alt=""
                      className="w-full h-full object-cover opacity-50"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 pl-0.5"
                        style={{ background: "rgba(99,102,241,0.85)" }}
                      >
                        <Play size={20} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-indigo-400 text-xs font-bold mb-0.5">
                      S{season} · E{i + 1}
                    </p>
                    <p className="text-white text-sm font-semibold">
                      Episode {i + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {similar.length > 0 && (
          <div>
            <h3 className="text-white text-xl font-black mb-5">
              You May Also Like
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {similar.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showAccessPrompt && step === "prompt" && (
        <AccessPromptModal
          onClose={() => {
            setShowAccessPrompt(false);
            setStep("prompt");
          }}
          onContinue={() => setStep("tutorial")}
          title={content.title}
          backdrop={content.backdrop}
          poster={content.poster}
        />
      )}

      {showAccessPrompt && step === "tutorial" && (
        <TutorialModal
          onFinish={() => {
            setShowAccessPrompt(false);
            setShowLocker(true);
            setStep("prompt");
          }}
        />
      )}

      {showLocker && <Locker />}
    </div>
  );
}
