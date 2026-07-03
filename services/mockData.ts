import { Exam, Subject, Topic, Quiz, MockTest, BlogItem, NotificationItem, LeaderboardUser, QuizQuestion } from "@/types";

// ─────────────────────────────────────────────
//  4 FOCUSED EXAMS — Real data, no fake stats
// ─────────────────────────────────────────────
export const EXAMS_DATA: Exam[] = [
  {
    id: "wbp-constable",
    name: "WBP Constable (পশ্চিমবঙ্গ পুলিশ কনস্টেবল)",
    description: "West Bengal Police Recruitment Board conducts this exam for Constable posts in state police force.",
    iconName: "Shield",
    activeStudents: 0,
    totalQuestions: 0,
    totalMockTests: 0,
    details: "Written exam: 85 marks | 85 questions | 60 minutes | OMR-based MCQ | Negative marking: 0.25 per wrong answer. After written test: PMT (Physical Measurement Test), PET (Physical Efficiency Test), Interview (15 marks), Medical Examination.",
    officialLink: "https://prb.wb.gov.in",
    syllabus: [
      "General Awareness & GK — 25 Questions (25 Marks): Indian History, WB Geography, Polity, Economy, Current Affairs, General Science",
      "Elementary Mathematics — 25 Questions (25 Marks): Arithmetic (Madhyamik level) — %, Profit/Loss, Ratio, Time-Work, SI/CI, Mensuration",
      "Reasoning & Logical Analysis — 25 Questions (25 Marks): Analogy, Blood Relations, Coding-Decoding, Series, Visual Memory",
      "English — 10 Questions (10 Marks): Grammar, Vocabulary, Comprehension, Synonyms/Antonyms"
    ],
    examPattern: {
      totalQuestions: 85,
      totalMarks: 85,
      durationMinutes: 60,
      negativeMarking: 0.25,
      sections: [
        { name: "General Awareness & GK", questions: 25, marks: 25 },
        { name: "Elementary Mathematics", questions: 25, marks: 25 },
        { name: "Reasoning & Logical Analysis", questions: 25, marks: 25 },
        { name: "English", questions: 10, marks: 10 }
      ]
    },
    selectionProcess: [
      "Written Examination (OMR-based MCQ)",
      "PMT — Physical Measurement Test",
      "PET — Physical Efficiency Test",
      "Interview / Personality Test (15 marks)",
      "Medical Examination"
    ],
    subjectIds: ["gk-general", "mathematics", "reasoning", "english"],
    notifications: [
      {
        id: "wbp-n1",
        title: "WBP Constable 2024 Recruitment Notification",
        type: "Recruitment",
        date: "2024-11-15",
        desc: "West Bengal Police Recruitment Board released official notification for Constable vacancies. Check eligibility criteria and apply online.",
        officialLink: "https://prb.wb.gov.in"
      },
      {
        id: "wbp-n2",
        title: "WBP Constable Admit Card Download",
        type: "Admit Card",
        date: "2024-12-10",
        desc: "Admit cards for WBP Constable Written Exam are available for download. Use your application number to download.",
        officialLink: "https://prb.wb.gov.in"
      },
      {
        id: "wbp-n3",
        title: "WBP Constable PMT/PET Schedule Released",
        type: "Exam Date",
        date: "2025-01-05",
        desc: "Physical Measurement and Efficiency Test schedule published. Report to designated centers with original documents.",
        officialLink: "https://prb.wb.gov.in"
      }
    ],
    pyqs: [
      {
        year: 2023,
        questions: [
          {
            id: "wbp-2023-q1",
            question: "The Damodar Valley Corporation (DVC) is modeled after which American project?",
            options: ["Colorado River Project", "Tennessee Valley Authority (TVA)", "Hoover Dam Project", "Columbia River Project"],
            correctAnswerIndex: 1,
            explanation: "DVC (1948) was modeled on the Tennessee Valley Authority (TVA) of the USA and is often called the 'TVA of India'. It manages the Damodar River basin across West Bengal and Jharkhand."
          },
          {
            id: "wbp-2023-q2",
            question: "Which is the state animal of West Bengal?",
            options: ["Royal Bengal Tiger", "Fishing Cat", "One-horned Rhinoceros", "Elephant"],
            correctAnswerIndex: 1,
            explanation: "The Fishing Cat (Prionailurus viverrinus) is the official state animal of West Bengal. It is categorised as 'Vulnerable' by IUCN."
          },
          {
            id: "wbp-2023-q3",
            question: "A train 150 m long passes a pole in 15 seconds. What is the speed of the train?",
            options: ["8 m/s", "10 m/s", "12 m/s", "15 m/s"],
            correctAnswerIndex: 1,
            explanation: "Speed = Distance ÷ Time = 150 ÷ 15 = 10 m/s"
          },
          {
            id: "wbp-2023-q4",
            question: "Choose the correct synonym of 'Benevolent':",
            options: ["Cruel", "Generous", "Selfish", "Arrogant"],
            correctAnswerIndex: 1,
            explanation: "'Benevolent' means well-meaning and kindly. 'Generous' is its closest synonym."
          }
        ]
      },
      {
        year: 2022,
        questions: [
          {
            id: "wbp-2022-q1",
            question: "The Sundarbans mangrove forest is a UNESCO World Heritage Site since which year?",
            options: ["1985", "1987", "1992", "1999"],
            correctAnswerIndex: 1,
            explanation: "The Sundarbans was inscribed as a UNESCO World Heritage Site in 1987. It is the world's largest mangrove delta."
          },
          {
            id: "wbp-2022-q2",
            question: "If 6 men can do a piece of work in 12 days, in how many days can 9 men do the same work?",
            options: ["6 days", "8 days", "10 days", "12 days"],
            correctAnswerIndex: 1,
            explanation: "Work = 6 × 12 = 72 man-days. Days for 9 men = 72 ÷ 9 = 8 days."
          }
        ]
      }
    ]
  },
  {
    id: "ssc-gd",
    name: "SSC GD Constable (এসএসসি জিডি কনস্টেবল)",
    description: "Staff Selection Commission recruits Constables for BSF, CISF, CRPF, SSB, ITBP, AR, SSF and NCB.",
    iconName: "ShieldCheck",
    activeStudents: 0,
    totalQuestions: 0,
    totalMockTests: 0,
    details: "Computer-Based Exam: 80 questions | 160 marks | 60 minutes | 4 sections | Negative marking: 0.25 per wrong answer. Followed by: Physical Standards Test (PST), Physical Efficiency Test (PET), Medical Examination.",
    officialLink: "https://ssc.gov.in",
    syllabus: [
      "General Intelligence & Reasoning — 20 Questions (40 Marks): Analogies, Similarities/Differences, Spatial Visualization, Number Series, Coding-Decoding",
      "General Knowledge & General Awareness — 20 Questions (40 Marks): History, Culture, Geography, Economy, Indian Constitution, Sports, Current Affairs",
      "Elementary Mathematics — 20 Questions (40 Marks): Number System, Percentages, Ratio, Profit/Loss, SI/CI, Mensuration, Time-Distance-Work",
      "English/Hindi — 20 Questions (40 Marks): Spot Error, Fill Blanks, Synonyms, Antonyms, Spellings, Idioms, One-word Substitution, Active/Passive Voice"
    ],
    examPattern: {
      totalQuestions: 80,
      totalMarks: 160,
      durationMinutes: 60,
      negativeMarking: 0.25,
      sections: [
        { name: "General Intelligence & Reasoning", questions: 20, marks: 40 },
        { name: "General Knowledge & Awareness", questions: 20, marks: 40 },
        { name: "Elementary Mathematics", questions: 20, marks: 40 },
        { name: "English / Hindi", questions: 20, marks: 40 }
      ]
    },
    selectionProcess: [
      "Computer-Based Examination (CBE)",
      "PST — Physical Standards Test",
      "PET — Physical Efficiency Test",
      "Medical Examination",
      "Document Verification"
    ],
    subjectIds: ["reasoning", "gk-general", "mathematics", "english"],
    notifications: [
      {
        id: "ssc-n1",
        title: "SSC GD Constable 2025 Notification Released",
        type: "Recruitment",
        date: "2025-09-01",
        desc: "SSC released the official notification for GD Constable 2025 with thousands of vacancies across BSF, CRPF, CISF, SSB, ITBP, AR, SSF, NCB.",
        officialLink: "https://ssc.gov.in"
      },
      {
        id: "ssc-n2",
        title: "SSC GD 2024 Final Result Published",
        type: "Result",
        date: "2025-05-20",
        desc: "Final merit list for SSC GD Constable 2024 has been published. Selected candidates to report for joining formalities.",
        officialLink: "https://ssc.gov.in"
      },
      {
        id: "ssc-n3",
        title: "SSC GD CBE Exam Date 2025",
        type: "Exam Date",
        date: "2025-11-10",
        desc: "Computer-Based Examination for SSC GD 2025 scheduled from November 2025. Admit cards will be released 2 weeks before exam.",
        officialLink: "https://ssc.gov.in"
      }
    ],
    pyqs: [
      {
        year: 2024,
        questions: [
          {
            id: "ssc-2024-q1",
            question: "Which river is known as the 'Ganga of the South'?",
            options: ["Godavari", "Krishna", "Kaveri", "Mahanadi"],
            correctAnswerIndex: 0,
            explanation: "The Godavari river is often called the 'Ganga of the South' or 'Dakshin Ganga'. It is the second-longest river in India."
          },
          {
            id: "ssc-2024-q2",
            question: "The ratio of two numbers is 3:5 and their HCF is 6. Find their LCM.",
            options: ["60", "90", "120", "150"],
            correctAnswerIndex: 1,
            explanation: "Numbers are 3×6 = 18 and 5×6 = 30. LCM(18, 30) = 90. Or use: LCM = (a×b) ÷ HCF = (18×30) ÷ 6 = 90."
          },
          {
            id: "ssc-2024-q3",
            question: "In a certain code, COMPUTER is written as RFUVQNPC. How will PRINTER be written?",
            options: ["SFUQMHSF", "QSJOUFQ", "SFUJOFSQ", "SFUOFSQ"],
            correctAnswerIndex: 0,
            explanation: "Each letter is shifted by +1 in the alphabet and the word is reversed. P→Q, R→S, I→J, N→O, T→U, E→F, R→S → QSJOUFQ reversed = SFUJOFSQ... (pattern-based)"
          }
        ]
      },
      {
        year: 2023,
        questions: [
          {
            id: "ssc-2023-q1",
            question: "Who is the author of the Indian national anthem 'Jana Gana Mana'?",
            options: ["Bankim Chandra Chattopadhyay", "Rabindranath Tagore", "Subramania Bharati", "Sarojini Naidu"],
            correctAnswerIndex: 1,
            explanation: "Jana Gana Mana was composed and written by Rabindranath Tagore. It was first sung on December 27, 1911 at the Calcutta Session of Indian National Congress."
          },
          {
            id: "ssc-2023-q2",
            question: "Find the odd one out: 17, 23, 29, 33, 37",
            options: ["17", "29", "33", "37"],
            correctAnswerIndex: 2,
            explanation: "All others (17, 23, 29, 37) are prime numbers. 33 = 3 × 11, so it is not a prime number."
          }
        ]
      }
    ]
  },
  {
    id: "agniveer-army",
    name: "Agniveer Army (অগ্নিবীর সেনাবাহিনী)",
    description: "Indian Army recruits Agniveers for 4-year short-service through rallies across India including Bengal.",
    iconName: "Star",
    activeStudents: 0,
    totalQuestions: 0,
    totalMockTests: 0,
    details: "CEE (Common Entrance Exam): 50 questions | 100 marks | 60 minutes | Online CBT | Negative marking: 0.5 per wrong answer. Physical fitness test conducted at Rally sites before written exam.",
    officialLink: "https://joinindianarmy.nic.in",
    syllabus: [
      "General Knowledge — 15 Questions (30 Marks): Current Affairs, Indian History, Geography, Sports, Awards, Indian Constitution, Major Organisations",
      "General Science — 15 Questions (30 Marks): Physics, Chemistry, Biology — Class 10 level NCERT standard",
      "Mathematics — 15 Questions (30 Marks): Number Systems, Percentages, Profit/Loss, Ratio, Geometry, Mensuration, Trigonometry (basic)",
      "Logical Reasoning — 5 Questions (10 Marks): Patterns, Coding-Decoding, Analogies, Problem-Solving"
    ],
    examPattern: {
      totalQuestions: 50,
      totalMarks: 100,
      durationMinutes: 60,
      negativeMarking: 0.5,
      sections: [
        { name: "General Knowledge", questions: 15, marks: 30 },
        { name: "General Science", questions: 15, marks: 30 },
        { name: "Mathematics", questions: 15, marks: 30 },
        { name: "Logical Reasoning", questions: 5, marks: 10 }
      ]
    },
    selectionProcess: [
      "Registration on joinindianarmy.nic.in",
      "Physical Fitness Test (PFT) at Rally",
      "Physical Measurement Test",
      "Medical Examination at Rally",
      "Common Entrance Exam (CEE) — Computer-Based",
      "Document Verification & Merit List"
    ],
    subjectIds: ["gk-general", "science", "mathematics", "reasoning"],
    notifications: [
      {
        id: "agni-n1",
        title: "Agniveer Army Bengal Rally 2025 Dates Announced",
        type: "Recruitment",
        date: "2025-06-01",
        desc: "Army Recruitment Rally for Kolkata, North Bengal and Bankura region. Check rally dates, eligibility and registration process.",
        officialLink: "https://joinindianarmy.nic.in"
      },
      {
        id: "agni-n2",
        title: "Agniveer CEE Exam 2025 Schedule",
        type: "Exam Date",
        date: "2025-07-15",
        desc: "Online CEE (Common Entrance Exam) for Agniveer GD, Clerk/SKT, Technical and Tradesman categories scheduled.",
        officialLink: "https://joinindianarmy.nic.in"
      },
      {
        id: "agni-n3",
        title: "Agniveer 2024 Batch Joining Letter Issued",
        type: "Result",
        date: "2025-04-01",
        desc: "Selected Agniveers from 2024 batch have received joining letters. Training will commence at designated regimental centers.",
        officialLink: "https://joinindianarmy.nic.in"
      }
    ],
    pyqs: [
      {
        year: 2024,
        questions: [
          {
            id: "agni-2024-q1",
            question: "The Siachen Glacier is situated in which mountain range?",
            options: ["Himalayas", "Karakoram", "Hindukush", "Zanskar"],
            correctAnswerIndex: 1,
            explanation: "Siachen Glacier is located in the eastern Karakoram range of the Himalayas. At 76 km long, it is the world's longest non-polar glacier."
          },
          {
            id: "agni-2024-q2",
            question: "What is the chemical formula of common salt?",
            options: ["NaOH", "NaCl", "Na2CO3", "NaHCO3"],
            correctAnswerIndex: 1,
            explanation: "Common salt is Sodium Chloride (NaCl). NaOH is Sodium Hydroxide, Na2CO3 is Washing Soda, NaHCO3 is Baking Soda."
          },
          {
            id: "agni-2024-q3",
            question: "A shopkeeper sells an article at ₹540 making a profit of 8%. Find the cost price.",
            options: ["₹480", "₹500", "₹520", "₹490"],
            correctAnswerIndex: 1,
            explanation: "CP = SP × 100 ÷ (100 + Profit%) = 540 × 100 ÷ 108 = ₹500."
          }
        ]
      },
      {
        year: 2023,
        questions: [
          {
            id: "agni-2023-q1",
            question: "Operation Vijay (1999) was related to which conflict?",
            options: ["Sri Lanka Civil War", "Kargil War", "Bangladesh Liberation War", "Siachen Conflict"],
            correctAnswerIndex: 1,
            explanation: "Operation Vijay was the Indian military operation launched in 1999 to recapture Kargil heights from Pakistani forces. It resulted in Indian victory."
          },
          {
            id: "agni-2023-q2",
            question: "The velocity of sound in air is approximately:",
            options: ["232 m/s", "332 m/s", "432 m/s", "532 m/s"],
            correctAnswerIndex: 1,
            explanation: "The speed of sound in air at room temperature (20°C) is approximately 343 m/s. At 0°C it is about 332 m/s, which is the standard value used in exams."
          }
        ]
      }
    ]
  },
  {
    id: "wb-panchayat",
    name: "WB Panchayat (পশ্চিমবঙ্গ পঞ্চায়েত)",
    description: "Conducted by WB Department of Panchayats & Rural Development for Gram Panchayat and block-level posts.",
    iconName: "Building",
    activeStudents: 0,
    totalQuestions: 0,
    totalMockTests: 0,
    details: "Written Exam: 85 marks | OMR-based MCQ. Topics focus heavily on Panchayati Raj system, rural development schemes, and West Bengal governance. Interview: 15 marks.",
    officialLink: "https://wbprms.in",
    syllabus: [
      "General Knowledge & Rural Development — 25 Marks: Panchayati Raj Acts, WB rural schemes (MGNREGA, PMGSY), Indian Polity, WB Governance, Current Affairs",
      "Bengali Language — 25 Marks: Bengali Grammar, Comprehension, Synonyms/Antonyms, Translation, Proverbs",
      "Arithmetic — 25 Marks: Number System, HCF/LCM, Percentage, Ratio, Average, Profit/Loss, Time-Work, SI/CI",
      "English — 10 Marks: Basic Grammar, Vocabulary, Sentence Correction, Comprehension"
    ],
    examPattern: {
      totalQuestions: 85,
      totalMarks: 85,
      durationMinutes: 90,
      negativeMarking: 0,
      sections: [
        { name: "General Knowledge & Rural Development", questions: 25, marks: 25 },
        { name: "Bengali Language", questions: 25, marks: 25 },
        { name: "Arithmetic", questions: 25, marks: 25 },
        { name: "English", questions: 10, marks: 10 }
      ]
    },
    selectionProcess: [
      "Written Examination (OMR-based)",
      "Interview / Viva Voce (15 marks)",
      "Document Verification",
      "Merit-based Final Selection"
    ],
    subjectIds: ["gk-panchayat", "bengali", "mathematics", "english"],
    notifications: [
      {
        id: "panch-n1",
        title: "WB Gram Panchayat Recruitment 2024 — Apply Online",
        type: "Recruitment",
        date: "2024-08-20",
        desc: "Department of Panchayats & Rural Development, WB released notification for various Gram Panchayat posts. Visit wbprms.in to apply.",
        officialLink: "https://wbprms.in"
      },
      {
        id: "panch-n2",
        title: "WB Panchayat Written Exam Admit Card",
        type: "Admit Card",
        date: "2024-10-01",
        desc: "Admit cards for Panchayat written examination available. Download using registration number from official portal.",
        officialLink: "https://wbprms.in"
      },
      {
        id: "panch-n3",
        title: "WB Panchayat 2024 Exam Result Published",
        type: "Result",
        date: "2025-01-15",
        desc: "Results for WB Gram Panchayat written exam 2024 have been declared. Qualified candidates to appear for interview round.",
        officialLink: "https://wbprms.in"
      }
    ],
    pyqs: [
      {
        year: 2024,
        questions: [
          {
            id: "panch-2024-q1",
            question: "Under which Article of the Indian Constitution are Panchayati Raj institutions established?",
            options: ["Article 40", "Article 243", "Article 246", "Article 356"],
            correctAnswerIndex: 1,
            explanation: "Part IX (Articles 243 to 243O) of the Constitution deals with Panchayati Raj. The 73rd Constitutional Amendment (1992) inserted this Part, giving constitutional status to Panchayati Raj institutions."
          },
          {
            id: "panch-2024-q2",
            question: "MGNREGA guarantees employment of how many days per year per household?",
            options: ["50 days", "100 days", "150 days", "200 days"],
            correctAnswerIndex: 1,
            explanation: "MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act, 2005) guarantees at least 100 days of wage employment per year to every rural household whose adult members volunteer to do unskilled manual work."
          },
          {
            id: "panch-2024-q3",
            question: "'বাংলার মুখ আমি দেখিয়াছি' — এই কবিতার রচয়িতা কে?",
            options: ["রবীন্দ্রনাথ ঠাকুর", "জীবনানন্দ দাশ", "নজরুল ইসলাম", "সুকান্ত ভট্টাচার্য"],
            correctAnswerIndex: 1,
            explanation: "'বাংলার মুখ আমি দেখিয়াছি' কবিতাটি জীবনানন্দ দাশের বিখ্যাত 'রূপসী বাংলা' কাব্যগ্রন্থ থেকে নেওয়া।"
          }
        ]
      },
      {
        year: 2023,
        questions: [
          {
            id: "panch-2023-q1",
            question: "Which scheme provides rural households with electricity connections under Saubhagya?",
            options: ["DDUGJY", "PMGSY", "Saubhagya — PMSPY", "PMAY-G"],
            correctAnswerIndex: 2,
            explanation: "Pradhan Mantri Sahaj Bijli Har Ghar Yojana (Saubhagya), launched in 2017, aims to achieve universal household electrification by providing free electricity connections to poor rural households."
          },
          {
            id: "panch-2023-q2",
            question: "If 20% of a number is 80, what is 35% of that number?",
            options: ["120", "140", "160", "180"],
            correctAnswerIndex: 1,
            explanation: "20% of number = 80 → Number = 400. 35% of 400 = 140."
          }
        ]
      }
    ]
  }
];

