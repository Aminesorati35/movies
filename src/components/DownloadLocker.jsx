import { motion, AnimatePresence } from "framer-motion";
import { X } from "./icons/Icons";

export default function DownloadLocker({ onClose, platform }) {
  const lockerUrl =
    platform === "ios"
      ? "https://appchecker.site/cl/i/qnn766"
      : "https://appchecker.site/cl/i/qnn766";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-transparent backdrop-blur-md px-2 sm:px-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
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
          initial={{ opacity: 0, scale: 0.88, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="absolute top-3 left-3 z-10 bg-black/30 backdrop-blur-md text-white/80 text-xs font-bold px-3 py-2 rounded-full border border-white/10">
            {platform === "ios" ? "iOS Download" : "Android Download"}
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all hover:scale-110"
          >
            <X />
          </button>

          <iframe
            src={lockerUrl}
            title="Download Locker"
            allow="fullscreen"
            className="w-full h-full border-0 block"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}