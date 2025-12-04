import Link from "next/link";

export default function QuizMapPage() {
  return (
    <main className="min-h-screen bg-slate-900 p-8 font-sans flex flex-col items-center justify-center">
      
      {/* 1. 酷炫的大標題 */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-tight drop-shadow-2xl">
          CHOOSE YOUR BIOME
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Ready to explore? Select a region to start your math & biology challenge!
        </p>
      </div>

      {/* 2. 三張生態系卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        
        {/* 草原卡片 */}
        <Link 
          href="/quiz/grass"
          className="group relative h-96 rounded-3xl overflow-hidden border-4 border-slate-700 hover:border-green-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]"
        >
          {/* 背景色塊 (滑鼠移上去會放大) */}
          <div className="absolute inset-0 bg-[#7CBA51] group-hover:scale-110 transition-transform duration-500" />
          
          {/* 黑色遮罩 (滑鼠移上去會變亮) */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* 內容文字 */}
          <div className="relative h-full flex flex-col items-center justify-center text-white p-6 z-10">
            <span className="text-7xl mb-6 transform group-hover:scale-125 transition-transform duration-300 drop-shadow-md">🦁</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-wider drop-shadow-lg">Grassland</h2>
            <div className="mt-4 px-4 py-1 bg-black/40 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
              <span className="text-green-300 font-bold">Start Adventure →</span>
            </div>
          </div>
        </Link>

        {/* 沙漠卡片 */}
        <Link 
          href="/quiz/desert"
          className="group relative h-96 rounded-3xl overflow-hidden border-4 border-slate-700 hover:border-orange-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(251,146,60,0.4)]"
        >
          <div className="absolute inset-0 bg-[#EEDC82] group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="relative h-full flex flex-col items-center justify-center text-white p-6 z-10">
            <span className="text-7xl mb-6 transform group-hover:scale-125 transition-transform duration-300 drop-shadow-md">🌵</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-wider drop-shadow-lg text-orange-100">Desert</h2>
            <div className="mt-4 px-4 py-1 bg-black/40 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
              <span className="text-orange-300 font-bold">Start Adventure →</span>
            </div>
          </div>
        </Link>

        {/* 森林卡片 */}
        <Link 
          href="/quiz/forest"
          className="group relative h-96 rounded-3xl overflow-hidden border-4 border-slate-700 hover:border-emerald-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]"
        >
          <div className="absolute inset-0 bg-[#2E4826] group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="relative h-full flex flex-col items-center justify-center text-white p-6 z-10">
            <span className="text-7xl mb-6 transform group-hover:scale-125 transition-transform duration-300 drop-shadow-md">🌲</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-wider drop-shadow-lg text-emerald-100">Forest</h2>
            <div className="mt-4 px-4 py-1 bg-black/40 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
              <span className="text-emerald-300 font-bold">Start Adventure →</span>
            </div>
          </div>
        </Link>

      </div>
    </main>
  );
}