// ─────────────────────────────────────────────
//  SUBJECTS — Shared across exams
// ─────────────────────────────────────────────
export const SUBJECTS_DATA: Subject[] = [
  {
    id: "gk-general",
    name: "General Knowledge & Current Affairs",
    description: "History, Geography, Polity, Economy, Sports, Awards & Current Events",
    iconName: "Globe",
    questionCount: 0,
    progress: 0,
    examIds: ["wbp-constable", "ssc-gd", "agniveer-army"]
  },
  {
    id: "gk-panchayat",
    name: "GK & Rural Development (পঞ্চায়েত বিষয়ক)",
    description: "Panchayati Raj, WB Govt Schemes, Rural Development, MGNREGA, Indian Polity",
    iconName: "Building",
    questionCount: 0,
    progress: 0,
    examIds: ["wb-panchayat"]
  },
  {
    id: "mathematics",
    name: "Elementary Mathematics (গণিত)",
    description: "Arithmetic: %, Profit/Loss, Ratio, Time-Work, SI/CI, Mensuration",
    iconName: "Calculator",
    questionCount: 0,
    progress: 0,
    examIds: ["wbp-constable", "ssc-gd", "agniveer-army", "wb-panchayat"]
  },
  {
    id: "reasoning",
    name: "Reasoning & Logical Analysis (যুক্তি)",
    description: "Analogy, Blood Relations, Coding-Decoding, Number Series, Visual Puzzles",
    iconName: "Brain",
    questionCount: 0,
    progress: 0,
    examIds: ["wbp-constable", "ssc-gd", "agniveer-army"]
  },
  {
    id: "english",
    name: "English Language (ইংরেজি)",
    description: "Grammar, Vocabulary, Comprehension, Synonyms, Antonyms, One-word Substitution",
    iconName: "BookOpen",
    questionCount: 0,
    progress: 0,
    examIds: ["wbp-constable", "ssc-gd", "wb-panchayat"]
  },
  {
    id: "science",
    name: "General Science (সাধারণ বিজ্ঞান)",
    description: "Physics, Chemistry, Biology — Class 10 NCERT standard",
    iconName: "Atom",
    questionCount: 0,
    progress: 0,
    examIds: ["agniveer-army"]
  },
  {
    id: "bengali",
    name: "Bengali Language (বাংলা ভাষা)",
    description: "Bengali Grammar, Comprehension, Synonyms/Antonyms, Translation, Proverbs",
    iconName: "PenTool",
    questionCount: 0,
    progress: 0,
    examIds: ["wb-panchayat"]
  }
];

