// app/data/questions.ts

export interface Question {
  id: string;
  biome: string;
  subject: string;
  grade: number;
  type: "multiple-choice" | "short-answer";
  question: string;
  image?: string;
  options?: string[];
  answerIndex?: number;
  answerText?: string;
  analysis: string;
  // ✨ 新增這兩個欄位 ✨
  skill: "Knowledge" | "Calculation" | "Logic" | "Observation"; // 考察技能
  blindSpot: "Concept Error" | "Careless" | "Misreading" | "Complex Logic"; // 常見盲點
}

export const questions: Question[] = [
  // 🌲 Forest
  {
    id: "f-1",
    biome: "forest",
    subject: "bio",
    grade: 7,
    type: "multiple-choice",
    question: "Which layer of the rainforest receives the most sunlight?",
    options: ["Forest Floor", "Understory", "Canopy", "Emergent Layer"],
    answerIndex: 3,
    analysis: "The Emergent Layer consists of the tallest trees...",
    skill: "Knowledge",       // 這是考記憶/知識
    blindSpot: "Concept Error" // 答錯通常是觀念不懂
  },
  {
    id: "f-2",
    biome: "forest",
    subject: "math",
    grade: 7,
    type: "short-answer",
    question: "A bamboo tree grows 3 cm per hour. How many centimeters in 24 hours?",
    answerText: "72",
    analysis: "3 cm/hr × 24 hr = 72 cm.",
    skill: "Calculation",    // 這是考計算
    blindSpot: "Careless"    // 答錯通常是粗心算錯
  },
  // 🌵 Desert
  {
    id: "d-1",
    biome: "desert",
    subject: "bio",
    grade: 7,
    type: "multiple-choice",
    question: "Which adaptation helps camels survive in the desert?",
    options: ["Thick fur", "Webbed feet", "Storing fat in humps", "Gills"],
    answerIndex: 2,
    analysis: "Camels store fat in their humps...",
    skill: "Observation",
    blindSpot: "Misreading"
  },
  {
    id: "d-2",
    biome: "desert",
    subject: "math",
    grade: 8,
    type: "short-answer",
    question: "Temp drops from 40°C to -5°C. Difference?",
    answerText: "45",
    analysis: "40 - (-5) = 45.",
    skill: "Logic",          // 負數運算邏輯
    blindSpot: "Concept Error"
  },
  // 🌾 Grass
  {
    id: "g-1",
    biome: "grass",
    subject: "bio",
    grade: 6,
    type: "multiple-choice",
    question: "Which animal is a primary consumer?",
    options: ["Lion", "Zebra", "Vulture", "Hyena"],
    answerIndex: 1,
    analysis: "Zebras eat grass...",
    skill: "Knowledge",
    blindSpot: "Concept Error"
  },
];