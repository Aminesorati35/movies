export default function Navbar({ scrolled, onSignUp, onDownloadApp }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#050510]/95 backdrop-blur-lg border-b border-white/5"
          : ""
      }`}
    >
      <div className="flex items-center gap-2.5">
        <img
          src="logo.png"
          alt="logo"
          className="w-9 h-9 rounded-xl object-contain"
        />
        <span className="text-white font-black text-lg tracking-tight">
          Beflix
        </span>
      </div>

      <ul className="hidden md:flex gap-7 list-none items-center">
        {["Home", "Movies", "TV Shows", "New & Popular"].map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-white/80 hover:text-white text-sm transition-colors"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button
          onClick={onDownloadApp}
          className="hidden sm:inline-flex bg-white/5 hover:bg-white/10 text-white text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-all cursor-pointer"
        >
          Download App
        </button>

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