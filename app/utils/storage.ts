// app/utils/storage.ts

export interface Record {
  questionId: string;
  subject: string;
  biome: string;    // ✅ 多加這個，方便之後篩選
  isCorrect: boolean;
  skill: string;
  blindSpot: string;
  timestamp: number;
}

const STORAGE_KEY = "user_quiz_records_v2"; // 改個名，避免跟舊資料混淆

// 💾 儲存單筆紀錄
export const saveRecord = (record: Omit<Record, "timestamp">) => {
  if (typeof window === "undefined") return;

  const currentData = getRecords();
  const newRecord = { ...record, timestamp: Date.now() };
  
  // 邏輯：如果這題之前做過，我們選擇「覆蓋舊紀錄」或是「保留兩筆」?
  // MVP 建議：先刪除舊的同題紀錄，只留最新的，這樣計算進度比較簡單
  const filteredData = currentData.filter((r) => r.questionId !== record.questionId);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...filteredData, newRecord]));
};

// 📖 讀取所有紀錄
export const getRecords = (): Record[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// 🧹 清除特定題目的紀錄 (選用，重置進度用)
export const clearHistory = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};