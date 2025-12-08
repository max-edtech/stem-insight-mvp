// app/data/questions.ts

export interface Question {
  id: string;
  biome: string; // 'grass' | 'forest' | 'desert'
  subject: string; // 'math' | 'bio' | 'chem' | 'physics'
  type: "multiple-choice" | "short-answer";
  
  // 🇬🇧 英文版
  questionEn: string;
  optionsEn?: string[];
  answerTextEn?: string;
  
  // 🇹🇼 中文版
  questionZh: string;
  optionsZh?: string[];
  answerTextZh?: string;

  // 通用數據
  answerIndex?: number; // 選擇題答案位置 (0, 1, 2, 3)
  skill: "Knowledge" | "Calculation" | "Logic" | "Observation";
  blindSpot: string;
}

export const questions: Question[] = [
  // ==========================================
  // 🌿 Sector 1: 草原/城市 (PLAINS) - 生活應用與基礎生態
  // ==========================================
  {
    id: "g-1",
    biome: "grass",
    subject: "bio",
    type: "multiple-choice",
    questionEn: "Which invasive species is known as the 'Pink Menace' in Taiwan's rice fields?",
    questionZh: "哪種外來入侵種生物，因產下粉紅色的卵塊，被稱為台灣水田的「粉紅殺手」？",
    optionsEn: ["Fire Ant", "Apple Snail", "Crayfish", "Mosquito"],
    optionsZh: ["紅火蟻", "福壽螺", "美國螯蝦", "斑蚊"],
    answerIndex: 1,
    skill: "Knowledge",
    blindSpot: "Ecological awareness"
  },
  {
    id: "g-2",
    biome: "grass",
    subject: "math",
    type: "short-answer",
    questionEn: "Taipei MRT travels 60km in 1.5 hours. What is its average speed (km/h)?",
    questionZh: "台北捷運在 1.5 小時內行駛了 60 公里。請問平均時速是多少 (km/h)？",
    answerTextEn: "40",
    answerTextZh: "40",
    skill: "Calculation",
    blindSpot: "Decimal division error"
  },
  {
    id: "g-3",
    biome: "grass",
    subject: "chem",
    type: "multiple-choice",
    questionEn: "To make the perfect Bubble Tea, the ratio of tea to milk is 3:1. If you use 300ml tea, how much milk?",
    questionZh: "調製完美珍珠奶茶的「茶奶比」是 3:1。如果你用了 300ml 的紅茶，需要多少牛奶？",
    optionsEn: ["50ml", "100ml", "150ml", "300ml"],
    optionsZh: ["50ml", "100ml", "150ml", "300ml"],
    answerIndex: 1,
    skill: "Logic",
    blindSpot: "Ratio calculation"
  },
  {
    id: "g-4",
    biome: "grass",
    subject: "physics",
    type: "multiple-choice",
    questionEn: "Why does the YouBike feel harder to pedal when going uphill?",
    questionZh: "為什麼騎 YouBike 上坡時會覺得變重、比較難踩？",
    optionsEn: ["Friction increases", "Gravity pulls you back", "Air resistance", "Tires get soft"],
    optionsZh: ["摩擦力變大", "重力將你往後拉 (位能增加)", "空氣阻力", "輪胎變軟"],
    answerIndex: 1,
    skill: "Logic",
    blindSpot: "Confusing friction with gravity"
  },
  {
    id: "g-5",
    biome: "grass",
    subject: "bio",
    type: "multiple-choice",
    questionEn: "Which bird is often seen on the back of water buffaloes in Taiwan?",
    questionZh: "在台灣農村，常看到站在水牛背上幫忙吃蟲的鳥類是？",
    optionsEn: ["Eagle", "Cattle Egret", "Sparrow", "Owl"],
    optionsZh: ["老鷹", "黃頭鷺 (牛背鷺)", "麻雀", "貓頭鷹"],
    answerIndex: 1,
    skill: "Observation",
    blindSpot: "Symbiotic relationships"
  },
  {
    id: "g-6",
    biome: "grass",
    subject: "math",
    type: "short-answer",
    questionEn: "A typhoon warning lasts 24 hours. If it started at 8:00 AM today, when does it end tomorrow?",
    questionZh: "颱風警報持續 24 小時。如果從今天早上 8:00 開始，請問明天幾點結束？",
    answerTextEn: "8:00",
    answerTextZh: "8:00",
    skill: "Logic",
    blindSpot: "Time calculation confusion"
  },

  // ==========================================
  // 🌲 Sector 2: 森林 (FOREST) - 台灣高山與特有種
  // ==========================================
  {
    id: "f-1",
    biome: "forest",
    subject: "bio",
    type: "multiple-choice",
    questionEn: "Which fish is endemic to Taiwan and lives only in cold, clean mountain streams?",
    questionZh: "哪種魚是台灣特有種，只能生活在七家灣溪等冰冷乾淨的高山溪流中？",
    optionsEn: ["Goldfish", "Formosan Landlocked Salmon", "Tilapia", "Shark"],
    optionsZh: ["金魚", "櫻花鉤吻鮭", "吳郭魚", "鯊魚"],
    answerIndex: 1,
    skill: "Knowledge",
    blindSpot: "Conservation knowledge"
  },
  {
    id: "f-2",
    biome: "forest",
    subject: "math",
    type: "short-answer",
    questionEn: "A giant Cypress tree is 45 meters tall. If each floor of a building is 3 meters, how many floors is it?",
    questionZh: "一棵巨大的紅檜高 45 公尺。如果一層樓高 3 公尺，這棵樹相當於幾層樓高？",
    answerTextEn: "15",
    answerTextZh: "15",
    skill: "Calculation",
    blindSpot: "Division logic"
  },
  {
    id: "f-3",
    biome: "forest",
    subject: "physics",
    type: "multiple-choice",
    questionEn: "Why is it often foggy in the Alishan mountains in the afternoon?",
    questionZh: "為什麼阿里山到了下午常常會起大霧？",
    optionsEn: ["Trees are breathing", "Warm air meets cold mountain air", "Someone is cooking", "Ghosts"],
    optionsZh: ["樹木在呼吸", "暖濕空氣遇到高山冷空氣凝結", "有人在煮飯", "幽靈出現"],
    answerIndex: 1,
    skill: "Logic",
    blindSpot: "Weather formation"
  },
  {
    id: "f-4",
    biome: "forest",
    subject: "bio",
    type: "multiple-choice",
    questionEn: "The 'Formosan Pangolin' curls into a ball when threatened. Why?",
    questionZh: "台灣穿山甲遇到危險時會捲成球狀，這是為了？",
    optionsEn: ["To sleep", "To roll away", "To protect its soft belly", "To look cute"],
    optionsZh: ["為了睡覺", "為了滾走", "保護柔軟的腹部", "為了裝可愛"],
    answerIndex: 2,
    skill: "Observation",
    blindSpot: "Defense mechanism"
  },
  {
    id: "f-5",
    biome: "forest",
    subject: "math",
    type: "short-answer",
    questionEn: "There are 5 spiders and 3 beetles. How many legs in total? (Spider=8, Beetle=6)",
    questionZh: "森林裡有 5 隻蜘蛛和 3 隻甲蟲。請問共有幾隻腳？(蜘蛛8隻腳，甲蟲6隻腳)",
    answerTextEn: "58",
    answerTextZh: "58",
    skill: "Calculation",
    blindSpot: "Complex multiplication/addition"
  },
  {
    id: "f-6",
    biome: "forest",
    subject: "chem",
    type: "multiple-choice",
    questionEn: "Photosynthesis turns Carbon Dioxide into what?",
    questionZh: "光合作用會把二氧化碳轉變成什麼？",
    optionsEn: ["Water", "Oxygen & Sugar", "Nitrogen", "Soil"],
    optionsZh: ["水", "氧氣與葡萄糖 (糖分)", "氮氣", "土壤"],
    answerIndex: 1,
    skill: "Knowledge",
    blindSpot: "Chemical process of plants"
  },
  {
    id: "f-7",
    biome: "forest",
    subject: "bio",
    type: "multiple-choice",
    questionEn: "Ferns reproduce not by seeds, but by...?",
    questionZh: "台灣是蕨類王國。蕨類不靠種子繁殖，而是靠什麼？",
    optionsEn: ["Flowers", "Spores", "Eggs", "Roots"],
    optionsZh: ["開花", "孢子", "蛋", "根部"],
    answerIndex: 1,
    skill: "Knowledge",
    blindSpot: "Plant classification"
  },

  // ==========================================
  // 🌵 Sector 3: 惡地/極端氣候 (DESERT/BADLANDS) - 挑戰題
  // ==========================================
  {
    id: "d-1",
    biome: "desert",
    subject: "physics",
    type: "multiple-choice",
    questionEn: "At Qigu Salt Mountain, seawater becomes salt. What physical change is this?",
    questionZh: "在台南七股鹽山，海水變成鹽巴。這是哪種物理變化？",
    optionsEn: ["Melting", "Evaporation", "Freezing", "Burning"],
    optionsZh: ["融化", "蒸發 (水份散失)", "結冰", "燃燒"],
    answerIndex: 1,
    skill: "Logic",
    blindSpot: "States of matter"
  },
  {
    id: "d-2",
    biome: "desert",
    subject: "math",
    type: "short-answer",
    questionEn: "Midnight temp is 5°C. At noon it rises by 12°C, then drops 4°C at night. Current temp?",
    questionZh: "半夜氣溫 5°C。中午上升了 12°C，晚上又下降了 4°C。請問現在幾度？",
    answerTextEn: "13",
    answerTextZh: "13",
    skill: "Calculation",
    blindSpot: "Sequential calculation"
  },
  {
    id: "d-3",
    biome: "desert",
    subject: "bio",
    type: "multiple-choice",
    questionEn: "Why do plants in dry badlands often have thick, fleshy stems?",
    questionZh: "為什麼生長在乾燥惡地的植物（如仙人掌），莖通常很肥厚？",
    optionsEn: ["To look tall", "To store water", "To scare birds", "No reason"],
    optionsZh: ["為了長高", "為了儲存水分", "為了嚇跑鳥類", "沒原因"],
    answerIndex: 1,
    skill: "Observation",
    blindSpot: "Adaptation function"
  },
  {
    id: "d-4",
    biome: "desert",
    subject: "math",
    type: "short-answer",
    questionEn: "Solar panels cover 20% of a 500m² roof. How many m² are covered?",
    questionZh: "太陽能板覆蓋了 500 平方公尺屋頂的 20%。請問覆蓋面積是多少平方公尺？",
    answerTextEn: "100",
    answerTextZh: "100",
    skill: "Calculation",
    blindSpot: "Percentage calculation"
  },
  {
    id: "d-5",
    biome: "desert",
    subject: "bio",
    type: "multiple-choice",
    questionEn: "Which animal is NOT a reptile found in hot areas?",
    questionZh: "下列哪一種動物「不是」常出沒在炎熱地區的爬蟲類？",
    optionsEn: ["Lizard", "Snake", "Gecko", "Frog"],
    optionsZh: ["蜥蜴", "蛇", "壁虎", "青蛙 (兩棲類)"],
    answerIndex: 3,
    skill: "Knowledge",
    blindSpot: "Classification (Amphibian vs Reptile)"
  },
  {
    id: "d-6",
    biome: "desert",
    subject: "chem",
    type: "multiple-choice",
    questionEn: "Badlands soil is extremely alkaline. If you pour vinegar (acid) on it, what happens?",
    questionZh: "惡地的土壤通常是強鹼性。如果你倒醋（酸性）在含有碳酸鈣的土上，會發生什麼事？",
    optionsEn: ["Nothing", "It explodes", "Bubbles (Neutralization)", "It turns into gold"],
    optionsZh: ["沒反應", "爆炸", "產生氣泡 (酸鹼中和/產生氣體)", "變成黃金"],
    answerIndex: 2,
    skill: "Logic",
    blindSpot: "Chemical reaction (Acid+Base)"
  },
  {
    id: "d-7",
    biome: "desert",
    subject: "math",
    type: "short-answer",
    questionEn: "Water rationing: You have 12 liters. You drink 1.5 liters per day. How many days will it last?",
    questionZh: "限水演習：你有 12 公升的水。每天喝 1.5 公升。請問可以喝幾天？",
    answerTextEn: "8",
    answerTextZh: "8",
    skill: "Calculation",
    blindSpot: "Decimal division"
  }
];