"use client";

import { useState, useRef, useEffect } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // 預設音量 30% (背景音樂不要太大聲)

  // 嘗試自動播放 (通常會被瀏覽器擋下，但若使用者剛操作過則會成功)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    
    // 監聽使用者的第一次點擊，解鎖自動播放限制
    const unlockAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // 失敗也沒關係，等待使用者手動點按鈕
        });
      }
      // 解鎖後移除監聽，避免重複觸發
      document.removeEventListener('click', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);

    return () => {
      document.removeEventListener('click', unlockAudio);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2">
      <audio ref={audioRef} src="/bgm.mp3" loop />
      
      <button
        onClick={togglePlay}
        className={`
          flex items-center justify-center w-12 h-12 
          border-4 border-black font-bold text-xl shadow-[4px_4px_0_rgba(0,0,0,0.5)]
          transition-all active:translate-y-1 active:shadow-none
          ${isPlaying ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}
          text-white
        `}
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? "♫" : "✕"}
      </button>
      
      {/* 音量提示文字 (Minecraft 風格) */}
      <div className="hidden md:block bg-black/70 text-white px-2 py-1 text-xs font-mono rounded">
        {isPlaying ? "Music ON" : "Music OFF"}
      </div>
    </div>
  );
}