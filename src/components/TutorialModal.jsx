import { AnimatePresence, motion } from "framer-motion";

export default function TutorialModal({ onFinish }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-[400px] rounded-xl overflow-hidden shadow-2xl border-2 border-amber-300 "
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* VIDEO */}
          <div className="w-full aspect-[9/16] bg-black" >
            <video
              src="/videos/howto.mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="p-4 text-center">
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