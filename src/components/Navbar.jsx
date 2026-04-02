export default function Navbar({ scrolled, onSignUp }) {
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
          src="/logo.png"
          alt="logo"
          className="w-9 h-9 rounded-xl object-contain"
        />
        <span className="text-white font-black text-lg tracking-tight">
          WatchX
        </span>
      </div>

      <ul className="hidden md:flex gap-7 list-none">
        {["Home", "Movies", "TV Shows", "New & Popular"].map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors text-[15px]"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={onSignUp}
        className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
      >
        Sign Up
      </button>
    </nav>
  );
}