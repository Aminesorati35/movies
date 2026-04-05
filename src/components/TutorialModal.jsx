import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";

export default function TutorialModal({ onFinish }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);
  const TUTORIAL_EMBED_SRC =
  "https://player.cloudinary.com/embed/?cloud_name=dendxflaj&public_id=howto_vsrl2l";

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
            <iframe
              title="Tutorial video"
              src={TUTORIAL_EMBED_SRC}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            />            
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