// ─────────────────────────────────────────────
//  TOPICS — Topic-wise notes with reference links
// ─────────────────────────────────────────────
export const TOPICS_DATA: Topic[] = [

  // ── GK GENERAL ──────────────────────────────
  {
    id: "indian-history-freedom",
    subjectId: "gk-general",
    name: "Indian National Movement (স্বাধীনতা আন্দোলন)",
    description: "Freedom struggle milestones, major movements, leaders and Acts",
    questionsCount: 0,
    referenceLinks: [
      { label: "NCERT History — Class 10 (Free PDF)", url: "https://ncert.nic.in/textbook.php?jess2=0-9" },
      { label: "Wikipedia — Indian independence movement", url: "https://en.wikipedia.org/wiki/Indian_independence_movement" }
    ],
    notesContent: `## Indian National Movement — Key Points

### Indian National Congress (INC)
- **Founded**: December 1885, Bombay
- **Founder**: A.O. Hume (retired British civil servant)
- **First President**: Womesh Chandra Bonnerjee
- **First Session**: 72 delegates attended

### Major Phases & Movements

| Movement | Year | Leader | Key Fact |
|:---|:---|:---|:---|
| Swadeshi Movement | 1905 | Bal, Pal, Lal | Against partition of Bengal |
| Non-Cooperation Movement | 1920 | Mahatma Gandhi | Khilafat issue |
| Civil Disobedience | 1930 | Gandhi | Salt March (Dandi March, 241 miles) |
| Quit India Movement | 1942 | Gandhi | "Do or Die" — August 8, Bombay |

### Important Acts
- **Indian Councils Act 1892** — First step toward representation
- **Morley-Minto Reforms 1909** — Communal electorate introduced
- **Montagu-Chelmsford Reforms 1919** — Dyarchy introduced
- **Government of India Act 1935** — Provincial autonomy

### West Bengal Specific
- **Partition of Bengal**: 1905 by Lord Curzon, reunited 1911
- **Swadeshi Movement** originated in Bengal
- **Alipore Bomb Case 1908** — Aurobindo Ghosh acquitted
- **Chittagong Armory Raid 1930** — Surya Sen (Master da)

> 📖 **Reference**: [NCERT India and the Contemporary World — Chapter 2](https://ncert.nic.in/textbook.php?jess2=0-9)`
  },
  {
    id: "wb-geography",
    subjectId: "gk-general",
    name: "West Bengal Geography (পশ্চিমবঙ্গের ভূগোল)",
    description: "Physiography, rivers, districts, borders and important places of West Bengal",
    questionsCount: 0,
    referenceLinks: [
      { label: "West Bengal Govt — Official Geography Info", url: "https://wb.gov.in/about-west-bengal.aspx" },
      { label: "Wikipedia — West Bengal Geography", url: "https://en.wikipedia.org/wiki/West_Bengal#Geography" }
    ],
    notesContent: `## West Bengal Geography — Key Facts

### Basic Facts
- **Area**: 88,752 sq km (13th largest state)
- **Districts**: 23 districts
- **Capital**: Kolkata
- **Bordering Countries**: Bangladesh (east), Bhutan (north), Nepal (north-west)
- **Bordering States**: Odisha, Jharkhand, Bihar, Sikkim, Assam

### Physiographic Zones
1. **Northern Himalayan Region** — Darjeeling, Kalimpong, Jalpaiguri
   - Highest Peak: **Sandakphu** (3,636 m) on Singalila Ridge
2. **Western Plateau (Rarh Region)** — Purulia, Bankura, Birbhum, Paschim Medinipur
   - Laterite soil, Ayodhya Hills (Gorgaburu 677 m)
3. **Gangetic Plains** — Central and south Bengal
4. **Coastal & Delta Region** — Sundarbans, Bay of Bengal coast

### Major Rivers
| River | Origin | Key Fact |
|:---|:---|:---|
| Ganga | Gangotri Glacier | Enters WB at Farakka |
| Teesta | Sikkim Himalayas | Divides North Bengal |
| Damodar | Jharkhand | "Sorrow of Bengal" (before DVC) |
| Hooghly | Ganga distributary | Port city of Kolkata |
| Rupnarayan | Kangsabati + Shilabati | Empties near Haldia |

### State Symbols
- **State Animal**: Fishing Cat (মেছো বিড়াল)
- **State Bird**: White-throated Kingfisher (মাছরাঙা)
- **State Flower**: Night Jasmine (শিউলি)
- **State Tree**: Chatim (Alstonia scholaris)
- **State Fish**: Rohu (রুই)

### Sundarbans
- World's largest mangrove delta
- UNESCO World Heritage Site: **1987**
- Shared between India and Bangladesh
- Home to Royal Bengal Tiger`
  },
  {
    id: "indian-polity-constitution",
    subjectId: "gk-general",
    name: "Indian Constitution & Polity (ভারতীয় সংবিধান)",
    description: "Important Articles, Fundamental Rights, Directive Principles, Governor, Parliament",
    questionsCount: 0,
    referenceLinks: [
      { label: "Constitution of India — Ministry of Law", url: "https://legislative.gov.in/constitution-of-india" },
      { label: "India.gov.in — Polity Overview", url: "https://www.india.gov.in/my-government/constitution-india" }
    ],
    notesContent: `## Indian Constitution — Key Points

### Basic Features
- **Adopted**: November 26, 1949 | **Effective**: January 26, 1950
- **Drafted by**: Dr. B.R. Ambedkar (Chairman, Drafting Committee)
- **Articles**: 395 originally (now 448 + 12 Schedules)
- **Borrowed from**: USA (Fundamental Rights), UK (Parliamentary system), Ireland (DPSP), Canada (Federalism)

### Fundamental Rights (Part III — Articles 12–35)
| Right | Articles |
|:---|:---|
| Right to Equality | 14–18 |
| Right to Freedom | 19–22 |
| Right against Exploitation | 23–24 |
| Right to Freedom of Religion | 25–28 |
| Cultural & Educational Rights | 29–30 |
| Right to Constitutional Remedies | 32 |

### Important Articles for Police/Army/Panchayat Exams
- **Article 40** — Organisation of Village Panchayats
- **Article 51A** — Fundamental Duties (11 duties)
- **Article 155** — Appointment of Governor
- **Article 243** — 73rd Amendment, Panchayati Raj
- **Article 356** — President's Rule (imposition in state)
- **Article 370** — Special Status of J&K (Abrogated 2019)

### Governor of West Bengal
- Appointed by President under **Article 155**
- Constitutional head of the state
- Current Governor: Check [Raj Bhavan website](https://rajbhavankolkata.gov.in)`
  },

  // ── MATHEMATICS ──────────────────────────────
  {
    id: "maths-percentage-profit",
    subjectId: "mathematics",
    name: "Percentage, Profit & Loss (শতাংশ, লাভ-ক্ষতি)",
    description: "Key formulas and shortcuts for % calculation, profit, loss, and discount problems",
    questionsCount: 0,
    referenceLinks: [
      { label: "NCERT Maths Class 8 — Chapter 8 (Comparing Quantities)", url: "https://ncert.nic.in/textbook.php?hemh1=0-16" },
      { label: "IndiaBIX — Profit & Loss Practice", url: "https://www.indiabix.com/aptitude/profit-and-loss/" }
    ],
    notesContent: `## Percentage, Profit & Loss — Formulas & Tricks

### Percentage Basics
- **x% of y** = (x × y) ÷ 100
- **% change** = (Change ÷ Original) × 100
- **Increase by x%**: New = Original × (1 + x/100)
- **Decrease by x%**: New = Original × (1 - x/100)

### Quick % Table (Memorize!)
| Fraction | % |
|:---|:---|
| 1/2 | 50% |
| 1/3 | 33.33% |
| 1/4 | 25% |
| 1/5 | 20% |
| 1/8 | 12.5% |
| 1/10 | 10% |

### Profit & Loss Formulas
- **Profit** = SP − CP
- **Loss** = CP − SP
- **Profit %** = (Profit ÷ CP) × 100
- **SP** = CP × (100 + Profit%) ÷ 100
- **CP** = SP × 100 ÷ (100 + Profit%)

### Shortcut Tricks
- If profit = x% and loss = x%, net result = **Loss of (x²/100)%**
- Successive discounts of a% and b% = effective discount of **(a + b − ab/100)%**

### Practice Examples
> A shopkeeper buys an article for ₹500 and sells at 20% profit. SP = 500 × 120/100 = **₹600**

> An article is sold at ₹540 at 8% profit. CP = 540 × 100/108 = **₹500**`
  },
  {
    id: "maths-ratio-time-work",
    subjectId: "mathematics",
    name: "Ratio, Time & Work, Speed (অনুপাত, কাজ, গতি)",
    description: "Ratio/proportion, time-work, pipes-cisterns, speed-time-distance shortcuts",
    questionsCount: 0,
    referenceLinks: [
      { label: "NCERT Maths Class 8 — Chapter 13 (Direct & Inverse Proportion)", url: "https://ncert.nic.in/textbook.php?hemh1=0-16" },
      { label: "IndiaBIX — Time and Work Practice", url: "https://www.indiabix.com/aptitude/time-and-work/" }
    ],
    notesContent: `## Ratio, Time & Work, Speed-Distance — Key Formulas

### Ratio & Proportion
- Ratio a:b = a/b
- If a:b = c:d → a×d = b×c (cross multiplication)
- **Compound Ratio** of a:b and c:d = ac:bd

### Time & Work
- If A can do work in **n** days → A's 1 day work = **1/n**
- If A does 1/n and B does 1/m per day → Together = **1/n + 1/m**
- **Total time together** = nm/(n+m) days

#### Trick: Work Equivalence
> If 6 men do work in 12 days:
> Total work = 6 × 12 = **72 man-days**
> For 9 men → 72 ÷ 9 = **8 days**

### Speed, Distance, Time
- **Speed** = Distance ÷ Time
- **Distance** = Speed × Time
- **Average Speed** = 2S₁S₂/(S₁+S₂) [for equal distances]

### Trains
- Train passing a **pole** (stationary point): Distance = Length of train
- Train crossing a **platform**: Distance = Length of train + Length of platform
- Two trains in **same direction**: Relative Speed = |S₁ − S₂|
- Two trains in **opposite direction**: Relative Speed = S₁ + S₂

### Simple & Compound Interest
- **SI** = P × R × T / 100
- **CI** = P × (1 + R/100)ᵀ − P
- If money doubles in n years (CI) → it becomes 8x in **3n years**`
  },

  // ── REASONING ──────────────────────────────
  {
    id: "reasoning-series-coding",
    subjectId: "reasoning",
    name: "Number Series & Coding-Decoding (ধারা ও কোডিং)",
    description: "Number/letter series patterns, coding-decoding rules and practice methods",
    questionsCount: 0,
    referenceLinks: [
      { label: "IndiaBIX — Number Series Practice", url: "https://www.indiabix.com/logical-reasoning/number-series/" },
      { label: "IndiaBIX — Coding-Decoding Practice", url: "https://www.indiabix.com/logical-reasoning/coding-decoding/" }
    ],
    notesContent: `## Number Series & Coding-Decoding

### Number Series — Common Patterns
1. **Arithmetic Series**: Add/subtract a fixed number (e.g., 3,6,9,12... +3)
2. **Geometric Series**: Multiply/divide by a fixed number (e.g., 2,6,18,54... ×3)
3. **Square Series**: 1,4,9,16,25... (n²)
4. **Cube Series**: 1,8,27,64,125... (n³)
5. **Prime Series**: 2,3,5,7,11,13... (prime numbers)
6. **Mixed/Alternate**: Two alternate series mixed together

### How to Solve Series Questions
- Step 1: Find differences between consecutive terms
- Step 2: If differences are constant → Arithmetic
- Step 3: If differences form a pattern → find that pattern
- Step 4: Check for squares/cubes if differences grow rapidly

### Coding-Decoding — Rules
**Type 1 — Letter Shift**: Each letter shifted by fixed positions
- A→D, B→E... (shift +3) or Z→W, Y→X... (shift -3)

**Type 2 — Reverse Alphabet**: A=Z, B=Y, C=X...
- A(1)→Z(26), B(2)→Y(25)

**Type 3 — Number Coding**
- A=1, B=2... Z=26 OR A=26, B=25... Z=1

### Example
> If MANGO → NBPHI (each letter +1), then APPLE → ?
> A+1=B, P+1=Q, P+1=Q, L+1=M, E+1=F → **BQQMF**`
  },
  {
    id: "reasoning-analogy-blood",
    subjectId: "reasoning",
    name: "Analogy & Blood Relations (সাদৃশ্য ও রক্তসম্পর্ক)",
    description: "Analogy patterns and solving blood relation puzzles step by step",
    questionsCount: 0,
    referenceLinks: [
      { label: "IndiaBIX — Analogy Practice", url: "https://www.indiabix.com/verbal-reasoning/analogy/" },
      { label: "IndiaBIX — Blood Relations", url: "https://www.indiabix.com/logical-reasoning/blood-relation/" }
    ],
    notesContent: `## Analogy & Blood Relations

### Analogy Types
1. **Object & Use**: Pen → Writing :: Knife → Cutting
2. **Cause & Effect**: Fire → Heat :: Ice → Cold
3. **Part & Whole**: Chapter → Book :: Room → House
4. **Synonym/Antonym**: Day → Night :: Hot → Cold
5. **Number Analogy**: 4:16 :: 6:36 (square pattern)

### Blood Relation — Key Terms
| English | Relation |
|:---|:---|
| Father's/Mother's son | Brother |
| Father's/Mother's daughter | Sister |
| Father's brother | Uncle (চাচা/জেঠা) |
| Mother's brother | Maternal Uncle (মামা) |
| Father's sister | Aunt (ফুপু/পিসি) |
| Husband's/Wife's father | Father-in-law |

### Solving Technique — Use a Family Tree
1. Draw each person as a node
2. Use arrows to show parent-child relation
3. Use horizontal lines for siblings/spouses
4. Count the steps to find the relation

### Example
> "A is B's father. C is A's sister. D is C's mother. What is D to B?"
> D → C (mother) → A (sibling) → B (child)
> D is B's **Grandmother (দিদিমা/ঠাকুরমা)**`
  },

  // ── ENGLISH ──────────────────────────────
  {
    id: "english-grammar-basics",
    subjectId: "english",
    name: "English Grammar Essentials (ইংরেজি ব্যাকরণ)",
    description: "Tenses, articles, prepositions, voice, narration — exam-focused rules",
    questionsCount: 0,
    referenceLinks: [
      { label: "NCERT English Grammar — Free Download", url: "https://ncert.nic.in/" },
      { label: "BankExamsToday — English for Competitive Exams", url: "https://www.bankexamstoday.com/english-practice-set" }
    ],
    notesContent: `## English Grammar — Exam-Focused Rules

### Tenses Quick Reference
| Tense | Structure | Signal Words |
|:---|:---|:---|
| Simple Present | V1 / V1+s/es | always, usually, every day |
| Present Continuous | is/am/are + V-ing | now, at present |
| Simple Past | V2 | yesterday, ago, last... |
| Past Continuous | was/were + V-ing | while, when |
| Present Perfect | has/have + V3 | just, already, yet, ever |
| Future Simple | will + V1 | tomorrow, next week |

### Articles (a, an, the)
- **a** before consonant sounds: a book, a university
- **an** before vowel sounds: an apple, an hour
- **the** for specific things: the Sun, the Ganga

### Active & Passive Voice
- **Active**: Subject + Verb + Object
  > "Ram writes a letter."
- **Passive**: Object + is/am/are + V3 + by Subject
  > "A letter is written by Ram."

### Common Synonyms/Antonyms (Exam Favorites)
| Word | Synonym | Antonym |
|:---|:---|:---|
| Benevolent | Generous | Cruel |
| Ambiguous | Unclear | Clear |
| Diligent | Hardworking | Lazy |
| Jovial | Cheerful | Gloomy |
| Abundant | Plentiful | Scarce |`
  },

  // ── SCIENCE ──────────────────────────────
  {
    id: "science-physics-basics",
    subjectId: "science",
    name: "Physics — Laws & Basic Concepts (পদার্থবিজ্ঞান)",
    description: "Newton's laws, motion, electricity, force, energy — Class 10 level",
    questionsCount: 0,
    referenceLinks: [
      { label: "NCERT Science Class 10 (Free PDF)", url: "https://ncert.nic.in/textbook.php?jesc1=0-16" },
      { label: "Wikipedia — Newton's Laws of Motion", url: "https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion" }
    ],
    notesContent: `## Physics — Key Concepts for Army/Police Exams

### Newton's Laws of Motion
1. **First Law (Inertia)**: A body at rest stays at rest; in motion stays in motion unless acted upon by external force.
2. **Second Law**: Force = Mass × Acceleration (F = ma)
3. **Third Law**: Every action has an equal and opposite reaction.

### Units (SI System)
| Quantity | Unit | Symbol |
|:---|:---|:---|
| Length | Metre | m |
| Mass | Kilogram | kg |
| Time | Second | s |
| Force | Newton | N |
| Energy | Joule | J |
| Power | Watt | W |
| Current | Ampere | A |
| Temperature | Kelvin | K |

### Important Values to Memorize
- Speed of light: **3 × 10⁸ m/s**
- Speed of sound in air: **343 m/s (at 20°C)**
- Acceleration due to gravity: **9.8 m/s²** (use 10 for quick calculation)
- Boiling point of water: **100°C = 373 K**
- Freezing point of water: **0°C = 273 K**

### Electricity
- **Ohm's Law**: V = IR (Voltage = Current × Resistance)
- **Power**: P = VI = I²R = V²/R
- **Series Circuit**: Total R = R₁ + R₂ + R₃
- **Parallel Circuit**: 1/R = 1/R₁ + 1/R₂ + 1/R₃`
  },
  {
    id: "science-chemistry-basics",
    subjectId: "science",
    name: "Chemistry — Elements, Compounds & Reactions (রসায়ন)",
    description: "Chemical formulas, acids/bases, periodic table basics, reactions — Class 10 level",
    questionsCount: 0,
    referenceLinks: [
      { label: "NCERT Science Class 10 — Chapter 1 & 2", url: "https://ncert.nic.in/textbook.php?jesc1=0-16" },
      { label: "Periodic Table — Royal Chemistry Society", url: "https://www.rsc.org/periodic-table" }
    ],
    notesContent: `## Chemistry — Exam-Ready Facts

### Common Chemical Formulas (Must Know)
| Substance | Formula |
|:---|:---|
| Common Salt | NaCl |
| Baking Soda | NaHCO₃ |
| Washing Soda | Na₂CO₃ |
| Bleaching Powder | Ca(OCl)Cl |
| Quick Lime | CaO |
| Slaked Lime | Ca(OH)₂ |
| Water | H₂O |
| Vinegar (Acetic Acid) | CH₃COOH |
| Rust (Iron Oxide) | Fe₂O₃ |
| Plaster of Paris | CaSO₄·½H₂O |

### Acids & Bases
- **Acid**: pH < 7 (e.g., HCl, H₂SO₄, HNO₃)
- **Base**: pH > 7 (e.g., NaOH, KOH, Ca(OH)₂)
- **Neutral**: pH = 7 (pure water)
- **Indicator**: Litmus — Red in acid, Blue in base

### Metals vs Non-Metals
- **Most reactive metal**: Potassium (K) → Sodium (Na) → Calcium (Ca)
- **Least reactive**: Gold (Au), Platinum (Pt)
- **Non-metals**: Carbon, Sulphur, Phosphorus, Nitrogen, Oxygen

### Important GK Facts
- **Hardest natural substance**: Diamond (Carbon)
- **Heaviest metal**: Osmium (Os)
- **Most abundant element in Earth's crust**: Oxygen (46%)
- **Most abundant metal in Earth's crust**: Aluminium (Al)`
  },

  // ── GK PANCHAYAT ──────────────────────────────
  {
    id: "panchayat-raj-system",
    subjectId: "gk-panchayat",
    name: "Panchayati Raj System (পঞ্চায়েতি রাজ ব্যবস্থা)",
    description: "73rd Amendment, three-tier structure, Gram Sabha, Gram Panchayat functions",
    questionsCount: 0,
    referenceLinks: [
      { label: "Ministry of Panchayati Raj — Official Site", url: "https://panchayat.gov.in" },
      { label: "WB Panchayat Official Portal", url: "https://wbprms.in" },
      { label: "73rd Constitutional Amendment — Full Text", url: "https://legislative.gov.in/constitution-of-india" }
    ],
    notesContent: `## Panchayati Raj System — Complete Notes

### Constitutional Background
- **Article 40**: Original provision directing states to organise village panchayats
- **73rd Amendment Act 1992**: Gave constitutional status to Panchayati Raj
- **Came into force**: April 24, 1993 (now celebrated as **Panchayati Raj Day**)
- **Inserted**: Part IX (Articles 243 to 243O) and **11th Schedule** (29 subjects)

### Three-Tier Structure (West Bengal)
| Tier | Level | Name |
|:---|:---|:---|
| 1st Tier | Village level | **Gram Panchayat** |
| 2nd Tier | Block level | **Panchayat Samiti** |
| 3rd Tier | District level | **Zilla Parishad** |

### Gram Sabha
- Consists of **all registered voters** in a Gram Panchayat area
- Meets at least **twice a year**
- Approves plans, identifies beneficiaries for schemes

### Key Provisions of 73rd Amendment
- **Article 243B**: Constitution of Panchayats
- **Article 243C**: Composition of Panchayats
- **Article 243D**: Reservation of seats (1/3 for women, SC/ST as per population)
- **Article 243E**: Duration — 5 years term
- **Article 243G**: Powers and functions (29 subjects in 11th Schedule)
- **Article 243I**: State Finance Commission (every 5 years)
- **Article 243K**: State Election Commission for Panchayat elections

### Important Rural Development Schemes
| Scheme | Full Form | Purpose |
|:---|:---|:---|
| MGNREGA | Mahatma Gandhi NREGA | 100 days employment guarantee |
| PMGSY | Pradhan Mantri Gram Sadak Yojana | Rural roads |
| PMAY-G | PM Awas Yojana — Gramin | Rural housing |
| NRLM | National Rural Livelihood Mission | SHGs, credit linkage |
| Saubhagya | PMSPY | Rural electrification |
| Swachh Bharat Mission-G | — | Rural sanitation / ODF |`
  },
  {
    id: "wb-govt-schemes",
    subjectId: "gk-panchayat",
    name: "WB Government Schemes (পশ্চিমবঙ্গ সরকারি প্রকল্প)",
    description: "Lakshmir Bhandar, Swasthya Sathi, Krishak Bandhu and other flagship WB schemes",
    questionsCount: 0,
    referenceLinks: [
      { label: "West Bengal Government — Schemes", url: "https://wb.gov.in/government-initiatives-welfare-schemes.aspx" },
      { label: "Lakshmir Bhandar Scheme", url: "https://socialsecurity.wb.gov.in" }
    ],
    notesContent: `## West Bengal Government Schemes — Quick Reference

### Major Flagship Schemes

| Scheme | Launched | Beneficiary | Benefit |
|:---|:---|:---|:---|
| **Lakshmir Bhandar** | 2021 | Women (18–60 yrs) | ₹500/month (General), ₹1000/month (SC/ST) |
| **Swasthya Sathi** | 2016 | All WB families | Free health insurance up to ₹5 lakh/year |
| **Krishak Bandhu** | 2019 | Farmers | ₹4,000–10,000/acre crop insurance + life cover |
| **Kanyashree** | 2013 | Girl students | Scholarship to prevent child marriage |
| **Rupashree** | 2018 | Girls for marriage | ₹25,000 one-time grant for marriage |
| **Sabuj Sathi** | 2015 | Students (Class 9–12) | Free bicycles for school students |
| **Oikatan** | 2021 | Transgender community | Social welfare benefits |
| **Gatidhara** | — | Self-employed transport | Subsidized vehicle loan |
| **Lok Prasar** | — | OBC students | Pre-matric scholarship |
| **Jai Bangla** | 2021 | Old-age, widow, disabled | Consolidated pension scheme |

### Key Officers in Panchayat System
- **Gram Panchayat**: Pradhan (President), Upa-Pradhan (Vice-President), Sachiv (Secretary)
- **Panchayat Samiti**: Sabhapati, Sahakari Sabhapati, BDO (Block Development Officer)
- **Zilla Parishad**: Adhyaksha (President), Sahakari Adhyaksha, Executive Officer

### Important WB Acts for Panchayat Exam
- **WB Panchayat Act 1973**: Governs 3-tier Panchayati Raj in West Bengal
- **WB Municipal Act 1993**: Urban local bodies
- **WBPSC Act 1950**: Powers of Public Service Commission`
  },

  // ── BENGALI ──────────────────────────────
  {
    id: "bengali-grammar-basics",
    subjectId: "bengali",
    name: "Bengali Grammar (বাংলা ব্যাকরণ)",
    description: "Noun, verb, sentence structure, sandhi, samasa — essential grammar rules",
    questionsCount: 0,
    referenceLinks: [
      { label: "West Bengal Board — Bengali Textbook (Free)", url: "https://wbbse.wb.gov.in" },
      { label: "Bangla Academy Dictionary Online", url: "https://www.bnp.org.bd" }
    ],
    notesContent: `## Bengali Grammar — পরীক্ষার জন্য গুরুত্বপূর্ণ বিষয়

### বিভক্তি (Case Endings)
| বিভক্তি | ইংরেজি | উদাহরণ |
|:---|:---|:---|
| ১ম (প্রথমা) | Nominative | রাম যায় |
| ২য়া (কর্ম) | Accusative | রামকে দেখি |
| ৩য়া (করণ) | Instrumental | কলম দিয়ে লিখি |
| ৪র্থী (সম্প্রদান) | Dative | রামকে দাও |
| ৫মী (অপাদান) | Ablative | গাছ থেকে পাতা |
| ৬ষ্ঠী (সম্বন্ধ) | Genitive | রামের বই |
| ৭মী (অধিকরণ) | Locative | ঘরে আছি |

### সন্ধি (Sandhi) — মূল নিয়ম
- **স্বরসন্ধি**: অ+অ=আ (হিম+আলয়=হিমালয়), অ+আ=আ
- **ব্যঞ্জনসন্ধি**: উচ্চারণে মিলন হয়
- **বিসর্গসন্ধি**: বিসর্গ (ঃ) যুক্ত হয়

### সমাস (Compound Words)
| সমাসের নাম | উদাহরণ |
|:---|:---|
| দ্বন্দ্ব | মা-বাবা, দুধেভাতে |
| কর্মধারয় | নীলাকাশ, মহাজন |
| তৎপুরুষ | দেশভক্তি, রাজপুত্র |
| বহুব্রীহি | চতুর্ভুজ, সুলোচনা |
| অব্যয়ীভাব | প্রতিদিন, যথাসময় |

### গুরুত্বপূর্ণ প্রবাদ
- অতি লোভে তাঁতি নষ্ট — Greed leads to ruin
- আঁচল দিয়ে বাত আটকায় না — Cannot stop the inevitable
- কাঁচা বয়সে শেখা, পাকা বয়সে রাখা — Learn young, remember old

### বিখ্যাত সাহিত্যিক ও রচনা
| লেখক | বিখ্যাত রচনা |
|:---|:---|
| রবীন্দ্রনাথ ঠাকুর | গীতাঞ্জলি, গোরা, ঘরে বাইরে |
| শরৎচন্দ্র চট্টোপাধ্যায় | দেবদাস, পথের দাবী |
| বঙ্কিমচন্দ্র চট্টোপাধ্যায় | আনন্দমঠ, কপালকুণ্ডলা |
| জীবনানন্দ দাশ | রূপসী বাংলা, বনলতা সেন |`
  }
];

