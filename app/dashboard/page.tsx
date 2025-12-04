"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/app/data/questions";
import { getSubjectProgress } from "@/app/utils/progress";
// ✅ 引入清除歷史的工具 (如果你的 storage.ts 沒這函式，請看下方補充)
import { clearHistory } from "@/app/utils/storage"; 

const WORLDS = [
  { 
    id: "grass", 
    label: "Plains", 
    difficulty: "Easy",
    stars: 1, 
    gradeText: "Grade 6",
    icon: "🌾", 
    bg: "bg-lime-600", 
    border: "border-lime-800", 
    desc: "Peaceful lands. Good for beginners." 
  },
  { 
    id: "forest", 
    label: "Forest", 
    difficulty: "Normal",
    stars: 2, 
    gradeText: "Grade 7",
    icon: "🌲", 
    bg: "bg-green-700", 
    border: "border-green-900", 
    desc: "Dense trees. Watch out for shadows." 
  },
  { 
    id: "desert", 
    label: "Desert", 
    difficulty: "Hard",
    stars: 3, 
    gradeText: "Grade 8",
    icon: "🌵", 
    bg: "bg-yellow-600", 
    border: "border-yellow-800", 
    desc: "Harsh environment. Survival mode." 
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Player");
  const [stats, setStats] = useState<Record<string, { total: number; percentage: number; subjects: string[] }>>({});

  // 🔄 讀取資料的函式 (獨立出來，方便重置後呼叫)
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

  // 🗑️ 處理重置進度
  const handleReset = () => {
    if (confirm("⚠️ Are you sure you want to delete all progress? This cannot be undone!")) {
      clearHistory(); // 清除 localStorage
      loadData();     // 重新讀取介面 (會變回 0%)
      alert("World reset successfully!");
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch(subject) {
      case 'math': return '📐';
      case 'bio': return '🧬';
      case 'chem': return '⚗️';
      default: return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6 font-mono flex flex-col items-center">
      
      <div className="text-center mb-10 mt-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-200 drop-shadow-[4px_4px_0_#000] tracking-widest uppercase">
          Select World
        </h1>
        <p className="text-yellow-400 mt-2 text-lg font-bold drop-shadow-md">
          Welcome back, {username}!
        </p>
        <p className="text-gray-400 mt-1 text-sm md:text-base">
          Choose a biome to start your adventure
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-6">
        {WORLDS.map((world) => {
          const stat = stats[world.id] || { total: 0, percentage: 0, subjects: [] };

          return (
            <button
              key={world.id}
              onClick={() => router.push(`/quiz/${world.id}`)}
              className="group relative w-full bg-[#2c2c2c] border-4 border-gray-500 hover:border-white transition-all duration-100 ease-in-out p-4 flex flex-col md:flex-row items-center md:items-start text-left active:scale-[0.98]"
            >
              <div className={`w-24 h-24 md:w-28 md:h-28 ${world.bg} border-4 ${world.border} flex flex-col items-center justify-center shadow-inner mb-4 md:mb-0 md:mr-6 shrink-0 relative`}>
                <span className="text-4xl mb-1">{world.icon}</span>
                <div className={`absolute -top-3 -right-3 border-2 border-white text-xs font-bold px-2 py-0.5 rounded shadow-lg transform rotate-12
                  ${world.difficulty === 'Hard' ? 'bg-red-600' : world.difficulty === 'Normal' ? 'bg-blue-600' : 'bg-green-600'}
                `}>
                   {world.difficulty}
                </div>
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-200 group-hover:text-yellow-400 transition-colors uppercase drop-shadow-md">
                    {world.label}
                  </h2>
                  <div className="flex gap-1 text-yellow-500 text-lg">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={i < world.stars ? "opacity-100" : "opacity-20 grayscale"}>★</span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-400 text-sm border-b border-gray-600 pb-2">{world.desc}</p>

                <div className="relative w-full h-4 bg-black border-2 border-gray-600 rounded-none mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-lime-500 transition-all duration-1000 ease-out"
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20"></div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex gap-2">
                    {stat.subjects.length > 0 ? (
                      stat.subjects.map(sub => (
                        <span key={sub} className="px-2 py-0.5 bg-gray-700 rounded text-[10px] md:text-xs text-gray-200 border border-gray-600 flex items-center gap-1">
                          {getSubjectIcon(sub)} {sub.toUpperCase()}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-600">No Data</span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-green-400 font-bold">
                     XP: {stat.percentage}%
                  </span>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center h-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-green-400 text-3xl">▶</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-3xl mt-8 flex flex-col md:flex-row gap-4 justify-center">
        {/* 分析按鈕 */}
        <button
          onClick={() => router.push('/analysis')}
          className="flex-1 px-8 py-4 bg-indigo-600 border-b-4 border-indigo-800 hover:bg-indigo-500 active:border-b-0 active:translate-y-1 text-white font-bold rounded transition-all flex items-center justify-center gap-3 shadow-lg group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">📊</span>
          <span className="uppercase tracking-wider">Stats</span>
        </button>

        {/* 🗑️ 重置按鈕 (新增) */}
        <button
          onClick={handleReset}
          className="px-8 py-4 bg-red-700 border-b-4 border-red-900 hover:bg-red-600 active:border-b-0 active:translate-y-1 text-white font-bold rounded transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <span>🗑️</span>
          <span className="uppercase tracking-wider">Reset</span>
        </button>
      </div>

      <div className="mt-12 text-gray-600 text-xs text-center font-sans">
        Minecraft Learning Edition v1.5 <br />
        Saved Progress & Skill Analysis Included
      </div>
    </div>
  );
}