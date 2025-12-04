"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// ✅ 關鍵修正：將引入的 Record 型別重新命名為 UserRecord，避免與內建型別衝突
import { getRecords, Record as UserRecord } from "@/app/utils/storage"; 
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from "recharts";

// 🤖 報告生成器：分析盲點，並指出在哪個科目上出錯最多
const generateReportSummary = (allRecords: UserRecord[], blindSpotData: { name: string, count: number }[]): string => {
    if (allRecords.length === 0) return "No data recorded yet. Go take some quizzes!";

    const mainBlindSpot = blindSpotData.length > 0 ? blindSpotData[0].name : null;
    if (!mainBlindSpot) return "Your stats look balanced, or you haven't made many mistakes! Try the 'Desert' biome for a harder challenge!";

    const mainSpotRecords = allRecords.filter(r => !r.isCorrect && r.blindSpot === mainBlindSpot);
    const subjectCounts: Record<string, number> = {}; // 👈 注意：這裡用的是內建 Record<string, number>
    
    mainSpotRecords.forEach(r => {
        subjectCounts[r.subject] = (subjectCounts[r.subject] || 0) + 1;
    });

    const subjectWithMostErrors = Object.keys(subjectCounts).reduce((a, b) => 
        subjectCounts[a] > subjectCounts[b] ? a : b, 'None'
    );
    const errorCount = subjectCounts[subjectWithMostErrors] || 0;

    switch (mainBlindSpot) {
        case "Calculation Error":
            return `您的首要威脅是 **計算粗心 (${errorCount} 次)**。這主要發生在 ${subjectWithMostErrors.toUpperCase()} 類型的題目上。請練習在解題後加入嚴格的「驗算步驟」，以避免失分。`;
        case "Concept Error":
            return `**觀念混淆** 是最大的失分點 (${errorCount} 次)。請針對 ${subjectWithMostErrors.toUpperCase()} 的主題進行複習。這是知識儲存上的漏洞，建議回頭查閱講義。`;
        case "Misreading":
            return `您有 ${errorCount} 次的錯誤歸因於**審題不清**。您的知識是足夠的，但請在作答時放慢速度，劃出關鍵字，避免因為時間壓力而看錯問題。`;
        case "Careless":
            return `您有 ${errorCount} 次的 **純粹粗心** 錯誤。這表示您的知識基礎穩固，但遺失了分數。建議在每次測驗結束後加入 5 分鐘的「專門檢查時間」。`;
        default:
            return `我們偵測到您的主要盲點是 ${mainBlindSpot}。請針對該類型的題目進行更多練習，以鞏固基礎。`;
    }
};


export default function AnalysisPage() {
  // ✅ 修正：現在使用 UserRecord[]
  const [records, setRecords] = useState<UserRecord[]>([]); 

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  // 數據處理: 技能與盲點 (使用 UserRecord[])
  const skillStats = ["Knowledge", "Calculation", "Logic", "Observation"].map(skill => {
    const skillRecords = records.filter(r => r.skill === skill);
    const total = skillRecords.length;
    const correct = skillRecords.filter(r => r.isCorrect).length;
    const score = total === 0 ? 20 : Math.round((correct / total) * 100);
    return { subject: skill, score, fullMark: 100 };
  });

  const wrongRecords = records.filter(r => !r.isCorrect);
  const blindSpotCounts: Record<string, number> = {}; // 這裡仍使用內建 Record
  wrongRecords.forEach(r => {
    blindSpotCounts[r.blindSpot] = (blindSpotCounts[r.blindSpot] || 0) + 1;
  });
  
  const blindSpotData = Object.keys(blindSpotCounts).map(key => ({
    name: key,
    count: blindSpotCounts[key]
  })).sort((a, b) => b.count - a.count);

  const reportSummary = generateReportSummary(records, blindSpotData);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6 font-mono flex flex-col items-center">
      
      {/* 導航 */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2">
          ⬅ Back to World
        </Link>
        <h1 className="text-2xl font-bold text-yellow-500 tracking-widest uppercase drop-shadow-md">
          Player Statistics
        </h1>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 🕸️ 左側：技能雷達圖 (Skill Radar) */}
        <div className="bg-[#2c2c2c] border-4 border-gray-600 p-4 rounded-sm shadow-xl">
          <h2 className="text-center text-green-400 font-bold mb-4 uppercase text-lg border-b-2 border-gray-600 pb-2">
            Skill Proficiency
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillStats}>
                <PolarGrid stroke="#555" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ccc', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.5}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#82ca9d', color: '#fff' }}
                  itemStyle={{ color: '#82ca9d' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            *Based on quiz accuracy per skill type
          </p>
        </div>

        {/* ⚠️ 右側：盲點分析 (Blind Spot Analysis) */}
        <div className="bg-[#2c2c2c] border-4 border-gray-600 p-4 rounded-sm shadow-xl">
          <h2 className="text-center text-red-400 font-bold mb-4 uppercase text-lg border-b-2 border-gray-600 pb-2">
            Weakness Analysis
          </h2>
          
          {blindSpotData.length > 0 ? (
            <div className="h-64 w-full flex flex-col justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={blindSpotData} margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#fff', fontSize: 12 }} />
                  <Tooltip cursor={{fill: '#333'}} contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#f87171' }} />
                  <Bar dataKey="count" barSize={20} radius={[0, 4, 4, 0]}>
                    {blindSpotData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#fca5a5'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-2 text-center">
                 <p className="text-red-300 text-sm">
                   Main Threat: <span className="font-bold underline">{blindSpotData[0].name}</span>
                 </p>
                 <p className="text-gray-500 text-xs mt-1">
                   Fix this to boost your grade!
                 </p>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500">
              <span className="text-4xl mb-2">🛡️</span>
              <p>No weaknesses detected yet.</p>
              <p className="text-xs">Go challenge some quizzes!</p>
            </div>
          )}
        </div>

      </div>

      {/* 底部建議 - 🤖 AI 教練報告 */}
      <div className="w-full max-w-4xl mt-8 bg-blue-900/30 border-2 border-blue-500/50 p-4 rounded">
        <h3 className="text-blue-300 font-bold mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
          AI Coach Diagnostic Report
        </h3>
        <p className="text-gray-300 text-base leading-relaxed">
          {reportSummary}
        </p>
      </div>

    </div>
  );
}