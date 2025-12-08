"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/app/data/questions";
import { getSubjectProgress } from "@/app/utils/progress";
import { clearHistory } from "@/app/utils/storage";

// ✅ 1. 引入聲音組件與 Hook
import BackgroundMusic from "@/app/components/BackgroundMusic";
import useSound from "@/app/hooks/useSound";

// 定義不同世界的 "Cyber" 配色方案
const WORLDS = [
  { 
    id: "grass", 
    label: "Sector: Plains", 
    difficulty: "EASY",
    stars: 1, 
    icon: "🌾", 
    color: "green",
    themeClass: "shadow-[0_0_15px_rgba(34,197,94,0.4)] border-green-500/50 hover:border-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.7)]",
    textClass: "text-green-400",
    bgGradient: "from-green-900/20 to-transparent",
    desc: "Initial simulation sequence. Low latency." 
  },
  { 
    id: "forest", 
    label: "Sector: Forest", 
    difficulty: "NORMAL",
    stars: 2, 
    icon: "🌲", 
    color: "cyan",
    themeClass: "shadow-[0_0_15px_rgba(6,182,212,0.4)] border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.7)]",
    textClass: "text-cyan-400",
    bgGradient: "from-cyan-900/20 to-transparent",
    desc: "Complex data structures. Shadows detected." 
  },
  { 
    id: "desert", 
    label: "Sector: Desert", 
    difficulty: "HARD",
    stars: 3, 
    icon: "🌵", 
    color: "orange",
    themeClass: "shadow-[0_0_15px_rgba(249,115,22,0.4)] border-orange-500/50 hover:border-orange-400 hover:shadow-[0_0_25px_rgba(249,115,22,0.7)]",
    textClass: "text-orange-400",
    bgGradient: "from-orange-900/20 to-transparent",
    desc: "Firewall active. Survival mode engaged." 
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("User_01");
  const [stats, setStats] = useState<Record<string, { total: number; percentage: number; subjects: string[] }>>({});

  // ✅ 2. 註冊點擊音效
  const playClick = useSound('/sounds/click.mp3', 0.5);

  const loadData = () => {
    const savedName = localStorage.getItem("username");
    if (savedName) setUsername(savedName);

    const newStats: any = {};
    WORLDS.forEach((world) => {
      const progress = getSubjectProgress(world.id, 'biome');
      const worldQuestions = questions.filter(q => q.biome === world.id);
      const subjectSet = new Set(worldQuestions.map(q => q.subject));
      
      newStats[world.id] = { 
        total: progress.total, 
        percentage: progress.percentage, 
        subjects: Array.from(subjectSet) 
      };
    });
    setStats(newStats);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReset = () => {
    // ✅ 點擊時播放音效
    playClick();
    if (confirm("⚠️ SYSTEM ALERT: Wiping memory core. Confirm deletion?")) {
      clearHistory(); 
      loadData();     
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch(subject) {
      case 'math': return '📐';
      case 'bio': return '🧬';
      case 'chem': return '⚗️';
      default: return '💾';
    }
  };

  return (
    // 背景：深色 + 網格特效
    <div className="min-h-screen bg-[#050505] text-white p-6 font-mono flex flex-col items-center relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* ✅ 3. 放入大廳背景音樂 */}
      <BackgroundMusic src="/sounds/bgm_lobby.mp3" />

      {/* 裝飾性網格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.5)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0 opacity-40"></div>
      
      {/* 頂部 HUD */}
      <div className="z-10 text-center mb-10 mt-4 relative">
        <div className="inline-block border border-cyan-500/30 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full mb-4">
          <span className="text-cyan-400 text-xs tracking-[0.3em] uppercase animate-pulse">System Online</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] italic tracking-tighter">
          READY PLAYER ONE
        </h1>
        
        <p className="text-gray-400 mt-2 text-sm md:text-base font-bold tracking-widest uppercase">
          Welcome back, <span className="text-white border-b-2 border-cyan-500">{username}</span>
        </p>
      </div>

      {/* 核心卡片區域 */}
      <div className="z-10 w-full max-w-3xl space-y-6">
        {WORLDS.map((world) => {
          const stat = stats[world.id] || { total: 0, percentage: 0, subjects: [] };

          return (
            <button
              key={world.id}
              onClick={() => {
                playClick(); // ✅ 點擊時播放音效
                router.push(`/quiz/${world.id}`);
              }}
              className={`group relative w-full bg-black/60 backdrop-blur-sm border-2 transition-all duration-300 ease-out p-6 flex flex-col md:flex-row items-center md:items-start text-left hover:scale-[1.02] hover:-translate-y-1 ${world.themeClass}`}
            >
              {/* 裝飾角落線條 */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50"></div>

              {/* 左側圖標區 */}
              <div className={`w-24 h-24 rounded-lg bg-gradient-to-br ${world.bgGradient} border border-white/10 flex flex-col items-center justify-center mb-4 md:mb-0 md:mr-6 shrink-0 relative overflow-hidden group-hover:animate-pulse`}>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
                 <span className="text-4xl relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] filter grayscale group-hover:grayscale-0 transition-all">{world.icon}</span>
                 <div className={`absolute bottom-0 w-full text-center text-[10px] font-bold bg-black/80 py-1 uppercase tracking-wider ${world.textClass}`}>
                    {world.difficulty}
                 </div>
              </div>

              {/* 右側資訊區 */}
              <div className="flex-1 w-full space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className={`text-2xl font-bold tracking-widest uppercase ${world.textClass} drop-shadow-md`}>
                    {world.label}
                  </h2>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < world.stars ? world.textClass : "text-gray-800"}`}>
                        ◈
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-400 text-xs md:text-sm font-light border-l-2 border-gray-700 pl-3">
                   {world.desc}
                </p>

                {/* 科技感進度條 */}
                <div className="relative w-full h-2 bg-gray-900 rounded-full overflow-hidden mt-3 border border-gray-800">
                  <div
                    className={`h-full bg-${world.color}-500 shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out relative`}
                    style={{ width: `${stat.percentage}%` }}
                  >
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-white/50 to-transparent opacity-50"></div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between pt-1">
                  <div className="flex gap-2">
                    {stat.subjects.map(sub => (
                       <span key={sub} className="px-2 py-0.5 bg-gray-900/80 border border-gray-700 rounded text-[10px] text-gray-400 flex items-center gap-1 group-hover:border-white/30 transition-colors">
                         {getSubjectIcon(sub)} {sub.toUpperCase()}
                       </span>
                    ))}
                    {stat.subjects.length === 0 && <span className="text-[10px] text-gray-600">DATA NOT FOUND</span>}
                  </div>
                  <span className={`text-sm font-bold font-mono ${world.textClass}`}>
                      {stat.percentage}% SYNC
                  </span>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center h-full ml-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                 <span className={`${world.textClass} text-2xl`}>➜</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 底部控制區 */}
      <div className="z-10 w-full max-w-3xl mt-10 flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={() => {
            playClick(); // ✅ 點擊時播放音效
            router.push('/analysis');
          }}
          className="flex-1 px-8 py-4 bg-indigo-900/30 border border-indigo-500/50 hover:bg-indigo-600/20 hover:border-indigo-400 text-indigo-300 hover:text-white font-bold rounded uppercase tracking-widest backdrop-blur-sm transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] flex items-center justify-center gap-3"
        >
          <span className="text-xl">📊</span> ACCESS DATABASE
        </button>

        <button
          onClick={handleReset}
          className="px-8 py-4 bg-red-900/20 border border-red-800/50 hover:bg-red-900/40 hover:border-red-500 text-red-500 hover:text-red-300 font-bold rounded uppercase tracking-widest backdrop-blur-sm transition-all flex items-center justify-center gap-2"
        >
          <span>☢️</span> PURGE
        </button>
      </div>
      
      <div className="z-10 mt-12 text-gray-700 text-[10px] font-mono tracking-[0.2em] text-center">
        STEM INSIGHT // VER 2.0.45 <br/>
        NEURAL CONNECTION ESTABLISHED
      </div>
    </div>
  );
}