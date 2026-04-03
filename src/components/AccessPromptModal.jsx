import { AnimatePresence, motion } from "framer-motion";
import { X } from "./icons/Icons";

export default function AccessPromptModal({
  title,
  backdrop,
  poster,
  onContinue,
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-[2px] px-3 sm:px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative w-[95%] sm:w-[88%] md:w-full max-w-[560px] max-h-[90vh] overflow-visible cursor-default"
          initial={{ opacity: 0, scale: 0.88, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* top icon */}
          <div className="absolute left-1/2 top-[-10px] z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none ">
            <div className="w-[90px] h-[90px] sm:w-[118px] sm:h-[118px] rounded-full bg-[#f0d400] flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] border-[5px] sm:border-[6px] border-[#f0d400]">
              <span className="text-black text-[56px] sm:text-[72px] font-black leading-none translate-y-[2px]">
                !
              </span>
            </div>
          </div>

          {/* card */}
          <div className="overflow-hidden rounded-[4px] shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-black/30 ">
            {/* image section */}
            <div className="relative min-h-[250px] sm:min-h-[290px] px-4 sm:px-6 pt-12 sm:pt-16 pb-6 sm:pb-8 text-center">
              <img
                src={backdrop || poster}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(45,0,0,0.72),rgba(0,0,0,0.72))]" />

              <div className="relative z-10">
                <h3 className="text-white text-[22px] sm:text-[28px] md:text-[34px] font-extrabold leading-tight mb-3">
                  How to Watch <span className="text-[#b7a507]">{title}</span>
                </h3>

                <p className="max-w-[500px] mx-auto text-white text-[15px] sm:text-[18px] leading-[1.7]">
                  To watch{" "}
                  <strong className="text-[#d0bf18] font-extrabold">
                    {title}
                  </strong>
                  , please complete one of the available offers. This simple
                  step grants you free access to the movie.
                </p>

                <button
                  onClick={onContinue}
                  className="mt-6 sm:mt-7 inline-flex w-full sm:w-auto items-center justify-center rounded-[10px] bg-[#b7a507] hover:bg-[#c7b50c] text-white font-semibold text-[15px] sm:text-[16px] px-5 sm:px-8 py-3 sm:py-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all cursor-pointer hover:scale-[1.02]"
                >
                  Continue to watch for FREE ➞
                </button>
              </div>
            </div>

            {/* footer */}
            <div className="bg-[#121317] px-4 sm:px-6 py-5 sm:py-7 text-center">
              <p className="text-white text-[15px] sm:text-[17px] font-extrabold mb-2 sm:mb-3">
                Quick Offer Completion!
              </p>

              <p className="text-white text-[13px] sm:text-[15px] leading-[1.8] max-w-[560px] mx-auto">
                It takes less than 1 minute to complete an offer, then you can
                enjoy Unlimited Movies & TV titles.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}