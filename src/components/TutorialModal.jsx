import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";

export default function TutorialModal({ onFinish }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      // Small delay so the play button fades out before controls appear
      setTimeout(() => setShowControls(true), 400);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-[400px] rounded-xl overflow-hidden shadow-2xl border-2 border-amber-300 flex flex-col"
          style={{ height: "min(90vh, 850px)" }}
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* VIDEO */}
          <div className="w-full flex-1 bg-black relative" style={{ minHeight: 0 }}>
            <video
              ref={videoRef}
              src="/videos/howto.mp4"
              controls={showControls}
              className="w-full h-full object-cover"
              onEnded={() => {
                setIsPlaying(false);
                setShowControls(false);
              }}
            />

            {/* Centered Play Button Overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Play video"
                >
                  {/* Dark overlay behind button */}
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Play button circle */}
                  <motion.div
                    className="relative z-10 w-20 h-20 rounded-full bg-amber-400/90 flex items-center justify-center shadow-2xl border-2 border-white/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Play triangle */}
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* TEXT */}
          <div className="p-4 text-center flex-shrink-0">
            <p className="text-white text-sm mb-4">
              Follow the steps in this video to complete the offer and unlock the content.
            </p>

            <button
              onClick={onFinish}
              className="w-full bg-[#b7a507] hover:bg-[#c7b50c] text-white py-3 rounded-lg font-semibold cursor-pointer"
            >
              Continue ➞
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}