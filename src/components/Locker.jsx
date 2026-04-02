import { X } from "./icons/Icons";

export default function Locker({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-transparent backdrop-blur-md px-2 sm:px-3">
      <div
        className="
          relative
          w-[96%] md:w-[65%] lg:w-[40%]
          h-[90vh]
          bg-[#0b0f1a]
          rounded-2xl
          overflow-hidden
          border border-indigo-500/20
          shadow-2xl
        "
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all"
        >
          <X />
        </button>

        <iframe
          src="https://appchecker.site/cl/i/qnn766"
          title="Locker"
          allow="fullscreen"
          className="w-full h-full border-0 block"
        />
      </div>
    </div>
  );
}