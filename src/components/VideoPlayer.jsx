import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./VideoPlayer.css"

export default function VideoPlayer({
  src,
  poster,
  gateTime = 10,
  onReachGateTime,
  onReady,
  className = "",
}) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const hasTriggeredGateRef = useRef(false);
  const hasCalledReadyRef = useRef(false);
  const gateCallbackRef = useRef(onReachGateTime);
  const readyCallbackRef = useRef(onReady);

  useEffect(() => {
    gateCallbackRef.current = onReachGateTime;
  }, [onReachGateTime]);

  useEffect(() => {
    readyCallbackRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!containerRef.current || !src) return;

    hasTriggeredGateRef.current = false;
    hasCalledReadyRef.current = false;

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.className = `video-js vjs-big-play-centered beflix-player ${className}`;

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: true,
        preload: "auto",
        responsive: true,
        fill: true,
        poster: poster || "",
        sources: [
          {
            src,
            type: "video/mp4",
          },
        ],
        controlBar: {
          volumePanel: {
            inline: true,
          },
        },
      }));

      player.on("loadeddata", () => {
        if (!hasCalledReadyRef.current) {
          hasCalledReadyRef.current = true;
          readyCallbackRef.current?.();
        }
      });

      player.on("canplay", () => {
        if (!hasCalledReadyRef.current) {
          hasCalledReadyRef.current = true;
          readyCallbackRef.current?.();
        }
      });

      player.on("timeupdate", () => {
        if (hasTriggeredGateRef.current) return;

        const currentTime = player.currentTime() || 0;
        if (currentTime >= gateTime) {
          hasTriggeredGateRef.current = true;
          player.pause();
          gateCallbackRef.current?.();
        }
      });

      player.on("error", () => {
        console.log("Video.js error:", player.error());
      });
    } else {
      const player = playerRef.current;
      player.poster(poster || "");
      player.src([
        {
          src,
          type: "video/mp4",
        },
      ]);
      player.load();
      player.play().catch((err) => {
        console.log("play error:", err);
      });
    }
  }, [src, poster, gateTime, className]);

  useEffect(() => {
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full overflow-hidden rounded-2xl bg-black ">
      <div data-vjs-player className="w-full h-full ">
        <div ref={containerRef} className="w-full h-full " />
      </div>
    </div>
  );
}