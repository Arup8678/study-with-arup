// Catalog data for the Tech courses, the Spiritual section and the Spiritual Books library.
// Everything here is static starter content. To launch a course, set `status: "live"` and
// fill in the modules / price, or build a dedicated page like app/courses/psc-ido.

export type CourseStatus = "live" | "coming-soon";

export type CourseModule = {
  title: string;
  topics: string[];
};

export type TechCourse = {
  slug: string;
  title: string;
  titleBn: string;
  emoji: string;
  tagline: string;
  description: string;
  level: string;
  duration: string;
  status: CourseStatus;
  gradient: string; // tailwind gradient classes for the course header
  accent: string; // tailwind text colour for small accents
  outcomes: string[];
  modules: CourseModule[];
  tools: string[];
  freeResources: { label: string; href: string }[];
};

export const TECH_COURSES: TechCourse[] = [
  {
    slug: "ai",
    title: "Artificial Intelligence (AI) Foundations",
    titleBn: "কৃত্রিম বুদ্ধিমত্তা (AI)",
    emoji: "🤖",
    tagline: "From AI basics to building your first smart app",
    description:
      "Understand how modern AI works, learn Python for data, train simple machine-learning models and use AI tools (chatbots, image tools, APIs) safely and productively.",
    level: "Beginner → Intermediate",
    duration: "8 weeks (planned)",
    status: "coming-soon",
    gradient: "from-violet-600 to-indigo-700",
    accent: "text-violet-600 dark:text-violet-400",
    outcomes: [
      "Explain AI, Machine Learning, Deep Learning and Generative AI in simple words",
      "Write basic Python and work with data in NumPy / Pandas",
      "Train and test a simple ML model (classification & regression)",
      "Use AI chat tools and prompts effectively for study and work",
      "Build a small AI-powered project for your portfolio",
    ],
    modules: [
      { title: "Introduction to AI", topics: ["What is AI, ML, DL, GenAI", "History and real-life uses", "AI in government & industry (India)"] },
      { title: "Python for AI", topics: ["Python basics", "NumPy & Pandas", "Charts with Matplotlib"] },
      { title: "Machine Learning", topics: ["Supervised vs unsupervised", "Regression & classification", "Model accuracy and evaluation"] },
      { title: "Deep Learning & GenAI", topics: ["Neural networks (idea level)", "How LLMs / chatbots work", "Prompt writing"] },
      { title: "Responsible AI", topics: ["Bias and fairness", "Privacy & data safety", "Fact-checking AI output"] },
      { title: "Mini Project", topics: ["Pick a problem", "Build & present", "Certificate (planned)"] },
    ],
    tools: ["Python", "Google Colab", "NumPy", "Pandas", "scikit-learn"],
    freeResources: [
      { label: "Google Colab (free Python notebooks)", href: "https://colab.research.google.com" },
      { label: "Python official tutorial", href: "https://docs.python.org/3/tutorial/" },
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity Essentials",
    titleBn: "সাইবার সিকিউরিটি",
    emoji: "🛡️",
    tagline: "Protect yourself, your data and your organisation online",
    description:
      "Learn how cyber attacks happen and how to defend against them: networking basics, safe passwords, phishing and UPI fraud awareness, Linux basics, and an introduction to ethical hacking concepts and careers.",
    level: "Beginner",
    duration: "6 weeks (planned)",
    status: "coming-soon",
    gradient: "from-emerald-600 to-teal-700",
    accent: "text-emerald-600 dark:text-emerald-400",
    outcomes: [
      "Understand networks, IP addresses, ports and the internet",
      "Spot phishing, social engineering and UPI / OTP frauds",
      "Secure your phone, email and social accounts",
      "Use basic Linux commands",
      "Know the IT Act 2000 basics and how to report cyber crime (cybercrime.gov.in / 1930)",
    ],
    modules: [
      { title: "Cyber Basics", topics: ["CIA triad", "Types of threats", "Malware, ransomware, viruses"] },
      { title: "Networking", topics: ["OSI & TCP/IP model", "IP, DNS, ports", "Wi-Fi security"] },
      { title: "Personal Security", topics: ["Strong passwords & 2FA", "Phishing & UPI frauds", "Safe browsing"] },
      { title: "Linux & Tools", topics: ["Linux command line", "Firewalls", "Intro to ethical hacking (legal labs only)"] },
      { title: "Law & Careers", topics: ["IT Act 2000", "Reporting cyber crime", "Certifications & career paths"] },
    ],
    tools: ["Linux", "Browser security tools", "Password managers"],
    freeResources: [
      { label: "National Cyber Crime Reporting Portal", href: "https://cybercrime.gov.in" },
      { label: "CERT-In (Indian Computer Emergency Response Team)", href: "https://www.cert-in.org.in" },
    ],
  },
  {
    slug: "web-development",
    title: "Full-Stack Web Development",
    titleBn: "ওয়েবসাইট ডেভেলপমেন্ট",
    emoji: "🌐",
    tagline: "Frontend, Backend and Database — build real websites",
    description:
      "Go from zero to a working website. Learn the frontend (HTML, CSS, JavaScript, React), the backend (Node.js, APIs) and databases (SQL, PostgreSQL), then deploy your own project online.",
    level: "Beginner → Intermediate",
    duration: "12 weeks (planned)",
    status: "coming-soon",
    gradient: "from-sky-600 to-blue-700",
    accent: "text-sky-600 dark:text-sky-400",
    outcomes: [
      "Build responsive pages with HTML, CSS and Tailwind",
      "Make pages interactive with JavaScript and React",
      "Create a backend API with Node.js",
      "Design and query a database with SQL",
      "Deploy a full-stack project on the internet",
    ],
    modules: [
      { title: "🎨 Frontend", topics: ["HTML5 & CSS3", "Responsive design & Tailwind CSS", "JavaScript (ES6+)", "React & Next.js basics"] },
      { title: "⚙️ Backend", topics: ["How the web works (HTTP)", "Node.js & Express", "REST APIs", "Login & authentication basics"] },
      { title: "🗄️ Database", topics: ["SQL basics", "PostgreSQL / MySQL", "Tables, relations, joins", "Intro to NoSQL (MongoDB)"] },
      { title: "🚀 Deploy & Project", topics: ["Git & GitHub", "Hosting on Vercel", "Final full-stack project"] },
    ],
    tools: ["VS Code", "HTML/CSS/JS", "React", "Node.js", "PostgreSQL", "Git"],
    freeResources: [
      { label: "MDN Web Docs (HTML, CSS, JS reference)", href: "https://developer.mozilla.org" },
      { label: "freeCodeCamp", href: "https://www.freecodecamp.org" },
    ],
  },
];

export function getTechCourse(slug: string) {
  return TECH_COURSES.find(c => c.slug === slug);
}

// ── Spiritual ────────────────────────────────────────────────

export const SPIRITUAL_SECTIONS = [
  {
    href: "/spiritual/meditation",
    title: "Meditation",
    titleBn: "ধ্যান",
    emoji: "🧘",
    text: "Simple, step-by-step practices to calm the mind, improve focus and reduce exam stress.",
    gradient: "from-indigo-500/10 to-purple-500/10",
  },
  {
    href: "/spiritual/yoga",
    title: "Yoga",
    titleBn: "যোগ",
    emoji: "🌅",
    text: "Beginner asanas, Surya Namaskar and pranayama for a healthy body and steady mind.",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    href: "/spiritual/books",
    title: "Spiritual Books",
    titleBn: "আধ্যাত্মিক গ্রন্থাগার",
    emoji: "📚",
    text: "Read the Gita, Upanishads, Quran, Dhammapada, Guru Granth Sahib and great philosophers, free and online.",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
];

export type Practice = {
  name: string;
  nameBn?: string;
  time: string;
  steps: string[];
  benefit: string;
  caution?: string;
};

export const MEDITATIONS: Practice[] = [
  {
    name: "Breath Awareness (Anapana)",
    nameBn: "শ্বাস-সচেতনতা",
    time: "5–10 min",
    steps: [
      "Sit comfortably with your back straight and eyes gently closed.",
      "Breathe normally through the nose. Do not control the breath.",
      "Notice the cool air coming in and the warm air going out at the nostrils.",
      "When the mind wanders, gently bring attention back to the breath.",
    ],
    benefit: "Calms the mind and builds concentration. A good first practice.",
  },
  {
    name: "Body Scan",
    nameBn: "দেহ-পর্যবেক্ষণ",
    time: "10–15 min",
    steps: [
      "Lie down or sit and take three slow breaths.",
      "Move your attention slowly from the toes, to the legs, stomach, chest, arms, neck and head.",
      "At each part, notice any tightness and let it relax with the out-breath.",
      "Finish by feeling the whole body at once for a minute.",
    ],
    benefit: "Releases physical tension and helps with sleep.",
  },
  {
    name: "Mantra / Japa Meditation",
    nameBn: "জপ ধ্যান",
    time: "10 min",
    steps: [
      "Choose a word or mantra that is meaningful to you (for example 'Om', 'Shanti', or any prayer word of your own tradition).",
      "Repeat it slowly, aloud or silently, in rhythm with the breath.",
      "You may use a mala (prayer beads) to count 108 repetitions.",
      "Sit quietly for a minute at the end.",
    ],
    benefit: "Gives the wandering mind a single point of focus.",
  },
  {
    name: "Loving-Kindness (Maitri)",
    nameBn: "মৈত্রী ভাবনা",
    time: "10 min",
    steps: [
      "Sit quietly and think of yourself: 'May I be happy, may I be peaceful.'",
      "Then wish the same for a loved one, a friend, a stranger, and finally everyone.",
      "Feel the meaning of the words, not just the sound.",
    ],
    benefit: "Reduces anger and anxiety, builds compassion.",
  },
];

export const MEDITATION_PLAN = [
  { day: "Day 1–2", task: "Breath awareness, 5 minutes, morning" },
  { day: "Day 3–4", task: "Breath awareness 10 minutes + body scan at night" },
  { day: "Day 5", task: "Mantra / japa meditation, 10 minutes" },
  { day: "Day 6", task: "Loving-kindness, 10 minutes" },
  { day: "Day 7", task: "Choose your favourite practice, 15 minutes" },
];

export const ASANAS: Practice[] = [
  {
    name: "Tadasana (Mountain Pose)",
    nameBn: "তাড়াসন",
    time: "30 sec × 3",
    steps: ["Stand with feet together.", "Raise arms overhead and interlock fingers.", "Rise on your toes and stretch the whole body upward.", "Breathe normally, then come down slowly."],
    benefit: "Improves posture and balance.",
  },
  {
    name: "Vrikshasana (Tree Pose)",
    nameBn: "বৃক্ষাসন",
    time: "30 sec each side",
    steps: ["Stand straight and shift weight to the left leg.", "Place the right sole on the inner left thigh (or calf, never the knee).", "Join palms at the chest or overhead.", "Fix your gaze on one point. Repeat on the other side."],
    benefit: "Builds focus and leg strength.",
  },
  {
    name: "Bhujangasana (Cobra Pose)",
    nameBn: "ভুজঙ্গাসন",
    time: "20 sec × 3",
    steps: ["Lie on your stomach, palms under the shoulders.", "Inhale and lift the chest, keeping the navel on the floor.", "Keep elbows slightly bent and shoulders relaxed.", "Exhale and come down."],
    benefit: "Strengthens the back and opens the chest.",
    caution: "Avoid in pregnancy, recent abdominal surgery or severe back pain.",
  },
  {
    name: "Balasana (Child's Pose)",
    nameBn: "বালাসন",
    time: "1 min",
    steps: ["Kneel and sit on your heels.", "Bend forward and rest the forehead on the floor.", "Keep arms alongside the body or stretched forward.", "Breathe slowly into the back."],
    benefit: "Relaxing rest pose; calms the nervous system.",
  },
  {
    name: "Shavasana (Corpse Pose)",
    nameBn: "শবাসন",
    time: "5 min",
    steps: ["Lie on your back, legs apart, arms by the side, palms up.", "Close your eyes and relax every part of the body.", "Let the breath be natural."],
    benefit: "Deep relaxation at the end of every session.",
  },
];

export const PRANAYAMA: Practice[] = [
  {
    name: "Anulom Vilom (Alternate Nostril Breathing)",
    nameBn: "অনুলোম বিলোম",
    time: "5 min",
    steps: ["Sit straight. Close the right nostril with the right thumb.", "Inhale through the left nostril.", "Close the left nostril with the ring finger, open the right, and exhale.", "Inhale right, close, exhale left. That is one round."],
    benefit: "Balances the mind and improves breathing.",
  },
  {
    name: "Bhramari (Humming Bee Breath)",
    nameBn: "ভ্রামরী",
    time: "5–7 rounds",
    steps: ["Sit comfortably and close your eyes.", "Gently close the ears with the thumbs.", "Inhale deeply, then exhale making a soft humming 'mmm' sound.", "Feel the vibration in the head."],
    benefit: "Reduces stress and anger quickly.",
  },
  {
    name: "Kapalbhati (Skull-Shining Breath)",
    nameBn: "কপালভাতি",
    time: "1–3 min",
    steps: ["Sit straight with hands on knees.", "Exhale forcefully through the nose by pulling the stomach in.", "Let the inhale happen on its own.", "Start with 20 strokes and rest."],
    benefit: "Energising; strengthens the abdomen.",
    caution: "Avoid with high blood pressure, heart conditions, hernia, pregnancy or on a full stomach.",
  },
];

export const SURYA_NAMASKAR = [
  "Pranamasana: prayer pose",
  "Hasta Uttanasana: raised arms",
  "Padahastasana: hands to feet",
  "Ashwa Sanchalanasana: right leg back",
  "Dandasana: plank (stick pose)",
  "Ashtanga Namaskara: eight-limb salute",
  "Bhujangasana: cobra",
  "Adho Mukha Svanasana: mountain / downward dog",
  "Ashwa Sanchalanasana: right leg forward",
  "Padahastasana: hands to feet",
  "Hasta Uttanasana: raised arms",
  "Pranamasana: prayer pose",
];

// ── Spiritual Books library ───────────────────────────────────
// Only link to public-domain or free-to-read sources. Do NOT upload copyrighted book files.

export type BookLink = { label: string; href: string };

export type Book = {
  title: string;
  titleBn?: string;
  author?: string;
  about: string;
  links: BookLink[];
};

export type BookShelf = {
  id: string;
  title: string;
  titleBn: string;
  emoji: string;
  books: Book[];
};

const gutenberg = (q: string) => `https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(q)}`;
const archive = (q: string) => `https://archive.org/search?query=${encodeURIComponent(q)}`;

export const BOOK_SHELVES: BookShelf[] = [
  {
    id: "hindu",
    title: "Hindu Scriptures (Sanatan Shastra)",
    titleBn: "হিন্দু শাস্ত্র",
    emoji: "🕉️",
    books: [
      {
        title: "Bhagavad Gita",
        titleBn: "শ্রীমদ্ভগবদ্গীতা",
        about: "Krishna's teaching to Arjuna on duty, devotion and self-knowledge. 700 verses in 18 chapters.",
        links: [
          { label: "Gita Supersite (IIT Kanpur), Sanskrit + many translations", href: "https://www.gitasupersite.iitk.ac.in/" },
          { label: "Project Gutenberg (free English editions)", href: gutenberg("bhagavad gita") },
        ],
      },
      {
        title: "Upanishads",
        titleBn: "উপনিষদ",
        about: "Philosophical texts on Brahman, Atman and the nature of reality (Isha, Kena, Katha, Mundaka and more).",
        links: [
          { label: "Sacred-Texts: Upanishads", href: "https://www.sacred-texts.com/hin/upan/index.htm" },
          { label: "Project Gutenberg", href: gutenberg("upanishads") },
        ],
      },
      {
        title: "The Vedas (Rig, Sama, Yajur, Atharva)",
        titleBn: "বেদ",
        about: "The oldest Hindu scriptures: hymns, rituals and early philosophy.",
        links: [
          { label: "Sacred-Texts: Hinduism section", href: "https://www.sacred-texts.com/hin/index.htm" },
          { label: "Internet Archive", href: archive("rig veda griffith") },
        ],
      },
      {
        title: "Ramayana",
        titleBn: "রামায়ণ",
        author: "Valmiki",
        about: "The epic of Rama, Sita and Hanuman, about dharma and devotion.",
        links: [
          { label: "Sacred-Texts: Ramayana (Griffith translation)", href: "https://www.sacred-texts.com/hin/rama/index.htm" },
          { label: "Project Gutenberg", href: gutenberg("ramayana") },
        ],
      },
      {
        title: "Mahabharata",
        titleBn: "মহাভারত",
        author: "Vyasa",
        about: "The great epic of the Kurukshetra war, which contains the Bhagavad Gita.",
        links: [
          { label: "Sacred-Texts: Mahabharata (K. M. Ganguli translation)", href: "https://www.sacred-texts.com/hin/maha/index.htm" },
          { label: "Project Gutenberg", href: gutenberg("mahabharata") },
        ],
      },
      {
        title: "Bengali scriptures and texts",
        titleBn: "বাংলা উইকিসংকলন",
        about: "Free Bengali texts, including Kashiram Das' Mahabharata, Krittivasi Ramayana and more.",
        links: [{ label: "Bengali Wikisource (bn.wikisource.org)", href: "https://bn.wikisource.org/" }],
      },
    ],
  },
  {
    id: "islam",
    title: "Islam",
    titleBn: "ইসলাম",
    emoji: "☪️",
    books: [
      {
        title: "The Holy Quran",
        titleBn: "আল-কুরআন",
        about: "The central scripture of Islam: 114 surahs. Read the Arabic text with Bengali, English and many other translations, and listen to recitation.",
        links: [
          { label: "Quran.com (Arabic + Bengali / English, free)", href: "https://quran.com/" },
          { label: "Tanzil.net (Quran text & translations)", href: "https://tanzil.net/" },
        ],
      },
    ],
  },
  {
    id: "other-traditions",
    title: "Other Traditions",
    titleBn: "অন্যান্য ধর্মগ্রন্থ",
    emoji: "🪔",
    books: [
      {
        title: "Dhammapada",
        titleBn: "ধম্মপদ",
        author: "Teachings of the Buddha",
        about: "423 verses on the Buddha's path of ethics and mindfulness.",
        links: [{ label: "Project Gutenberg", href: gutenberg("dhammapada") }],
      },
      {
        title: "Sri Guru Granth Sahib",
        titleBn: "শ্রী গুরু গ্রন্থ সাহিব",
        about: "The scripture of Sikhism, with hymns of the Sikh Gurus and saints.",
        links: [{ label: "SearchGurbani.com (Gurmukhi + English)", href: "https://www.searchgurbani.com/" }],
      },
      {
        title: "The Holy Bible",
        titleBn: "বাইবেল",
        about: "The scripture of Christianity (King James Version, public domain).",
        links: [{ label: "Project Gutenberg (King James Version)", href: gutenberg("king james bible") }],
      },
      {
        title: "Tao Te Ching",
        author: "Lao Tzu",
        about: "Classic of Taoism, about living in harmony with the Tao (the Way).",
        links: [{ label: "Project Gutenberg", href: gutenberg("tao te ching") }],
      },
    ],
  },
  {
    id: "philosophers",
    title: "Great Philosophers & Saints",
    titleBn: "মহান দার্শনিক ও সাধক",
    emoji: "📜",
    books: [
      {
        title: "Complete Works of Swami Vivekananda",
        titleBn: "স্বামী বিবেকানন্দ রচনাবলী",
        author: "Swami Vivekananda",
        about: "Lectures on Raja Yoga, Karma Yoga, Bhakti Yoga, Jnana Yoga and Vedanta.",
        links: [
          { label: "Wikisource", href: "https://en.wikisource.org/wiki/The_Complete_Works_of_Swami_Vivekananda" },
          { label: "Project Gutenberg", href: gutenberg("vivekananda") },
        ],
      },
      {
        title: "Gitanjali",
        titleBn: "গীতাঞ্জলি",
        author: "Rabindranath Tagore",
        about: "Song offerings that won the Nobel Prize in Literature (1913).",
        links: [
          { label: "Project Gutenberg (English)", href: gutenberg("gitanjali tagore") },
          { label: "Bengali Wikisource (বাংলা)", href: "https://bn.wikisource.org/" },
        ],
      },
      {
        title: "Meditations",
        author: "Marcus Aurelius",
        about: "A Roman emperor's personal notes on Stoic philosophy and self-discipline.",
        links: [{ label: "Project Gutenberg", href: gutenberg("meditations marcus aurelius") }],
      },
      {
        title: "The Republic and Dialogues",
        author: "Plato",
        about: "Socratic dialogues on justice, the soul and the good life.",
        links: [{ label: "Project Gutenberg", href: gutenberg("plato") }],
      },
      {
        title: "The Analects",
        author: "Confucius",
        about: "Sayings on ethics, family, learning and good government.",
        links: [{ label: "Project Gutenberg", href: gutenberg("analects confucius") }],
      },
      {
        title: "The Prophet",
        author: "Kahlil Gibran",
        about: "Poetic essays on love, work, joy, sorrow and freedom.",
        links: [{ label: "Project Gutenberg", href: gutenberg("the prophet gibran") }],
      },
      {
        title: "Rumi: Masnavi & Poems",
        author: "Jalaluddin Rumi",
        about: "Sufi mystical poetry on love and the search for the divine.",
        links: [{ label: "Project Gutenberg", href: gutenberg("rumi") }],
      },
    ],
  },
];
