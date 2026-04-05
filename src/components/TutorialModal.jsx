import { AnimatePresence, motion } from "framer-motion";

export default function TutorialModal({ onFinish }) {
  return (
    <AnimatePresence>
      {/* Backdrop — scrollable on very small screens, centered on larger ones */}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center bg-black/90 px-4 py-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal — capped height, scrollable if content still overflows */}
        <motion.div
          className="w-full max-w-[400px] max-h-[calc(100vh-2rem)] flex flex-col rounded-xl overflow-hidden shadow-2xl border-2 border-amber-300 my-auto"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* VIDEO — height capped so text/button always stay visible */}
          <div className="w-full flex-shrink-0 bg-black">
            <video
              src="/videos/howto.mp4"
              controls
              className="w-full max-h-[55vh] object-contain"
            />
          </div>

          {/* TEXT — can scroll if space is very tight */}
          <div className="p-4 text-center overflow-y-auto flex-shrink-0 bg-neutral-900">
            <p className="text-white text-sm mb-4">
              Follow the steps in this video to complete the offer and unlock the content.
            </p>

            <button
              onClick={onFinish}
              className="w-full bg-[#b7a507] hover:bg-[#c7b50c] text-white py-3 rounded-lg font-semibold"
            >
              Continue ➞
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}