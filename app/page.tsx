"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [splashText, setSplashText] = useState("Now with Biology!");

  // 隨機跳動文字 (Minecraft 經典彩蛋)
  useEffect(() => {
    const splashes = [
      "Now with Biology!",
      "Math is cool!",
      "Creeper? Aww man!",
      "Grade 7 Ready!",
      "Don't dig straight down!",
      "100% Learning!",
      "JavaScript inside!",
      "Also try Terraria!"
    ];
    setSplashText(splashes[Math.floor(Math.random() * splashes.length)]);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    
    // 💾 1. 簡單把名字存起來 (MVP 做法)
    localStorage.setItem("username", username);

    // ⏳ 2. 假裝讀取中 (增加儀式感)
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    // 🌌 背景：使用深色或你可以找一張 Minecraft 全景圖當 background-image
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] relative overflow-hidden font-mono text-white">
      
      {/* 背景裝飾 (模糊的方塊感) */}
      <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/minecraft-bg.jpg')] bg-cover bg-center opacity-40 blur-sm pointer-events-none"></div>

      {/* 🧊 主標題區域 */}
      <div className="relative z-10 text-center mb-12">
        {/* Minecraft 風格標題 (用 CSS 陰影模擬立體感) */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#bfbfbf] drop-shadow-[4px_4px_0_#3f3f3f]"
            style={{ textShadow: "4px 4px 0px #3f3f3f, 6px 6px 0px #000" }}>
          STEM <span className="text-white">INSIGHT</span>
        </h1>

        {/* 🌟 黃色跳動文字 (Splash Text) */}
        <div className="absolute -bottom-8 -right-4 md:-right-10 text-yellow-400 text-sm md:text-xl font-bold rotate-[-20deg] animate-bounce drop-shadow-md whitespace-nowrap">
          {splashText}
        </div>
      </div>

      {/* 📦 登入表單 (選單風格) */}
      <div className="relative z-10 w-full max-w-sm space-y-4">
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* 輸入框 */}
          <div className="space-y-1">
            <label className="text-gray-400 text-xs uppercase tracking-widest pl-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Steve / Alex"
              className="w-full bg-black/50 border-2 border-[#a0a0a0] text-white p-3 focus:border-white focus:bg-black/70 outline-none text-center font-bold text-lg placeholder-gray-600"
              autoFocus
            />
          </div>

          {/* 按鈕區域 */}
          <div className="space-y-3 mt-4">
            <button
              type="submit"
              disabled={!username.trim() || isLoading}
              className={`w-full p-4 border-2 text-white font-bold text-lg uppercase tracking-wider shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-1 transition-all
                ${!username.trim() 
                  ? "bg-gray-600 border-gray-800 text-gray-400 cursor-not-allowed" 
                  : "bg-[#3c8527] border-[#2a641c] hover:bg-[#4ca034]" // 綠色按鈕
                }
              `}
            >
              {isLoading ? "Loading World..." : "Singleplayer"}
            </button>

            {/* 裝飾用按鈕 (假的) */}
            <button
              type="button"
              className="w-full p-4 bg-[#585858] border-2 border-[#3a3a3a] text-gray-300 font-bold text-lg uppercase tracking-wider shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.5)] hover:bg-[#686868] active:shadow-none active:translate-y-1 transition-all"
              onClick={() => alert("Multiplayer coming soon in v2.0!")}
            >
              Multiplayer
            </button>

            <div className="flex gap-3">
              <button type="button" className="flex-1 p-3 bg-[#585858] border-2 border-[#3a3a3a] text-gray-300 font-bold shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.5)] hover:bg-[#686868]">
                Options...
              </button>
              <button type="button" className="flex-1 p-3 bg-[#585858] border-2 border-[#3a3a3a] text-gray-300 font-bold shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.5)] hover:bg-[#686868]">
                Quit Game
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 底部版權 */}
      <div className="absolute bottom-4 text-white text-xs opacity-60">
        Copyright Mojang AB. Do not distribute! (Just kidding, it's STEM Insight)
      </div>
    </div>
  );
}