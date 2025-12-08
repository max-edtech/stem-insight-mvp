"use client";

import { useState, useEffect, useRef, memo } from "react";

interface BackgroundMusicProps {
  src: string;
}

// 🌍 全域變數：用來記錄「使用者是否已經跟網站互動過」
// 只要在任何一頁點過一次，這個就會變成 true，之後換頁就不會被擋
let hasUserInteractedGlobal = false;

const BackgroundMusic = memo(function BackgroundMusic({ src }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 建立音頻物件
    const audio = new Audio(src);
    audio.loop = true; 
    audio.volume = 0.3; 
    audioRef.current = audio;

    // 播放邏輯
    const tryToPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err: any) {
        // 如果是 AbortError (正常的切換中斷) -> 忽略
        // 如果是 NotAllowedError (瀏覽器阻擋) -> 等待點擊
        if (err.name !== "AbortError") {
          console.log("Autoplay waiting for interaction...");
          setIsPlaying(false);
        }
      }
    };

    // 解鎖邏輯
    const unlockAudio = () => {
      hasUserInteractedGlobal = true; // 📝 標記：使用者已經互動過了
      tryToPlay();
    };

    // 判斷是否可以直接播
    if (hasUserInteractedGlobal) {
      // 如果之前已經互動過 (例如在登入頁點過)，直接播！
      tryToPlay();
    } else {
      // 如果是第一次來，掛上監聽器等待點擊
      window.addEventListener('click', unlockAudio);
      window.addEventListener('keydown', unlockAudio);
    }

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  // 手動開關
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // 手動點擊開關也算是一種互動
      hasUserInteractedGlobal = true; 
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
         // ignore
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={(e) => {
            e.stopPropagation();
            togglePlay();
        }}
        className="bg-black/80 border border-cyan-500 text-cyan-400 p-3 rounded-full hover:bg-cyan-900/50 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] group"
      >
        {isPlaying ? (
           <span className="group-hover:animate-pulse">🔊</span>
        ) : (
           <span className="opacity-50">🔇</span>
        )}
      </button>
    </div>
  );
});

export default BackgroundMusic;