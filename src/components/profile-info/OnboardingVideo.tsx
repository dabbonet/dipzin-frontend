import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";

interface OnboardingVideoProps {
  openVideo: boolean;
  setOpenVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

const OnboardingVideo: React.FC<OnboardingVideoProps> = ({
  openVideo,
  setOpenVideo,
}) => {
  return (
    <AnimatePresence>
      {openVideo && (
        <>
          <motion.div
            className=" fixed top-0 left-0 w-full h-full backdrop-blur-md bg-slate-900/70 z-50 flex items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=NkjXFMTln5Q`}
              className="z-[400] w-3/4 h-3/4"
              controls
            />

            <motion.div
              onClick={() => setOpenVideo(false)}
              className={"w-[100%] h-[100%] fixed top-0 left-0 bg-transparent"}
            ></motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingVideo;
