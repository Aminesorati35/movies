export default function Footer() {
  return (
    <footer className="bg-[#07070f] border-t border-white/5 px-6 md:px-12 py-10 mt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-white font-black">WatchX</span>
          </div>

          <p className="text-white/30 text-sm leading-relaxed">
            Your ultimate destination for streaming movies and TV shows. Watch
            anywhere, anytime.
          </p>
        </div>

        {[
          {
            title: "Browse",
            links: ["Movies", "TV Shows", "New Releases", "Coming Soon"],
          },
          { title: "Help", links: ["FAQ", "Contact Us", "Terms", "Privacy"] },
          {
            title: "Account",
            links: ["My Account", "Watchlist", "Downloads", "Settings"],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-bold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/30 hover:text-white/60 text-sm transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row justify-between gap-2 text-white/20 text-xs">
        <span>© 2026 WatchX. All rights reserved.</span>
        <span>Made with ♥ for movie lovers</span>
      </div>
    </footer>
  );
}