// ─────────────────────────────────────────────
//  SAMPLE QUESTIONS for Quizzes/Mock Tests
// ─────────────────────────────────────────────
export const SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: "sq1",
    question: "The Damodar Valley Corporation (DVC) was established in which year?",
    options: ["1944", "1948", "1950", "1956"],
    correctAnswerIndex: 1,
    explanation: "DVC was established in 1948, modeled on the Tennessee Valley Authority (TVA) of the USA. It manages flood control, irrigation, and power generation in the Damodar basin."
  },
  {
    id: "sq2",
    question: "Which is the state animal of West Bengal?",
    options: ["Royal Bengal Tiger", "Fishing Cat", "Indian Elephant", "Gaur"],
    correctAnswerIndex: 1,
    explanation: "The Fishing Cat (মেছো বিড়াল - Prionailurus viverrinus) is the official state animal of West Bengal, designated in 2012."
  },
  {
    id: "sq3",
    question: "Under which Amendment Act did Panchayati Raj get constitutional status?",
    options: ["69th Amendment", "71st Amendment", "73rd Amendment", "74th Amendment"],
    correctAnswerIndex: 2,
    explanation: "The 73rd Constitutional Amendment Act (1992), effective April 24, 1993, gave constitutional status to the Panchayati Raj institutions by inserting Part IX (Articles 243–243O)."
  },
  {
    id: "sq4",
    question: "MGNREGA guarantees how many days of employment per year per rural household?",
    options: ["50 days", "75 days", "100 days", "150 days"],
    correctAnswerIndex: 2,
    explanation: "MGNREGA (2005) guarantees at least 100 days of unskilled manual wage employment per year per rural household. Currently some states have extended this to 150 days."
  },
  {
    id: "sq5",
    question: "What is the chemical formula of Baking Soda?",
    options: ["NaCl", "Na₂CO₃", "NaHCO₃", "NaOH"],
    correctAnswerIndex: 2,
    explanation: "Baking Soda is Sodium Bicarbonate (NaHCO₃). NaCl is Common Salt, Na₂CO₃ is Washing Soda, and NaOH is Caustic Soda."
  },
  {
    id: "sq6",
    question: "A train 200 m long crosses a platform 100 m long at 54 km/h. How long does it take?",
    options: ["15 sec", "20 sec", "25 sec", "30 sec"],
    correctAnswerIndex: 1,
    explanation: "Total distance = 200 + 100 = 300 m. Speed = 54 km/h = 54 × 5/18 = 15 m/s. Time = 300 ÷ 15 = 20 seconds."
  },
  {
    id: "sq7",
    question: "Who wrote 'Jana Gana Mana', India's national anthem?",
    options: ["Bankim Chandra Chattopadhyay", "Rabindranath Tagore", "Sarojini Naidu", "Subramania Bharati"],
    correctAnswerIndex: 1,
    explanation: "Jana Gana Mana was written and composed by Rabindranath Tagore. It was first sung on December 27, 1911 at the Calcutta session of INC. Adopted as national anthem on January 24, 1950."
  },
  {
    id: "sq8",
    question: "The speed of sound in air at 0°C is approximately:",
    options: ["243 m/s", "332 m/s", "443 m/s", "556 m/s"],
    correctAnswerIndex: 1,
    explanation: "The speed of sound in air at 0°C is approximately 332 m/s. At room temperature (20°C) it is about 343 m/s."
  }
];

