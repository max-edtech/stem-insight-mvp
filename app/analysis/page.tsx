"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredSubjectStats } from "@/app/utils/storage";
// ✅ 1. 引入聲音組件
import BackgroundMusic from "@/app/components/BackgroundMusic";
import useSound from "@/app/hooks/useSound";

const SUBJECTS = ['math', 'bio', 'chem', 'physics'];

const getStatus = (percent: number) => {
  if (percent >= 80) return { label: "OPTIMAL", color: "text-green-400", border: "border-green-500", bg: "bg-green-500" };
  if (percent >= 60) return { label: "STABLE", color: "text-cyan-400", border: "border-cyan-500", bg: "bg-cyan-500" };
  if (percent >= 40) return { label: "WARNING", color: "text-yellow-400", border: "border-yellow-500", bg: "bg-yellow-500" };
  return { label: "CRITICAL", color: "text-red-500", border: "border-red-500", bg: "bg-red-500" };
};

export default function AnalysisPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Unknown Student");
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ 2. 註冊點擊音效
  const playClick = useSound('/sounds/click.mp3');
  
  const [briefing, setBriefing] = useState<{
    weakest: string;
    strongest: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);

    const computedStats = SUBJECTS.map(sub => {
      const data = getStoredSubjectStats(sub);
      const percent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
      return {
        id: sub,
        label: sub.charAt(0).toUpperCase() + sub.slice(1), 
        total: data.total,
        correct: data.correct,
        percent: percent,
        status: getStatus(percent)
      };
    });

    setStats(computedStats);

    const activeStats = computedStats.filter(s => s.total > 0);
    
    if (activeStats.length > 0) {
      const sorted = [...activeStats].sort((a, b) => b.percent - a.percent);
      const strongest = sorted[0];
      const weakest = sorted[sorted.length - 1];

      setBriefing({
        strongest: strongest.label,
        weakest: weakest.label,
        message: weakest.percent < 60 
          ? `Priority Alert: ${weakest.label} proficiency is below threshold. Recommended immediate review in Simulation Mode.` 
          : `Performance is stable. Maintain current training intensity on ${strongest.label} and improve consistency.`
      });
    } else {
      setBriefing(null);
    }

    setLoading(false);
  }, []);

  const handleReset = () => {
    playClick(); // 播放音效
    if(confirm("⚠️ AUTHORIZATION REQUIRED: Purge all student records?")){
        localStorage.removeItem("subject_stats");
        window.location.reload();
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-mono flex flex-col items-center relative overflow-hidden">
      
      {/* ✅ 3. 放入背景音樂 (這裡使用 Lobby 的音樂，比較適合看報告) */}
      <BackgroundMusic src="/sounds/bgm_lobby.mp3" />

      {/* 背景裝飾 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.5)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none"></div>
      
      {/* 頂部導航 */}
      <div className="z-10 w-full max-w-5xl flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
        <button 
          onClick={() => { playClick(); router.push('/dashboard'); }} 
          className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors px-4 py-2 border border-transparent hover:border-gray-700 rounded"
        >
          <span>◀</span> BACK TO LOBBY
        </button>
        <div className="text-right">
           <div className="text-xs text-gray-500 tracking-[0.3em] uppercase">Student Profile</div>
           <div className="text-xl font-bold text-cyan-400 tracking-wider">{username}</div>
        </div>
      </div>

      <div className="z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 左側：數據總覽 */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📊</span>
              <h2 className="text-xl font-bold tracking-widest text-white">PROFICIENCY METRICS</h2>
           </div>

           {loading ? (
             <div className="text-center py-20 text-gray-500 animate-pulse">ANALYZING RECORDS...</div>
           ) : (
             <div className="grid gap-5">
               {stats.map((stat) => (
                 <div key={stat.id} className="group relative bg-gray-900/40 border border-gray-800 p-5 rounded-lg hover:border-gray-600 transition-all">
                    <div className="flex justify-between items-start mb-3">
                       <div>
                          <div className="flex items-center gap-3">
                             <span className="text-lg font-bold text-gray-200">{stat.label}</span>
                             <span className={`text-[10px] px-2 py-0.5 rounded border ${stat.status.border} ${stat.status.color} bg-opacity-10 ${stat.status.bg}`}>
                                {stat.status.label}
                             </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Samples: {stat.total} | Correct: {stat.correct}</div>
                       </div>
                       <div className={`text-2xl font-bold font-mono ${stat.status.color}`}>
                          {stat.percent}%
                       </div>
                    </div>

                    <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-gray-800">
                       <div 
                         className={`h-full ${stat.status.bg} shadow-[0_0_10px_currentColor] transition-all duration-1000`}
                         style={{ width: `${stat.percent}%` }}
                       ></div>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* 右側：戰術簡報 */}
        <div className="lg:col-span-1 space-y-6">
           
           <div className="bg-black/60 border-2 border-cyan-900/50 p-6 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-20">
                 <svg className="w-20 h-20 text-cyan-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-4">IDENTIFICATION</h3>
              <div className="space-y-2">
                 <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-500 text-sm">Codename</span>
                    <span className="text-white font-mono">{username}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-500 text-sm">Class Rank</span>
                    <span className="text-purple-400 font-mono">Cadet</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-500 text-sm">Status</span>
                    <span className="text-green-400 font-mono">Active</span>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900/50 border-l-4 border-yellow-500 p-6 rounded-r-lg shadow-lg relative">
              <h3 className="text-yellow-500 font-bold text-sm tracking-widest mb-3 flex items-center gap-2">
                 ⚡ TACTICAL BRIEFING
              </h3>
              
              {briefing ? (
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                     {briefing.message}
                  </p>
                  
                  {briefing.weakest && (
                    <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded">
                       <div className="text-[10px] text-red-400 uppercase mb-1">Recommended Training</div>
                       <div className="flex justify-between items-center">
                          <span className="text-white font-bold">{briefing.weakest} Simulation</span>
                          <button 
                            onClick={() => { playClick(); router.push('/quiz/forest'); }} 
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded transition-colors"
                          >
                            INITIATE
                          </button>
                       </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No simulation data available. Pending student participation.
                </p>
              )}
           </div>

           <div className="pt-8 border-t border-gray-800 text-right">
              <button 
                onClick={handleReset}
                className="text-[10px] text-red-800 hover:text-red-500 transition-colors uppercase tracking-widest border border-red-900/30 px-3 py-2 rounded hover:bg-red-900/10"
              >
                ⚠ Factory Reset Data
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}