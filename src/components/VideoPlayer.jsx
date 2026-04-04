import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer({
  src,
  poster,
  gateTime = 10, // هاد 10 هي اللي غايوقف عندها
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
        poster: poster || "",
        sources: [{ src, type: "video/mp4" }],
        controlBar: {
          // هادي اختيارية: كتحيد الامكانية ديال السير (Seek) باش ما ينقزش المستخدم فوق 10 ثواني
          progressControl: true 
        }
      }));

      // --- 1. الخدعة ديال الوقت (Fake Duration) ---
      const FAKE_DURATION = 7200; // ساعتين بالثواني

      player.duration = function() {
        return FAKE_DURATION;
      };

      player.on("loadedmetadata", () => {
        player.trigger("durationchange");
      });

      // --- 2. التحكم في التايملاين والـ Modal ---
      player.on("timeupdate", () => {
        const currentTime = player.currentTime() || 0;

        // ملي يوصل لـ 10 ثواني (المدة الحقيقية للفيديو أو الـ Gate)
        if (currentTime >= gateTime) {
          player.pause();
          // كنزيدو هاد السطر باش النقطة ديال الفيديو تبقى واقفة فـ 10 ثواني بالظبط
          player.currentTime(gateTime); 
          
          // عيط على المودال في DetailPage
          if (onReachGateTime) {
            onReachGateTime();
          }
        }
      });

      player.on("loadeddata", () => {
        onReady?.();
      });

    } else {
      const player = playerRef.current;
      player.src([{ src, type: "video/mp4" }]);
      player.load();
    }
  }, [src, poster, gateTime]);

  // Cleanup
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