// ─────────────────────────────────────────────
//  MOCK QUIZZES
// ─────────────────────────────────────────────
export const MOCK_QUIZZES: Quiz[] = [
  {
    id: "quiz-wbp-gk",
    title: "WBP Constable — GK Practice Set 1",
    subjectId: "gk-general",
    subjectName: "General Knowledge",
    difficulty: "Medium",
    timeLimitMinutes: 5,
    questionsCount: 4,
    date: new Date().toISOString().split('T')[0],
    questions: [SAMPLE_QUESTIONS[0], SAMPLE_QUESTIONS[1], SAMPLE_QUESTIONS[6], SAMPLE_QUESTIONS[4]]
  },
  {
    id: "quiz-maths-practice",
    title: "Elementary Mathematics — Quick Practice",
    subjectId: "mathematics",
    subjectName: "Mathematics",
    difficulty: "Medium",
    timeLimitMinutes: 8,
    questionsCount: 3,
    date: new Date().toISOString().split('T')[0],
    questions: [SAMPLE_QUESTIONS[5], SAMPLE_QUESTIONS[3], SAMPLE_QUESTIONS[7]]
  },
  {
    id: "quiz-panchayat-gk",
    title: "WB Panchayat — GK & Rural Development Set 1",
    subjectId: "gk-panchayat",
    subjectName: "GK & Rural Development",
    difficulty: "Easy",
    timeLimitMinutes: 5,
    questionsCount: 3,
    date: new Date().toISOString().split('T')[0],
    questions: [SAMPLE_QUESTIONS[2], SAMPLE_QUESTIONS[3], SAMPLE_QUESTIONS[0]]
  }
];

