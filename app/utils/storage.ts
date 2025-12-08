// app/utils/storage.ts

// 定義資料介面
export interface SubjectStats {
  correct: number;
  total: number;
}

// ✅ 1. 儲存答題進度 (這就是報錯說找不到的函式)
export const saveSubjectProgress = (subject: string, isCorrect: boolean) => {
  // 防止在伺服器端渲染 (SSR) 時執行報錯
  if (typeof window === 'undefined') return;

  //讀取舊資料
  const rawData = localStorage.getItem("subject_stats");
  const stats: Record<string, SubjectStats> = rawData ? JSON.parse(rawData) : {};

  // 如果該科目還沒紀錄過，先初始化
  if (!stats[subject]) {
    stats[subject] = { correct: 0, total: 0 };
  }

  // 更新數據
  stats[subject].total += 1;
  if (isCorrect) stats[subject].correct += 1;

  // 存回瀏覽器
  localStorage.setItem("subject_stats", JSON.stringify(stats));
};

// ✅ 2. 清除歷史紀錄 (給 Dashboard 的 Reset 按鈕用)
export const clearHistory = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem("subject_stats");
  // localStorage.removeItem("username"); // 如果想連名字一起清掉可打開這行
};

// ✅ 3. 取得特定科目的分數 (給 Analysis 頁面用)
export const getStoredSubjectStats = (subject: string): SubjectStats => {
  if (typeof window === 'undefined') return { correct: 0, total: 0 };

  const rawData = localStorage.getItem("subject_stats");
  const stats = rawData ? JSON.parse(rawData) : {};
  
  return stats[subject] || { correct: 0, total: 0 };
};