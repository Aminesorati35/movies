import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { key: "home", label: "Home" },
  { key: "access", label: "Movies" },
  { key: "access", label: "TV Shows" },
  { key: "access", label: "New & Popular" },
];

export default function Navbar({
  scrolled,
  onSignUp,
  onStartAccessFlow,
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavClick = (key, e) => {
    e.preventDefault();
    if (key === "home") {
      navigate("/");
      return;
    }
    onStartAccessFlow?.();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q || !onStartAccessFlow) return;
    onStartAccessFlow();
  };

  const linkClass =
    "text-white/80 hover:text-white text-sm transition-colors cursor-pointer";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] flex flex-col transition-all duration-300 ${
        scrolled
          ? "bg-[#050510]/95 backdrop-blur-lg border-b border-white/5"
          : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-4 w-full">
        <div className="flex items-center gap-2.5">
          <img
            src="logo.png"
            alt="logo"
            className="w-9 h-9 rounded-xl object-contain"
          />
          <span className="text-white font-bold text-[19px] tracking-tight ">
            Beflix.online
          </span>
        </div>

        <ul className="hidden md:flex gap-7 list-none items-center absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ key, label }) => (
            <li key={label}>
              <a
                href={key === "home" ? "/" : "#"}
                className={linkClass}
                onClick={(e) => handleNavClick(key, e)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSignUp}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>

      

      <div className="w-full px-6 md:px-10 pb-4 flex justify-center">
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-xl flex gap-2 items-stretch"
        >
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, TV shows..."
            className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/40"
            aria-label="Search"
          />
          <button
            type="submit"
            className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