// ─────────────────────────────────────────────
//  MOCK TESTS — Exam-specific
// ─────────────────────────────────────────────
export const MOCK_TESTS: MockTest[] = [
  {
    id: "mock-wbp-1",
    examId: "wbp-constable",
    examName: "WBP Constable",
    title: "WBP Constable — Full Mock Test 1 (Free)",
    durationMinutes: 60,
    totalQuestions: 8,
    totalMarks: 8,
    isPremium: false,
    questions: [
      SAMPLE_QUESTIONS[0], SAMPLE_QUESTIONS[1], SAMPLE_QUESTIONS[5],
      SAMPLE_QUESTIONS[6], SAMPLE_QUESTIONS[7], SAMPLE_QUESTIONS[2],
      SAMPLE_QUESTIONS[3], SAMPLE_QUESTIONS[4]
    ]
  },
  {
    id: "mock-ssc-gd-1",
    examId: "ssc-gd",
    examName: "SSC GD Constable",
    title: "SSC GD Constable — Full Mock Test 1 (Free)",
    durationMinutes: 60,
    totalQuestions: 8,
    totalMarks: 16,
    isPremium: false,
    questions: [
      SAMPLE_QUESTIONS[6], SAMPLE_QUESTIONS[2], SAMPLE_QUESTIONS[5],
      SAMPLE_QUESTIONS[7], SAMPLE_QUESTIONS[0], SAMPLE_QUESTIONS[1],
      SAMPLE_QUESTIONS[4], SAMPLE_QUESTIONS[3]
    ]
  },
  {
    id: "mock-agniveer-1",
    examId: "agniveer-army",
    examName: "Agniveer Army",
    title: "Agniveer Army GD — Full Mock Test 1 (Free)",
    durationMinutes: 60,
    totalQuestions: 8,
    totalMarks: 16,
    isPremium: false,
    questions: [
      SAMPLE_QUESTIONS[0], SAMPLE_QUESTIONS[4], SAMPLE_QUESTIONS[7],
      SAMPLE_QUESTIONS[5], SAMPLE_QUESTIONS[2], SAMPLE_QUESTIONS[6],
      SAMPLE_QUESTIONS[1], SAMPLE_QUESTIONS[3]
    ]
  },
  {
    id: "mock-panchayat-1",
    examId: "wb-panchayat",
    examName: "WB Panchayat",
    title: "WB Panchayat — Full Mock Test 1 (Free)",
    durationMinutes: 90,
    totalQuestions: 8,
    totalMarks: 8,
    isPremium: false,
    questions: [
      SAMPLE_QUESTIONS[2], SAMPLE_QUESTIONS[3], SAMPLE_QUESTIONS[6],
      SAMPLE_QUESTIONS[5], SAMPLE_QUESTIONS[0], SAMPLE_QUESTIONS[1],
      SAMPLE_QUESTIONS[4], SAMPLE_QUESTIONS[7]
    ]
  }
];

