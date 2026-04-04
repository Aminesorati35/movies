import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./VideoPlayer.css";

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

  useEffect(() => {
    if (!containerRef.current || !src) return;

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.className = `video-js beflix-player ${className}`;

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: true,
        preload: "auto",
        responsive: true,
        // ❌ مهم: ماكاينش fluid هنا
        poster: poster || "",
        sources: [{ src, type: "video/mp4" }],
      }));

      player.on("loadeddata", () => {
        onReady?.();
      });

      player.on("timeupdate", () => {
        const currentTime = player.currentTime() || 0;
        if (currentTime >= gateTime) {
          player.pause();
          onReachGateTime?.();
        }
      });
    } else {
      const player = playerRef.current;
      player.poster(poster || "");
      player.src([{ src, type: "video/mp4" }]);
      player.load();
      player.play().catch(() => {});
    }
  }, [src, poster, gateTime]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="video-wrapper">
      <div data-vjs-player className="video-inner">
        <div ref={containerRef} className="video-container" />
      </div>
    </div>
  );
}