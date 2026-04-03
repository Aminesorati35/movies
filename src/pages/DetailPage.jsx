import { useEffect, useRef, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useParams, useNavigate } from "react-router-dom";
import { allContent, PLACEHOLDER } from "../data/moviesData";
import { Back, Play, Star, X } from "../components/icons/Icons";
import MovieCard from "../components/MovieCard";
import Locker from "../components/Locker";
import AccessPromptModal from "../components/AccessPromptModal";

export default function DetailPage() {
  const { slug } = useParams();

  const id = Number(slug.split("-").pop());

  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [season, setSeason] = useState(1);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showAccessPrompt, setShowAccessPrompt] = useState(false);
  const [hasTriggeredGate, setHasTriggeredGate] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showLocker, setShowLocker] = useState(false);
  const [isLockerLoading, setIsLockerLoading] = useState(false);

  const content = allContent.find((c) => c.id === Number(id));

  const videoSrc = content.videoUrl || content.trailerUrl;
useEffect(() => {
  const preventScroll = (e) => e.preventDefault();

  if (showAccessPrompt || showLocker) {
    // 🔒 منع scroll
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // 🔒 منع touch (mobile)
    document.addEventListener("touchmove", preventScroll, {
      passive: false,
    });
  } else {
    // 🔓 رجوع scroll
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }

  return () => {
    // 🔄 cleanup مهم بزاف
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    document.removeEventListener("touchmove", preventScroll);
  };
}, [showAccessPrompt, showLocker]);

  if (!content) {
    return (
      <div className="min-h-screen bg-[#050510] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">Content not found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl font-semibold"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  const episodeCount =
    content.type === "tv" && content.episodesPerSeason
      ? content.episodesPerSeason[season - 1]
      : 0;

  const similar = allContent
    .filter(
      (c) =>
        c.id !== content.id &&
        c.genres?.some((g) => content.genres?.includes(g)),
    )
    .slice(0, 6);

  const handlePlay = () => {
    if (!videoSrc) {
      setIsLockerLoading(true);

      setTimeout(() => {
        setIsLockerLoading(false);
        setShowAccessPrompt(true);
      }, 5000);

      return;
    }

    setIsPlayingTrailer(true);
    setIsVideoReady(false);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || hasTriggeredGate) return;

    if (videoRef.current.currentTime >= 10) {
      videoRef.current.pause();
      setHasTriggeredGate(true);
      setShowLocker(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] relative">
      <button
        onClick={() => navigate("/")}
        className="fixed top-5 left-5 z-50 w-11 h-11 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all cursor-pointer"
      >
        <Back />
      </button>

      <div className="relative w-full pt-20 px-3 md:px-6">
        <div
          className="relative w-[100%] max-w-7xl mx-auto overflow-hidden rounded-2xl border border-blue-400/40 bg-black  before:pointer-events-none"
        >
          <div className="aspect-video w-full relative  bg-black ">
            {isPlayingTrailer && videoSrc && (
              <div
                className={`absolute inset-0 transition-opacity duration-300  ${
                  isVideoReady ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <VideoPlayer
                  src={videoSrc}
                  poster={content.backdrop || content.poster}
                  gateTime={10}
                  onReady={() => setIsVideoReady(true)}
                  onReachGateTime={() => {
                    setShowAccessPrompt(true);
                  }}
                />
              </div>
            )}

            {(!isPlayingTrailer || !isVideoReady) && (
              <>
                <img
                  src={content.backdrop || content.poster}
                  alt={content.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = PLACEHOLDER;
                  }}
                />

                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 flex items-center justify-center">
                  {!isPlayingTrailer && !isLockerLoading ? (
                    <button
                      onClick={handlePlay}
                      className="group flex flex-col items-center gap-3 cursor-pointer"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-2 border-white/20 pl-1 bg-indigo-500/80">
                        <Play size={60} />
                      </div>

                      <span className="text-white text-sm font-bold tracking-wide">
                        Watch Now
                      </span>
                    </button>
                  ) : isLockerLoading ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 border-4 border-white/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    </div>
                  ) : !isVideoReady ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 border-4 border-white/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    </div>
                  ) : null}
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      <div className="px-6 md:px-14 pt-8 pb-20">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="relative flex-shrink-0 w-36 md:w-48 mx-auto md:mx-0">
            <img
              src={content.poster}
              alt={content.title}
              className="w-full rounded-2xl shadow-2xl border border-white/10"
              style={{ aspectRatio: "2/3", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = PLACEHOLDER;
              }}
            />
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
                  className="group flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/8 cursor-pointer hover:border-indigo-500/40 hover:bg-white/5 transition-all"
                >
                  <div className="relative w-28 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-black/40">
                    <img
                      src={content.poster}
                      alt=""
                      className="w-full h-full object-cover opacity-50"
                      onError={(e) => {
                        e.target.src = PLACEHOLDER;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 transition-all duration-200 group-hover:scale-110 pl-0.5"
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
                    <p className="text-white/30 text-xs mt-0.5">~24 min</p>
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
      {showAccessPrompt && (
  <AccessPromptModal
    title={content.title}
    backdrop={content.backdrop}
    poster={content.poster}
    onClose={() => setShowAccessPrompt(false)}
    onContinue={() => {
      setShowAccessPrompt(false);
      setShowLocker(true);
    }}
  />
)} 
{showLocker && <Locker/>}
    </div>
    
  );
}
