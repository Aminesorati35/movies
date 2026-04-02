import { X } from "./icons/Icons";

export default function Locker({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20 px-3">
      <div
        className="
          relative
          w-[95%] md:w-[65%] lg:w-[40%]
          h-[calc(var(--vh,1vh)*90)] md:h-[85vh]
          bg-[#0b0f1a]
          rounded-2xl overflow-hidden
          border border-indigo-500/30
          shadow-[0_0_40px_rgba(0,0,0,0.45)]
        "
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all hover:scale-110"
        >
          <X />
        </button>

        <iframe
          src="https://appchecker.site/cl/i/qnn766"
          title="Locker"
          allow="fullscreen"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}