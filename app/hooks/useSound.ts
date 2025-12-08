"use client";

export default function useSound(path: string, volume: number = 0.5) {
  // 這裡不使用 useEffect，也不使用 useRef 保存 audio 實例
  // 改用「射後不理」模式，確保每次點擊都是獨立播放，不會被頁面更新打斷

  const play = () => {
    // 建立新的 Audio 物件
    const audio = new Audio(path);
    audio.volume = volume;
    
    // 嘗試播放
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // 這裡捕捉並忽略所有播放錯誤 (包含 AbortError)
        // 這樣就不會跳出紅色的錯誤視窗
        // console.warn("Audio play error suppressed:", err);
      });
    }
  };

  return play;
}