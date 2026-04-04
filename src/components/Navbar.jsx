import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ scrolled, onSignUp }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#050510]/95 backdrop-blur-lg border-b border-white/5"
          : ""
      }`}
    >
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2.5 cursor-pointer"
      >
        <img
          src="/logo.png"
          alt="logo"
          className="w-9 h-9 rounded-xl object-contain"
        />
        <span className="text-white font-bold text-lg tracking-tight">
          Beflix.online
        </span>
      </div>

      <ul className="hidden md:flex gap-7 list-none items-center">
        {[
          { label: "Home", to: "/" },
          { label: "Movies", to: "/" },
          { label: "TV Shows", to: "/" },
          { label: "New & Popular", to: "/" },
        ].map((item) => (
          <li key={item.label}>
            <button
              onClick={() => navigate(item.to)}
              className="text-white/80 hover:text-white text-sm transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {location.pathname !== "/download" && (
          <button
            onClick={() => navigate("/download")}
            className="hidden sm:inline-flex bg-white/5 hover:bg-white/10 text-white text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-all cursor-pointer"
          >
            Download App
          </button>
        )}

        <button
          onClick={onSignUp}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}