"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti"; // 🎉 引入煙火
import { Question } from "@/app/data/questions";
import { saveRecord } from "@/app/utils/storage"; // ✅ 引入儲存工具

interface QuestionCardProps {
  data: Question;
  onAnswer?: (isCorrect: boolean) => void;
}

export default function QuestionCard({ data, onAnswer }: QuestionCardProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // 📝 簡答題專用 State
  const [userAnswer, setUserAnswer] = useState(""); 
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectState, setIsCorrectState] = useState(false); // 紀錄是否答對

  // 當題目切換時，重置所有狀態
  useEffect(() => {
    setShowAnalysis(false);
    setSelectedOption(null);
    setUserAnswer("");
    setIsAnswered(false);
    setIsCorrectState(false);
  }, [data.id]);

  // 🎉 煙火特效函式
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
    });
  };

  // 🔘 處理選擇題
  const handleOptionClick = (index: number) => {
    if (isAnswered) return;

    const isCorrect = index === data.answerIndex;
    setSelectedOption(index);
    setIsAnswered(true);
    setIsCorrectState(isCorrect);
    setShowAnalysis(true);

    // ✅ 儲存作答紀錄 (Skill & Blind Spot)
    saveRecord({
      questionId: data.id,
      subject: data.subject,
      biome: data.biome,      // 紀錄是在哪個世界做的
      isCorrect: isCorrect,
      skill: data.skill || "General",       // 預防舊資料沒有欄位
      blindSpot: data.blindSpot || "None"   // 預防舊資料沒有欄位
    });

    if (isCorrect) triggerConfetti(); // 答對放煙火
    if (onAnswer) onAnswer(isCorrect);
  };

  // 📝 處理簡答題送出
  const handleShortAnswerSubmit = () => {
    if (isAnswered || !userAnswer.trim()) return;

    // 模糊比對邏輯：移除空格、轉小寫後比對
    const cleanUserAns = userAnswer.toLowerCase().replace(/[^a-z0-9]/g, ""); 
    const cleanCorrectAns = (data.answerText || "").toLowerCase().replace(/[^a-z0-9]/g, "");

    // 簡單判斷
    const isCorrect = cleanUserAns === cleanCorrectAns || cleanUserAns.includes(cleanCorrectAns);

    setIsAnswered(true);
    setIsCorrectState(isCorrect);
    setShowAnalysis(true);

    // ✅ 儲存作答紀錄 (Skill & Blind Spot)
    saveRecord({
      questionId: data.id,
      subject: data.subject,
      biome: data.biome,
      isCorrect: isCorrect,
      skill: data.skill || "General",
      blindSpot: data.blindSpot || "None"
    });

    if (isCorrect) triggerConfetti(); 
    if (onAnswer) onAnswer(isCorrect);
  };

  // 🎨 樣式輔助
  const getOptionStyle = (index: number) => {
    if (!isAnswered) return "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm";
    if (index === data.answerIndex) return "bg-green-50 border-green-500 text-green-900 font-bold shadow-md ring-1 ring-green-500";
    if (index === selectedOption && index !== data.answerIndex) return "bg-red-50 border-red-500 text-red-900 opacity-90";
    return "bg-slate-50 border-slate-200 opacity-50 grayscale";
  };

  return (
    <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-xl shadow-slate-200/50 transition-all text-slate-800">
      
      {/* Tags */}
      <div className="flex gap-2 mb-5">
        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
          data.subject === 'math' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {data.subject}
        </span>
        <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider rounded-full">
          Grade {data.grade}
        </span>
        
        {/* 顯示技能標籤 (如果有) */}
        {data.skill && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-mono rounded border border-gray-200 ml-2">
            Skill: {data.skill}
          </span>
        )}

        <span className="ml-auto text-xs text-slate-400 font-mono">#{data.id}</span>
      </div>

      <h3 className="text-xl font-bold mb-5 leading-relaxed text-slate-900">
        {data.question}
      </h3>
      
      {data.image && (
        <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
          <Image 
            src={data.image} 
            alt="Question illustration" 
            fill 
            className="object-contain p-2" 
            sizes="(max-width: 768px) 100vw, 42rem"
          />
        </div>
      )}

      {/* 🔘 選擇題區域 */}
      {data.type === "multiple-choice" && data.options && (
        <div className="grid gap-3 mb-6">
          {data.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={isAnswered}
              className={`group text-left p-4 rounded-xl border-2 font-medium transition-all duration-200 relative ${getOptionStyle(idx)}`}
            >
              <div className="flex items-center">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-bold transition-colors
                  ${isAnswered && idx === data.answerIndex 
                    ? "bg-green-600 text-white" 
                    : isAnswered && idx === selectedOption 
                      ? "bg-red-500 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}
                `}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
                {isAnswered && idx === data.answerIndex && <span className="ml-2 text-xl text-green-600">✓</span>}
                {isAnswered && idx === selectedOption && idx !== data.answerIndex && <span className="ml-2 text-xl text-red-500">✕</span>}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ✍️ 簡答題區域 */}
      {data.type === "short-answer" && (
        <div className="mb-6 space-y-3">
           <div className="relative">
             <input
               type="text"
               value={userAnswer}
               onChange={(e) => setUserAnswer(e.target.value)}
               disabled={isAnswered}
               placeholder="Type your answer here..."
               className={`w-full p-4 text-lg border-2 rounded-xl outline-none transition-all
                 ${isAnswered 
                   ? (isCorrectState ? "border-green-500 bg-green-50 text-green-900" : "border-red-300 bg-red-50 text-red-900")
                   : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                 }
               `}
               onKeyDown={(e) => e.key === 'Enter' && handleShortAnswerSubmit()}
             />
             {isAnswered && (
               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                 {isCorrectState ? "🎉" : "❌"}
               </span>
             )}
           </div>

           {!isAnswered ? (
             <button 
               onClick={handleShortAnswerSubmit}
               disabled={!userAnswer.trim()}
               className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
             >
               Submit Answer
             </button>
           ) : (
            !isCorrectState && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                Correct Answer: <span className="font-bold">{data.answerText}</span>
              </div>
            )
           )}
        </div>
      )}

      {/* 💡 解析區 */}
      {(showAnalysis || isAnswered) && (
        <div className="mt-6 border-t pt-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className={`p-5 rounded-xl ${isCorrectState ? 'bg-green-50 border border-green-100' : 'bg-orange-50 border border-orange-100'}`}>
            <p className={`font-bold mb-2 flex items-center gap-2 ${isCorrectState ? 'text-green-800' : 'text-orange-800'}`}>
              {isCorrectState ? "🎉 Correct!" : "💪 Keep Learning!"}
            </p>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              {data.analysis}
            </p>
            {/* 顯示盲點提示 (只在答錯時顯示) */}
            {!isCorrectState && data.blindSpot && (
               <p className="mt-2 text-xs text-red-500 font-bold bg-white/50 inline-block px-2 py-1 rounded border border-red-200">
                 ⚠️ Watch out for: {data.blindSpot}
               </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}