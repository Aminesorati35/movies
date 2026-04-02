import { ArrowLeft, Smartphone, Apple } from "lucide-react";

export default function DownloadPage({ onBackHome, onSelectPlatform }) {
  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8  cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[80vh]">
          <div>
            <span className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-full mb-4">
              Mobile App
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              Download the <span className="text-indigo-400">Beflix App</span>
            </h1>

            <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Watch movies and series on your phone with a fast, smooth, and
              beautiful experience. Choose your platform below to continue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onSelectPlatform("android")}
                className="group flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg cursor-pointer"
              >
                <Smartphone size={20} />
                Download for Android
              </button>

              <button
                onClick={() => onSelectPlatform("ios")}
                className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-4 rounded-2xl border border-white/10 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Apple size={20} />
                Download for iOS
              </button>
            </div>

            <div className="mt-8 text-sm text-white/35">
              Available for both Android and iPhone devices.
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-90" />
              <img
                src="https://raketcontent.com/small_movies_apk_1dd13430d4.png"
                alt="Beflix App"
                className="relative w-full max-w-[420px] object-contain drop-shadow-[0_20px_60px_rgba(99,102,241,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}