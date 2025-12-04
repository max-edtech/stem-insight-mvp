"use client";

import { questions } from "@/app/data/questions"; 
import QuestionCard from "@/app/components/QuestionCard"; 
// ✅ 新增這行：引入 Link 元件
import Link from "next/link"; 

export default function BioQuizPage() {
  const quizData = questions.filter((q) => q.subject === "bio");

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center relative">
      
      {/* ✅ 新增這個區塊：回到 Dashboard 的按鈕 */}
      <div className="w-full max-w-2xl mb-6">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium"
        >
          {/*這是一個簡單的向左箭頭圖示*/}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-emerald-800">Biology Challenge</h1>
      
      {quizData.length > 0 ? (
        quizData.map((question) => (
          <QuestionCard key={question.id} data={question} />
        ))
      ) : (
        <p className="text-slate-500">No questions found for this category.</p>
      )}
    </div>
  );
}