// ─────────────────────────────────────────────
//  BLOGS
// ─────────────────────────────────────────────
export const BLOGS_DATA: BlogItem[] = [
  {
    id: "blog-wbp-strategy",
    title: "WBP Constable 2025 — Complete Preparation Strategy",
    description: "Step-by-step study plan for WBP Constable written exam covering GK, Maths, Reasoning and English.",
    content: `## WBP Constable 2025 — Complete Strategy

### Exam Pattern Summary
- 85 Questions | 85 Marks | 60 Minutes | Negative marking 0.25

### Subject-wise Strategy

**General Awareness & GK (25 Marks)**
Focus on West Bengal-specific topics: Sandakphu, Sundarbans, state symbols, DVC, WB districts. Read newspaper daily.

**Mathematics (25 Marks)**
Target: Percentage, Profit/Loss, Ratio, Time-Work, SI/CI. These 5 topics cover 70% of questions.

**Reasoning (25 Marks)**
Practice Coding-Decoding, Number Series, Blood Relations daily. These are scoring areas.

**English (10 Marks)**
Learn 10 synonyms/antonyms daily. Practice tense correction and active-passive conversion.

### Monthly Study Plan
- Month 1: Complete GK syllabus + WB Geography
- Month 2: Mathematics all topics with shortcuts  
- Month 3: Reasoning full practice + English vocab
- Month 4: Full mock tests + revision`,
    author: "Exam Bangla Team",
    date: "2025-06-01",
    category: "WBP Constable",
    slug: "wbp-constable-preparation-strategy",
    readTime: "5 min read",
    tags: ["WBP Constable", "Police Exam", "Preparation"]
  },
  {
    id: "blog-ssc-gd-tips",
    title: "SSC GD 2025 — How to Score 130+ out of 160",
    description: "Topic-wise scoring strategy for SSC GD Constable Computer-Based Examination.",
    content: `## SSC GD 2025 — Scoring 130+ Strategy

### Exam Pattern
- 80 Questions | 160 Marks | 60 Minutes | 4 Sections (20 each) | -0.25 negative marking

### Scoring Plan (Section-wise)
- **Reasoning** (40 marks): Target 35+ — Easy to score with practice
- **GK** (40 marks): Target 28+ — Focus on History, Geography, Science
- **Maths** (40 marks): Target 32+ — Master Profit/Loss, Ratio, SI/CI
- **English** (40 marks): Target 30+ — Synonyms, Fill in blanks, Spotting errors

### Key Tips
1. Attempt Reasoning first (fastest section)
2. Skip difficult GK questions (come back later)
3. Never guess randomly (negative marking!)
4. Practice speed — 60 min for 80 questions = 45 sec per question`,
    author: "Exam Bangla Team",
    date: "2025-05-15",
    category: "SSC GD",
    slug: "ssc-gd-scoring-strategy",
    readTime: "4 min read",
    tags: ["SSC GD", "Central Exam", "Strategy"]
  }
];

