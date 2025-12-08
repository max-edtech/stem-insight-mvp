"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackgroundMusic from "@/app/components/BackgroundMusic"; 
import useSound from "@/app/hooks/useSound"; 

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [splashText, setSplashText] = useState("SYSTEM READY...");

  // 音效
  const playClick = useSound('/sounds/click.mp3');

  // 1. 保留 Minecraft 的經典隨機標語 (但換成更有科技感的內容)
  useEffect(() => {
    const splashes = [
      "Now with Python!",
      "Protocol: OMEGA",
      "Hack the Planet!",
      "Grade 7 Security Cleared",
      "Don't delete system32!",
      "100% Data Sync!",
      "JavaScript Integrated",
      "Also try Cyberpunk 2077!",
      "The Cake is a Lie",
      "Wake up, Neo..."
    ];
    setSplashText(splashes[Math.floor(Math.random() * splashes.length)]);
    
    // 檢查是否有儲存的名字
    const savedName = localStorage.getItem("username");
    if (savedName) setUsername(savedName);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    playClick(); // 播放音效
    setIsLoading(true);
    
    // 儲存名字
    localStorage.setItem("username", username);

    // 模擬系統登入延遲
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    // ✨ 外層：點擊解鎖聲音 + Cyber 網格背景
    <div 
      onClick={() => {}} 
      className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden font-mono text-white cursor-pointer selection:bg-green-500 selection:text-black"
    >
      <BackgroundMusic src="/sounds/bgm_lobby.mp3" />

      {/* 背景裝飾：動態掃描線與網格 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-green-900/10 to-black pointer-events-none"></div>

      {/* 🧊 主標題區域 */}
      <div className="relative z-10 text-center mb-12 group">
        {/* 標題：TRON 風格霓虹字 */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)] animate-pulse">
          STEM <span className="text-white">INSIGHT</span>
        </h1>
        <div className="text-[10px] tracking-[0.8em] text-gray-500 mt-2 uppercase">Virtual Learning Environment v2.0</div>

        {/* 🌟 跳動文字 (Splash Text)：改成全息投影警告風格 */}
        <div className="absolute -bottom-8 -right-4 md:-right-10 transform rotate-[-10deg] animate-bounce">
           <span className="bg-yellow-400 text-black text-xs md:text-sm font-bold px-2 py-1 shadow-[0_0_15px_rgba(250,204,21,0.8)] border border-white">
             {splashText}
           </span>
        </div>
      </div>

      {/* 📦 登入表單 (Minecraft 選單佈局，但用 Cyber 材質) */}
      <div className="relative z-10 w-full max-w-sm space-y-6 p-1">
        
        {/* 輸入框 */}
        <div className="group relative">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
           <div className="relative bg-black rounded-lg p-1">
             <label className="block text-green-500 text-[10px] uppercase tracking-widest pl-2 mb-1 pt-1">Identify Yourself</label>
             <input
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="ENTER CODENAME..."
               className="w-full bg-gray-900/50 border border-gray-700 text-center text-white p-3 focus:border-green-400 outline-none font-bold text-lg tracking-wider placeholder-gray-600 rounded transition-all shadow-inner"
               autoFocus
             />
           </div>
        </div>

        {/* 按鈕區域：保留 Minecraft 的結構，但換成科技按鈕 */}
        <div className="space-y-3">
            {/* 主要按鈕 (Singleplayer -> Initialize) */}
            <button
              onClick={handleLogin}
              disabled={!username.trim() || isLoading}
              className={`w-full p-4 border border-green-500/50 text-green-400 font-bold text-lg uppercase tracking-[0.2em] transition-all duration-200 relative overflow-hidden group
                ${!username.trim() 
                  ? "opacity-50 cursor-not-allowed bg-black" 
                  : "hover:bg-green-900/20 hover:text-white hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-[0.98] bg-black/80"
                }
              `}
            >
              {/* 按鈕內的掃光特效 */}
              <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent transform skew-x-[-20deg] group-hover:animate-[shimmer_1s_infinite]"></div>
              
              <span className="relative z-10 flex items-center justify-center gap-2">
                 {isLoading ? (
                   <> <span className="animate-spin">⟳</span> ACCESSING...</>
                 ) : (
                   <> INITIALIZE SYSTEM <span className="text-xs">➜</span> </>
                 )}
              </span>
            </button>

            {/* 次要按鈕 (Multiplayer -> Network Offline) */}
            <button
              type="button"
              onClick={() => { playClick(); alert("NETWORK ERROR: SERVER OFFLINE (Coming Soon)"); }}
              className="w-full p-4 border border-gray-700 text-gray-500 font-bold text-lg uppercase tracking-[0.2em] bg-black/50 hover:bg-gray-900 hover:border-gray-500 hover:text-gray-300 transition-all active:scale-[0.98]"
            >
              NETWORK LINK
            </button>

            {/* 底部小按鈕 (Options / Quit) */}
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => playClick()}
                className="flex-1 p-3 border border-gray-800 text-gray-600 text-xs font-bold uppercase hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
              >
                Config
              </button>
              <button 
                type="button" 
                onClick={() => { playClick(); window.close(); }}
                className="flex-1 p-3 border border-gray-800 text-gray-600 text-xs font-bold uppercase hover:border-red-500/50 hover:text-red-400 transition-all"
              >
                Terminate
              </button>
            </div>
        </div>
      </div>

      {/* 底部版權 */}
      <div className="absolute bottom-4 text-gray-700 text-[10px] tracking-widest uppercase">
         STEM INSIGHT // SYSTEM VER 2.1
      </div>
    </div>
  );
}