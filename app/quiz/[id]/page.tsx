"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/app/data/questions"; 
import { saveSubjectProgress } from "@/app/utils/storage"; 
import BackgroundMusic from "@/app/components/BackgroundMusic";
import useSound from "@/app/hooks/useSound";

const THEMES: Record<string, any> = {
  grass: {
    name: "PLAINS SECTOR",
    nameZh: "平原區域",
    color: "text-green-400",
    bg: "bg-green-500",
    border: "border-green-500",
    shadow: "shadow-green-500/50",
    gradient: "from-green-900/50",
    hover: "hover:bg-green-500/20 hover:border-green-400",
  },
  forest: {
    name: "FOREST SECTOR",
    nameZh: "森林區域",
    color: "text-cyan-400",
    bg: "bg-cyan-500",
    border: "border-cyan-500",
    shadow: "shadow-cyan-500/50",
    gradient: "from-cyan-900/50",
    hover: "hover:bg-cyan-500/20 hover:border-cyan-400",
  },
  desert: {
    name: "BADLANDS SECTOR", // 台灣化：改成惡地
    nameZh: "惡地區域",
    color: "text-orange-400",
    bg: "bg-orange-500",
    border: "border-orange-500",
    shadow: "shadow-orange-500/50",
    gradient: "from-orange-900/50",
    hover: "hover:bg-orange-500/20 hover:border-orange-400",
  },
};

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const biomeId = (id || "").toLowerCase();
  const theme = THEMES[biomeId] || THEMES.forest;

  // 🌍 語言狀態：預設為中文 ('zh')
  const [lang, setLang] = useState<'en' | 'zh'>('zh');

  // 音效
  const playCorrect = useSound('/sounds/correct.mp3', 0.6);
  const playWrong = useSound('/sounds/wrong.mp3', 0.6);
  const playWin = useSound('/sounds/win.mp3', 0.7);
  const playClick = useSound('/sounds/click.mp3', 0.4);

  const [biomeQuestions, setBiomeQuestions] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!biomeId) return;
    const filtered = questions.filter((q) => q.biome.toLowerCase() === biomeId);
    setBiomeQuestions(filtered);
    setCurrentQIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setUserAnswer("");
    setIsCorrect(null);
  }, [biomeId]);

  useEffect(() => {
     if (showResult) playWin();
  }, [showResult]);

  const goNext = () => {
    setTimeout(() => {
      if (currentQIndex >= biomeQuestions.length - 1) {
        setShowResult(true);
      } else {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedOption(null);
        setUserAnswer("");
        setIsCorrect(null);
      }
    }, 1500);
  };

  const handleMultipleChoice = (optionIndex: number) => {
    if (selectedOption) return;
    const currentQ = biomeQuestions[currentQIndex];
    // 比對答案 Index
    const correct = optionIndex === currentQ.answerIndex;

    if (correct) playCorrect(); else playWrong();

    // 這裡我們存選項文字，為了顯示方便，根據語言存
    const optionText = lang === 'en' ? currentQ.optionsEn[optionIndex] : currentQ.optionsZh[optionIndex];
    
    setSelectedOption(optionText); 
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
    saveSubjectProgress(currentQ.subject, correct);
    goNext();
  };

  const handleShortAnswer = () => {
    if (selectedOption) return;
    const currentQ = biomeQuestions[currentQIndex];
    const cleanUser = userAnswer.trim().toLowerCase();
    
    // 比對中英文答案 (只要符合其中一個就算對)
    const ansEn = (currentQ.answerTextEn || "").trim().toLowerCase();
    const ansZh = (currentQ.answerTextZh || "").trim().toLowerCase();
    
    const correct = cleanUser === ansEn || cleanUser === ansZh;

    if (correct) playCorrect(); else playWrong();

    setSelectedOption("answered");
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
    saveSubjectProgress(currentQ.subject, correct);
    goNext();
  };

  if (biomeQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-gray-500 font-mono">
        <p className="mb-4">INITIALIZING SECTOR: {biomeId.toUpperCase()}...</p>
        <button onClick={() => { playClick(); router.push('/dashboard'); }} className="px-4 py-2 border border-gray-700 text-white">
          RETURN TO LOBBY
        </button>
      </div>
    );
  }

  // --- 顯示文字的變數 (根據 lang 切換) ---
  const currentQ = biomeQuestions[currentQIndex];
  // 選擇題選項
  const currentOptions = lang === 'en' ? currentQ.optionsEn : currentQ.optionsZh;
  // 題目
  const questionText = lang === 'en' ? currentQ.questionEn : currentQ.questionZh;
  // 正確答案 (簡答題用)
  const answerText = lang === 'en' ? currentQ.answerTextEn : currentQ.answerTextZh;
  // 區域名稱
  const sectorName = lang === 'en' ? theme.name : theme.nameZh;

  if (showResult) {
    const finalScorePercent = Math.round((score / biomeQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"></div>
        <div className={`z-10 w-full max-w-md bg-black/90 backdrop-blur-xl border-2 ${theme.border} p-8 rounded-lg text-center`}>
          <h1 className={`text-4xl font-black mb-2 ${theme.color}`}>
            {lang === 'en' ? "MISSION COMPLETE" : "任務完成"}
          </h1>
          <div className="flex justify-center items-center gap-4 mb-8 mt-8">
            <div className={`w-32 h-32 rounded-full border-4 ${theme.border} flex items-center justify-center bg-black`}>
              <span className="text-4xl font-bold">{finalScorePercent}%</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => { playClick(); router.push('/analysis'); }} className={`w-full py-4 ${theme.bg} text-black font-bold tracking-widest hover:brightness-110 rounded`}>
              {lang === 'en' ? "📊 VIEW STATS" : "📊 查看分析"}
            </button>
            <button onClick={() => { playClick(); router.push('/dashboard'); }} className="w-full py-3 border border-gray-600 text-gray-400 hover:text-white font-bold tracking-widest rounded">
              {lang === 'en' ? "RETURN TO MAP" : "返回地圖"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentQIndex + 1) / biomeQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 font-mono flex flex-col items-center justify-center relative overflow-hidden">
      <BackgroundMusic src="/sounds/bgm_quiz.mp3" />
      
      {/* 🌍 語言切換按鈕 (右上角) */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => { playClick(); setLang(prev => prev === 'en' ? 'zh' : 'en'); }}
          className="flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-700 rounded-full hover:border-white transition-colors text-xs font-bold"
        >
          <span>🌐</span>
          <span className={lang === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
          <span className="text-gray-700">|</span>
          <span className={lang === 'zh' ? 'text-white' : 'text-gray-500'}>中</span>
        </button>
      </div>

      <div className="w-full max-w-2xl mb-8 z-10">
        <div className="flex justify-between items-end mb-2 px-1">
           <span className={`text-xs font-bold tracking-[0.2em] ${theme.color}`}>{sectorName}</span>
           <span className="text-xs text-gray-500">Q.{currentQIndex + 1} / {biomeQuestions.length}</span>
        </div>
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
           <div className={`h-full ${theme.bg} shadow-[0_0_10px_currentColor] transition-all duration-500`} style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className={`z-10 w-full max-w-2xl bg-black/60 backdrop-blur-md border border-gray-700 p-6 md:p-10 rounded-xl relative shadow-2xl`}>
        <div className={`absolute top-0 left-0 w-full h-[2px] ${theme.bg} opacity-50 shadow-[0_0_15px_currentColor]`}></div>
        <div className="mb-8">
           <span className="inline-block px-2 py-1 bg-gray-800 rounded text-[10px] text-gray-400 border border-gray-600 mb-4">
             {lang === 'en' ? "SUBJECT: " : "科目: "}{currentQ.subject.toUpperCase()}
           </span>
           <h2 className="text-xl md:text-3xl font-bold leading-relaxed text-gray-100">{questionText}</h2>
        </div>

        {currentQ.type === "multiple-choice" && currentOptions ? (
          <div className="space-y-3">
            {currentOptions.map((option: string, idx: number) => {
               let btnClass = `border-gray-700 bg-gray-900/40 text-gray-300 ${theme.hover}`;
               let iconContent = "➜";
               
               // 判斷是否被選中 (文字比對)
               const isSelected = selectedOption === option;
               
               if (isSelected) {
                  if (isCorrect) { btnClass = "border-green-500 bg-green-900/40 text-green-400"; iconContent = "✓"; }
                  else { btnClass = "border-red-500 bg-red-900/40 text-red-400"; iconContent = "✕"; }
               } else if (selectedOption) { btnClass = "border-gray-800 bg-black opacity-30 cursor-not-allowed"; }

               return (
                 <button key={idx} onClick={() => handleMultipleChoice(idx)} disabled={!!selectedOption}
                   className={`w-full p-4 border-l-4 text-left transition-all duration-200 group flex items-center justify-between font-mono ${btnClass} rounded-r-lg`}>
                   <span className="flex-1">{option}</span><span className="ml-4 font-bold">{iconContent}</span>
                 </button>
               );
            })}
          </div>
        ) : (
          <div className="space-y-4">
             <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} disabled={!!selectedOption} 
               placeholder={lang === 'en' ? "TYPE ANSWER HERE..." : "在此輸入答案..."}
               className={`w-full bg-black/50 border-2 p-4 text-white font-mono outline-none rounded ${selectedOption ? (isCorrect ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400') : 'border-gray-700'}`}
               onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleShortAnswer()} />
             {!selectedOption ? (
               <button onClick={handleShortAnswer} disabled={!userAnswer} className={`w-full py-4 ${theme.bg} text-black font-bold uppercase hover:brightness-110 rounded disabled:opacity-50`}>
                 {lang === 'en' ? "SUBMIT DATA" : "提交數據"}
               </button>
             ) : (
               <div className="p-4 bg-gray-900 border border-gray-700 rounded text-sm text-gray-400">
                  {lang === 'en' ? "CORRECT ANSWER: " : "正確答案: "}
                  <span className="text-white font-bold">{answerText}</span>
               </div>
             )}
          </div>
        )}
        
        <div className="h-6 mt-6 flex justify-center items-center">
            {selectedOption && (
              <div className={`text-sm font-bold tracking-[0.2em] animate-pulse ${isCorrect ? 'text-green-400' : 'text-red-500'}`}>
                  {isCorrect 
                    ? (lang === 'en' ? ">> DATA MATCHED <<" : ">> 數據匹配成功 <<") 
                    : (lang === 'en' ? ">> SYSTEM ERROR: INCORRECT INPUT <<" : ">> 系統錯誤：輸入不正確 <<")
                  }
              </div>
            )}
        </div>
      </div>
      <div className="fixed bottom-4 text-[10px] text-gray-700 font-mono">SIMULATION ID: {biomeId.toUpperCase()}_001</div>
    </div>
  );
}