// ─────────────────────────────────────────────
//  NOTIFICATIONS (Global)
// ─────────────────────────────────────────────
export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: "notif-wbp-2024",
    title: "WBP Constable 2024 — Official Notification Released",
    type: "Recruitment",
    date: "2024-11-15",
    desc: "West Bengal Police Recruitment Board released WBP Constable 2024 notification. Check eligibility and apply on prb.wb.gov.in.",
    officialLink: "https://prb.wb.gov.in"
  },
  {
    id: "notif-ssc-gd-2025",
    title: "SSC GD Constable 2025 — Apply Now",
    type: "Recruitment",
    date: "2025-09-01",
    desc: "Staff Selection Commission released GD Constable 2025 notification. Vacancies across BSF, CISF, CRPF, SSB, ITBP, AR.",
    officialLink: "https://ssc.gov.in"
  },
  {
    id: "notif-agni-rally",
    title: "Agniveer Army Bengal Rally 2025 Dates",
    type: "Exam Date",
    date: "2025-06-01",
    desc: "Army Recruitment Rally for Bengal region announced. Candidates must register on joinindianarmy.nic.in before appearing at rally.",
    officialLink: "https://joinindianarmy.nic.in"
  },
  {
    id: "notif-panchayat-2024",
    title: "WB Gram Panchayat Recruitment 2024 — Register",
    type: "Recruitment",
    date: "2024-08-20",
    desc: "Department of Panchayats & Rural Development, WB released recruitment notification. Visit wbprms.in for details.",
    officialLink: "https://wbprms.in"
  }
];

// ─────────────────────────────────────────────
//  LEADERBOARD
// ─────────────────────────────────────────────
export const LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, name: "Prasenjit Sen", district: "North 24 Parganas", xp: 12450, streak: 42 },
  { rank: 2, name: "Arpita Das", district: "Hooghly", xp: 11800, streak: 35 },
  { rank: 3, name: "Subrata Roy", district: "Kolkata", xp: 11250, streak: 28 },
  { rank: 4, name: "Moulinee Mitra", district: "Howrah", xp: 10900, streak: 19 },
  { rank: 5, name: "Imran Khan", district: "Murshidabad", xp: 10400, streak: 50 },
  { rank: 6, name: "Dipankar Pal", district: "Burdwan", xp: 9900, streak: 12 },
  { rank: 7, name: "Sneha Ghoshal", district: "Nadia", xp: 9550, streak: 8 },
  { rank: 8, name: "Rajesh Murmu", district: "Purulia", xp: 9100, streak: 21 },
  { rank: 9, name: "Rina Khatun", district: "Malda", xp: 8850, streak: 15 },
  { rank: 10, name: "Amitava Sen", district: "Darjeeling", xp: 8400, streak: 3 }
];
