import { IndianEvent } from '../types.ts';

// Festival lunar/custom calendar lookup for multiple years (2024-2028)
// This ensures festival dates are accurate and NOT hardcoded to a single static year.
export const LUNAR_FESTIVAL_DATES: Record<string, Record<number, { month: number; day: number }>> = {
  diwali: {
    2024: { month: 11, day: 1 },
    2025: { month: 10, day: 20 },
    2026: { month: 11, day: 8 },
    2027: { month: 10, day: 29 },
    2028: { month: 10, day: 17 },
  },
  dussehra: {
    2024: { month: 10, day: 12 },
    2025: { month: 10, day: 2 },
    2026: { month: 10, day: 20 },
    2027: { month: 10, day: 10 },
    2028: { month: 9, day: 28 },
  },
  holi: {
    2024: { month: 3, day: 25 },
    2025: { month: 3, day: 14 },
    2026: { month: 3, day: 4 },
    2027: { month: 3, day: 22 },
    2028: { month: 3, day: 11 },
  },
  raksha_bandhan: {
    2024: { month: 8, day: 19 },
    2025: { month: 8, day: 9 },
    2026: { month: 8, day: 28 },
    2027: { month: 8, day: 17 },
    2028: { month: 8, day: 5 },
  },
  janmashtami: {
    2024: { month: 8, day: 26 },
    2025: { month: 8, day: 16 },
    2026: { month: 9, day: 4 },
    2027: { month: 8, day: 25 },
    2028: { month: 8, day: 13 },
  },
  ganesh_chaturthi: {
    2024: { month: 9, day: 7 },
    2025: { month: 8, day: 27 },
    2026: { month: 9, day: 14 },
    2027: { month: 9, day: 4 },
    2028: { month: 8, day: 24 },
  },
  guru_nanak_jayanti: {
    2024: { month: 11, day: 15 },
    2025: { month: 11, day: 5 },
    2026: { month: 11, day: 24 },
    2027: { month: 11, day: 14 },
    2028: { month: 11, day: 2 },
  },
  eid_ul_fitr: {
    2024: { month: 4, day: 11 },
    2025: { month: 3, day: 31 },
    2026: { month: 3, day: 20 },
    2027: { month: 3, day: 10 },
    2028: { month: 2, day: 27 },
  },
  buddha_purnima: {
    2024: { month: 5, day: 23 },
    2025: { month: 5, day: 12 },
    2026: { month: 5, day: 1 },
    2027: { month: 5, day: 20 },
    2028: { month: 5, day: 8 },
  },
  mahavir_jayanti: {
    2024: { month: 4, day: 21 },
    2025: { month: 4, day: 10 },
    2026: { month: 3, day: 31 },
    2027: { month: 4, day: 19 },
    2028: { month: 4, day: 7 },
  },
  durga_puja: {
    2024: { month: 10, day: 9 },
    2025: { month: 9, day: 29 },
    2026: { month: 10, day: 17 },
    2027: { month: 10, day: 6 },
    2028: { month: 9, day: 25 },
  },
  onam: {
    2024: { month: 9, day: 15 },
    2025: { month: 9, day: 5 },
    2026: { month: 8, day: 26 },
    2027: { month: 9, day: 12 },
    2028: { month: 9, day: 1 },
  },
};

// Fixed annual Indian national days, personality anniversaries, and observances
export const BASE_INDIAN_EVENTS: Omit<IndianEvent, 'dateStr' | 'dayAndMonth' | 'id'>[] = [
  // January
  {
    title: 'National Youth Day (Swami Vivekananda Jayanti)',
    hindiTitle: 'राष्ट्रीय युवा दिवस',
    category: 'Personality',
    categoryIcon: '👤',
    description: "Celebrates the inspiring ideals and teachings of Swami Vivekananda for youth and children.",
    importance: 'Teaches courage, dedication to study, and strong character.',
    sourceName: 'Ministry of Youth Affairs and Sports, Govt of India',
  },
  {
    title: 'Indian Army Day',
    hindiTitle: 'भारतीय सेना दिवस',
    category: 'National',
    categoryIcon: '🇮🇳',
    description: "Honors the brave soldiers of the Indian Army who protect the motherland with courage and discipline.",
    importance: 'Teaches patriotism, bravery, and selflessness.',
    sourceName: 'Indian Army Official Portal',
  },
  {
    title: 'Netaji Subhas Chandra Bose Jayanti (Parakram Diwas)',
    hindiTitle: 'पराक्रम दिवस - नेताजी सुभाष चंद्र बोस जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: "Remembers the fearless freedom fighter Netaji Subhas Chandra Bose who inspired millions.",
    importance: 'Teaches fearlessness, leadership, and love for our country.',
    sourceName: 'Ministry of Culture, Govt of India',
  },
  {
    title: 'National Girl Child Day',
    hindiTitle: 'राष्ट्रीय बालिका दिवस',
    category: 'Education',
    categoryIcon: '📚',
    description: "Promotes equal opportunities, education, respect, and rights for every girl child in India.",
    importance: 'Teaches equality, respect for daughters and sisters, and learning.',
    sourceName: 'Ministry of Women and Child Development, Govt of India',
  },
  {
    title: 'Republic Day of India',
    hindiTitle: 'गणतंत्र दिवस',
    category: 'National',
    categoryIcon: '🇮🇳',
    description: "The historic day our Indian Constitution came into effect on 26 January 1950, making India a sovereign Republic.",
    importance: 'Celebrates unity in diversity, our Constitution, and national pride.',
    sourceName: 'National Portal of India (india.gov.in)',
  },

  // February
  {
    title: 'Sarojini Naidu Jayanti (National Women’s Day)',
    hindiTitle: 'सरोजिनी नायडू जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: "Commemorates the 'Nightingale of India', a great poet, freedom fighter, and India's first woman governor.",
    importance: 'Teaches the power of words, poetry, and courage in public service.',
    sourceName: 'Sahitya Akademi / National Archives of India',
  },
  {
    title: 'National Science Day',
    hindiTitle: 'राष्ट्रीय विज्ञान दिवस',
    category: 'Science',
    categoryIcon: '🔬',
    description: "Commemorates Sir C. V. Raman's historic discovery of the Raman Effect on 28 February 1928, for which he won the Nobel Prize.",
    importance: 'Inspires scientific curiosity, asking questions, and discovering the secrets of nature.',
    sourceName: 'Department of Science and Technology, Govt of India',
  },

  // March
  {
    title: 'Shaheed Diwas (Bhagat Singh, Sukhdev & Rajguru)',
    hindiTitle: 'शहीद दिवस',
    category: 'History',
    categoryIcon: '🏛',
    description: "Tribute to the young patriots Bhagat Singh, Sukhdev, and Rajguru who sacrificed their lives for India's freedom.",
    importance: 'Teaches youth courage, love for truth, and standing up for the nation.',
    sourceName: 'National Archives of India',
  },
  {
    title: 'World Water Day',
    hindiTitle: 'विश्व जल दिवस',
    category: 'Environment',
    categoryIcon: '🌱',
    description: "Emphasizes the vital importance of fresh drinking water and protecting rivers, lakes, and oceans.",
    importance: 'Teaches conservation, never wasting tap water, and keeping water bodies clean.',
    sourceName: 'UNESCO / Ministry of Jal Shakti',
  },

  // April
  {
    title: 'Dr. B. R. Ambedkar Jayanti (Equality Day)',
    hindiTitle: 'डॉ. भीमराव आंबेडकर जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: "Celebrates the chief architect of the Indian Constitution and visionary champion of equality and education.",
    importance: 'Teaches that education is the most powerful tool for equality and kindness.',
    sourceName: 'Ministry of Social Justice and Empowerment, Govt of India',
  },
  {
    title: 'World Earth Day',
    hindiTitle: 'विश्व पृथ्वी दिवस',
    category: 'Environment',
    categoryIcon: '🌱',
    description: "Reminds children to care for Mother Earth by planting trees, saving electricity, and avoiding plastic.",
    importance: 'Instills love for nature, plants, and animal protection.',
    sourceName: 'UN Environment Programme',
  },

  // May
  {
    title: 'National Technology Day',
    hindiTitle: 'राष्ट्रीय प्रौद्योगिकी दिवस',
    category: 'Science',
    categoryIcon: '🔬',
    description: "Marks India's technological breakthroughs including the Pokhran-II tests and Hansa aircraft flight in 1998.",
    importance: 'Shows how Indian engineers and innovators solve real-world problems.',
    sourceName: 'Technology Development Board, Govt of India',
  },
  {
    title: 'Rabindranath Tagore Jayanti',
    hindiTitle: 'रवीन्द्रनाथ टैगोर जयंती',
    category: 'Culture',
    categoryIcon: '🎨',
    description: "Honors the Nobel Laureate poet, artist, and composer of our National Anthem 'Jana Gana Mana'.",
    importance: 'Teaches love for arts, music, nature-friendly learning, and universal brotherhood.',
    sourceName: 'Visva-Bharati / Ministry of Culture',
  },

  // June
  {
    title: 'World Environment Day',
    hindiTitle: 'विश्व पर्यावरण दिवस',
    category: 'Environment',
    categoryIcon: '🌱',
    description: "Global day dedicated to planting trees, reducing waste, and protecting forests and clean air.",
    importance: 'Teaches children to plant saplings and avoid single-use plastics.',
    sourceName: 'Ministry of Environment, Forest and Climate Change',
  },
  {
    title: 'International Day of Yoga',
    hindiTitle: 'अंतर्राष्ट्रीय योग दिवस',
    category: 'Culture',
    categoryIcon: '🎨',
    description: "Celebrates India's ancient gift of Yoga to the world for health, peace, flexibility, and calm minds.",
    importance: 'Teaches daily physical exercise, deep breathing, focus, and wellness.',
    sourceName: 'Ministry of AYUSH, Govt of India',
  },

  // July
  {
    title: 'National Doctors’ Day',
    hindiTitle: 'राष्ट्रीय चिकित्सक दिवस',
    category: 'Personality',
    categoryIcon: '👤',
    description: "Honors dedicated healthcare workers and doctors, celebrating the legacy of Dr. Bidhan Chandra Roy.",
    importance: 'Teaches gratitude for doctors and healthcare workers who save lives.',
    sourceName: 'Indian Medical Association',
  },
  {
    title: 'Kargil Vijay Diwas',
    hindiTitle: 'कारगिल विजय दिवस',
    category: 'National',
    categoryIcon: '🇮🇳',
    description: "Remembers the victory and extraordinary courage of the Indian Armed Forces in Operation Vijay.",
    importance: 'Teaches respect for our soldiers who guard the borders high in the Himalayas.',
    sourceName: 'Ministry of Defence, Govt of India',
  },

  // August
  {
    title: 'Independence Day of India',
    hindiTitle: 'स्वतंत्रता दिवस',
    category: 'National',
    categoryIcon: '🇮🇳',
    description: "Celebrates the day India achieved freedom from colonial rule on 15 August 1947.",
    importance: 'Remembering freedom fighters, hoisting the Tricolour, and unity of India.',
    sourceName: 'National Portal of India',
  },
  {
    title: 'National Space Day',
    hindiTitle: 'राष्ट्रीय अंतरिक्ष दिवस',
    category: 'Space',
    categoryIcon: '🧑‍🚀',
    description: "Marks the historic touchdown of Chandrayaan-3 on the south pole of the Moon on 23 August 2023.",
    importance: 'Inspires young students to dream big, study astronomy, and take pride in ISRO.',
    sourceName: 'ISRO (Indian Space Research Organisation)',
  },
  {
    title: 'National Sports Day (Major Dhyan Chand Jayanti)',
    hindiTitle: 'राष्ट्रीय खेल दिवस - मेजर ध्यानचंद जयंती',
    category: 'Sports',
    categoryIcon: '🏆',
    description: "Celebrates the birth anniversary of Hockey Wizard Major Dhyan Chand who won 3 Olympic gold medals for India.",
    importance: 'Teaches physical fitness, fair play, teamwork, and persistence.',
    sourceName: 'Ministry of Youth Affairs and Sports',
  },

  // September
  {
    title: 'National Teachers’ Day',
    hindiTitle: 'शिक्षक दिवस - डॉ. सर्वपल्ली राधाकृष्णन',
    category: 'Education',
    categoryIcon: '📚',
    description: "Honors all teachers on the birth anniversary of philosopher, educator, and 2nd President Dr. Sarvepalli Radhakrishnan.",
    importance: 'Teaches gratitude, listening to teachers, and the value of lifelong learning.',
    sourceName: 'Ministry of Education, Govt of India',
  },
  {
    title: 'Hindi Diwas',
    hindiTitle: 'हिंदी दिवस',
    category: 'Culture',
    categoryIcon: '🎨',
    description: "Commemorates the adoption of Hindi as an official language of the Union of India on 14 September 1949.",
    importance: 'Encourages respect for Indian languages, literature, and expressive speaking.',
    sourceName: 'Department of Official Language, Ministry of Home Affairs',
  },
  {
    title: 'World Ozone Day & Nature Protection',
    hindiTitle: 'विश्व ओजोन दिवस',
    category: 'Environment',
    categoryIcon: '🌱',
    description: "Educates on preserving the Earth's ozone layer that shields all living things from harmful solar rays.",
    importance: 'Teaches sustainable living, green transportation, and eco-friendly habits.',
    sourceName: 'UN Environment Programme',
  },
  {
    title: 'Bhagat Singh Jayanti',
    hindiTitle: 'शहीद भगत सिंह जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: "Birth anniversary of the legendary young revolutionary who believed in freedom, reading, and self-respect.",
    importance: 'Shows that young people can have big ideas, love books, and care deeply for society.',
    sourceName: 'National Archives of India',
  },

  // October
  {
    title: 'Mahatma Gandhi Jayanti & Lal Bahadur Shastri Jayanti',
    hindiTitle: 'महात्मा गांधी एवं लाल बहादुर शास्त्री जयंती',
    category: 'National',
    categoryIcon: '🇮🇳',
    description: "Tribute to the Father of the Nation who taught Truth and Non-Violence, and Prime Minister Lal Bahadur Shastri.",
    importance: 'Teaches truthfulness (Satya), non-violence (Ahimsa), cleanliness (Swachhata), and simplicity.',
    sourceName: 'National Portal of India',
  },
  {
    title: 'Dr. A. P. J. Abdul Kalam Jayanti (World Students’ Day)',
    hindiTitle: 'डॉ. ए.पी.जे. अब्दुल कलाम जयंती (विद्यार्थी दिवस)',
    category: 'Personality',
    categoryIcon: '👤',
    description: "Celebrates the beloved 'Missile Man' and 11th President of India who inspired millions of school children to dream big.",
    importance: 'Teaches children: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action."',
    sourceName: 'DRDO / ISRO / Rashtrapati Bhavan Archives',
  },
  {
    title: 'National Unity Day (Rashtriya Ekta Diwas - Sardar Patel)',
    hindiTitle: 'राष्ट्रीय एकता दिवस - सरदार वल्लभभाई पटेल जयंती',
    category: 'National',
    categoryIcon: '🇮🇳',
    description: "Honors the 'Iron Man of India' Sardar Vallabhbhai Patel who united over 560 princely states into one India.",
    importance: 'Teaches unity, strength through cooperation, and standing together.',
    sourceName: 'Ministry of Home Affairs, Govt of India',
  },

  // November
  {
    title: 'National Education Day (Maulana Abul Kalam Azad)',
    hindiTitle: 'राष्ट्रीय शिक्षा दिवस',
    category: 'Education',
    categoryIcon: '📚',
    description: "Marks the birth anniversary of India's first Education Minister, who laid the foundation for IITs, UGC, and IISc.",
    importance: 'Highlights the fundamental right of every Indian child to receive a good education.',
    sourceName: 'Ministry of Education, Govt of India',
  },
  {
    title: 'National Children’s Day (Bal Diwas - Chacha Nehru)',
    hindiTitle: 'बाल दिवस',
    category: 'Education',
    categoryIcon: '📚',
    description: "Dedicated to the affection, education, and welfare of children on Pandit Jawaharlal Nehru's birthday.",
    importance: 'Reminds children that they are the bright future, builders, and smile of India.',
    sourceName: 'National Portal of India',
  },
  {
    title: 'Constitution Day of India (Samvidhan Diwas)',
    hindiTitle: 'संविधान दिवस',
    category: 'National',
    categoryIcon: '🇮🇳',
    description: "Commemorates the adoption of the Constitution of India by the Constituent Assembly on 26 November 1949.",
    importance: 'Teaches the Preamble, justice, equality, liberty, and fundamental duties of citizens.',
    sourceName: 'Ministry of Law and Justice, Govt of India',
  },

  // December
  {
    title: 'Indian Navy Day',
    hindiTitle: 'भारतीय नौसेना दिवस',
    category: 'National',
    categoryIcon: '🇮🇳',
    description: "Recognizes the role and bravery of the Indian Navy in securing India's vast maritime borders and coastal waters.",
    importance: 'Teaches discipline, vigil, and service to the country.',
    sourceName: 'Indian Navy Official Portal',
  },
  {
    title: 'National Mathematics Day (Srinivasa Ramanujan)',
    hindiTitle: 'राष्ट्रीय गणित दिवस - श्रीनिवास रामानुजन जयंती',
    category: 'Science',
    categoryIcon: '🔬',
    description: "Celebrates the mathematical genius Srinivasa Ramanujan whose extraordinary formulas amazed the world.",
    importance: 'Removes fear of math and shows how numbers and puzzles can be playful and magical.',
    sourceName: 'National Council for Science and Technology Communication',
  },
  {
    title: 'Kisan Diwas (National Farmers’ Day)',
    hindiTitle: 'राष्ट्रीय किसान दिवस',
    category: 'National',
    categoryIcon: '🇮🇳',
    description: "Honors the hard-working farmers of India who provide nourishing food for the entire nation.",
    importance: 'Teaches gratitude for food, never wasting meals, and respecting agricultural workers.',
    sourceName: 'Ministry of Agriculture and Farmers Welfare',
  },
];

// Evergreen educational backup topics (when no major historical/festival date falls within a few days)
export const EVERGREEN_TOPICS: IndianEvent[] = [
  {
    id: 'evergreen-trees',
    title: 'Importance of Trees: Our Green Friends',
    hindiTitle: 'पेड़ों का महत्व - हमारे सच्चे मित्र',
    category: 'Environment',
    categoryIcon: '🌱',
    dateStr: 'Evergreen',
    dayAndMonth: 'Weekly Topic',
    description: "Trees give us clean oxygen to breathe, sweet fruits, cool shade, and shelter birds.",
    importance: 'Teaches planting trees, watering plants at home, and environmental responsibility.',
    sourceName: 'Educational Curriculum Standards',
    score: 80,
  },
  {
    id: 'evergreen-kindness',
    title: 'The Magic of Kindness & Helping Others',
    hindiTitle: 'दयालुता और मदद का जादू',
    category: 'Evergreen',
    categoryIcon: '🌟',
    dateStr: 'Evergreen',
    dayAndMonth: 'Weekly Topic',
    description: "A small act of kindness like sharing a pencil, saying please, or smiling brightens the whole classroom.",
    importance: 'Fosters empathy, friendship, and positive school culture.',
    sourceName: 'Value Education Guidelines, NCERT',
    score: 82,
  },
  {
    id: 'evergreen-habits',
    title: 'Good Habits Make Great Students',
    hindiTitle: 'अच्छी आदतें - महान विद्यार्थी',
    category: 'Education',
    categoryIcon: '📚',
    dateStr: 'Evergreen',
    dayAndMonth: 'Weekly Topic',
    description: "Waking up early, brushing twice, keeping our school bag neat, and finishing homework on time.",
    importance: 'Builds discipline and independence in young children.',
    sourceName: 'Child Health & Education Board',
    score: 78,
  },
  {
    id: 'evergreen-reading',
    title: 'The Joy of Reading Books Every Day',
    hindiTitle: 'किताबें पढ़ने का आनंद',
    category: 'Education',
    categoryIcon: '📚',
    dateStr: 'Evergreen',
    dayAndMonth: 'Weekly Topic',
    description: "Books are wonderful adventure windows that take us to faraway worlds, teach new words, and spark imagination.",
    importance: 'Develops language confidence, curiosity, and creativity.',
    sourceName: 'National Book Trust India',
    score: 79,
  },
  {
    id: 'evergreen-water',
    title: 'Save Water, Save the Earth',
    hindiTitle: 'जल बचाओ, जीवन बचाओ',
    category: 'Environment',
    categoryIcon: '🌱',
    dateStr: 'Evergreen',
    dayAndMonth: 'Weekly Topic',
    description: "Every single drop counts. Turning off running taps while brushing and using water wisely.",
    importance: 'Practicing conservation in daily school and home routines.',
    sourceName: 'Ministry of Jal Shakti',
    score: 81,
  },
];

// Helper to build a comprehensive list of events for the current year
export function getAllEventsForYear(year: number): IndianEvent[] {
  const events: IndianEvent[] = [];

  // 1. Add fixed events
  const fixedEventMap: Record<string, { month: number; day: number }> = {
    'National Youth Day (Swami Vivekananda Jayanti)': { month: 1, day: 12 },
    'Indian Army Day': { month: 1, day: 15 },
    'Netaji Subhas Chandra Bose Jayanti (Parakram Diwas)': { month: 1, day: 23 },
    'National Girl Child Day': { month: 1, day: 24 },
    'Republic Day of India': { month: 1, day: 26 },
    'Sarojini Naidu Jayanti (National Women’s Day)': { month: 2, day: 13 },
    'National Science Day': { month: 2, day: 28 },
    'Shaheed Diwas (Bhagat Singh, Sukhdev & Rajguru)': { month: 3, day: 23 },
    'World Water Day': { month: 3, day: 22 },
    'Dr. B. R. Ambedkar Jayanti (Equality Day)': { month: 4, day: 14 },
    'World Earth Day': { month: 4, day: 22 },
    'National Technology Day': { month: 5, day: 11 },
    'Rabindranath Tagore Jayanti': { month: 5, day: 7 },
    'World Environment Day': { month: 6, day: 5 },
    'International Day of Yoga': { month: 6, day: 21 },
    'National Doctors’ Day': { month: 7, day: 1 },
    'Kargil Vijay Diwas': { month: 7, day: 26 },
    'Independence Day of India': { month: 8, day: 15 },
    'National Space Day': { month: 8, day: 23 },
    'National Sports Day (Major Dhyan Chand Jayanti)': { month: 8, day: 29 },
    'National Teachers’ Day': { month: 9, day: 5 },
    'Hindi Diwas': { month: 9, day: 14 },
    'World Ozone Day & Nature Protection': { month: 9, day: 16 },
    'Bhagat Singh Jayanti': { month: 9, day: 28 },
    'Mahatma Gandhi Jayanti & Lal Bahadur Shastri Jayanti': { month: 10, day: 2 },
    'Dr. A. P. J. Abdul Kalam Jayanti (World Students’ Day)': { month: 10, day: 15 },
    'National Unity Day (Rashtriya Ekta Diwas - Sardar Patel)': { month: 10, day: 31 },
    'National Education Day (Maulana Abul Kalam Azad)': { month: 11, day: 11 },
    'National Children’s Day (Bal Diwas - Chacha Nehru)': { month: 11, day: 14 },
    'Constitution Day of India (Samvidhan Diwas)': { month: 11, day: 26 },
    'Indian Navy Day': { month: 12, day: 4 },
    'National Mathematics Day (Srinivasa Ramanujan)': { month: 12, day: 22 },
    'Kisan Diwas (National Farmers’ Day)': { month: 12, day: 23 },
  };

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  BASE_INDIAN_EVENTS.forEach((item, index) => {
    const dateInfo = fixedEventMap[item.title];
    if (dateInfo) {
      const monthStr = String(dateInfo.month).padStart(2, '0');
      const dayStr = String(dateInfo.day).padStart(2, '0');
      const dateStr = `${year}-${monthStr}-${dayStr}`;
      const dayAndMonth = `${dateInfo.day} ${monthNames[dateInfo.month - 1]}`;

      events.push({
        ...item,
        id: `fixed-${index}-${dateStr}`,
        dateStr,
        dayAndMonth,
        year,
      });
    }
  });

  // 2. Add dynamic festivals
  const festivals: Array<{
    key: string;
    title: string;
    hindiTitle: string;
    category: IndianEvent['category'];
    categoryIcon: string;
    description: string;
    importance: string;
    sourceName: string;
  }> = [
    {
      key: 'diwali',
      title: 'Diwali (The Festival of Lights & Joy)',
      hindiTitle: 'दीपावली - प्रकाश और उल्लास का पर्व',
      category: 'Festival',
      categoryIcon: '🪔',
      description: "Celebrates the triumph of light over darkness, wisdom over ignorance, and sharing sweets with family and neighbors.",
      importance: 'Teaches spreading joy, illuminating our minds with knowledge, and green celebration.',
      sourceName: 'National Portal of India',
    },
    {
      key: 'dussehra',
      title: 'Dussehra / Vijayadashami (Victory of Good over Evil)',
      hindiTitle: 'दशहरा / विजयादशमी - अच्छाई की बुराई पर विजय',
      category: 'Festival',
      categoryIcon: '🪔',
      description: "Signifies the ultimate victory of truth and righteousness, celebrating courage, kindness, and moral character.",
      importance: 'Teaches choosing honesty over falsehood and conquering bad habits.',
      sourceName: 'Ministry of Culture, Govt of India',
    },
    {
      key: 'holi',
      title: 'Holi (The Festival of Vibrant Colors & Friendship)',
      hindiTitle: 'होली - रंगों और मित्रता का त्यौहार',
      category: 'Festival',
      categoryIcon: '🪔',
      description: "Welcomes the beauty of spring, forgiveness, vibrant playful colors, and togetherness.",
      importance: 'Teaches celebrating diversity, unity, and friendship with everyone.',
      sourceName: 'Incredible India / Ministry of Tourism',
    },
    {
      key: 'raksha_bandhan',
      title: 'Raksha Bandhan (Celebration of Love & Protection)',
      hindiTitle: 'रक्षाबंधन - भाई-बहन का पवित्र बंधन',
      category: 'Festival',
      categoryIcon: '🪔',
      description: "The sweet festival celebrating unconditional bond of care, affection, and protection between brothers and sisters.",
      importance: 'Teaches respecting our siblings, family bonds, and mutual care.',
      sourceName: 'Ministry of Culture, Govt of India',
    },
    {
      key: 'ganesh_chaturthi',
      title: 'Ganesh Chaturthi (Lord of Wisdom & New Beginnings)',
      hindiTitle: 'गणेश चतुर्थी - विद्या और शुभ कार्यों के देवता',
      category: 'Festival',
      categoryIcon: '🪔',
      description: "Celebrates the birth of Lord Ganesha, the remover of obstacles, patron of learning, and wisdom.",
      importance: 'Teaches listening carefully, speaking gently, and respecting nature with clay idols.',
      sourceName: 'Ministry of Culture, Govt of India',
    },
    {
      key: 'guru_nanak_jayanti',
      title: 'Guru Nanak Jayanti (Gurpurab - Message of Oneness)',
      hindiTitle: 'गुरु नानक जयंती - एकता और सेवा का संदेश',
      category: 'Festival',
      categoryIcon: '🪔',
      description: "Commemorates the birth of Guru Nanak Dev Ji, who taught equality, selfless community service (Seva), and truth.",
      importance: 'Teaches sharing food with everyone (Langar), helping the needy, and kindness.',
      sourceName: 'National Portal of India',
    },
    {
      key: 'eid_ul_fitr',
      title: 'Eid-ul-Fitr (Festival of Charity & Brotherhood)',
      hindiTitle: 'ईद-उल-फ़ितर - भाईचारे और दान का उत्सव',
      category: 'Festival',
      categoryIcon: '🪔',
      description: "Celebrates the conclusion of the holy month of fasting, emphasizing gratitude, sharing meals, and helping the poor (Zakat).",
      importance: 'Teaches compassion, giving to those in need, and spreading peace.',
      sourceName: 'Ministry of Minority Affairs, Govt of India',
    },
    {
      key: 'buddha_purnima',
      title: 'Buddha Purnima (Message of Peace & Compassion)',
      hindiTitle: 'बुद्ध पूर्णिमा - शांति और करुणा का मार्ग',
      category: 'Festival',
      categoryIcon: '🪔',
      description: "Honors the life and teachings of Gautam Buddha who advocated non-violence, peace, and mindfulness.",
      importance: 'Teaches gentleness, caring for animals, and calm reflection.',
      sourceName: 'Archaeological Survey of India / Ministry of Culture',
    },
  ];

  festivals.forEach((f) => {
    const datesForYear = LUNAR_FESTIVAL_DATES[f.key]?.[year];
    if (datesForYear) {
      const monthStr = String(datesForYear.month).padStart(2, '0');
      const dayStr = String(datesForYear.day).padStart(2, '0');
      const dateStr = `${year}-${monthStr}-${dayStr}`;
      const dayAndMonth = `${datesForYear.day} ${monthNames[datesForYear.month - 1]}`;

      events.push({
        id: `festival-${f.key}-${dateStr}`,
        title: f.title,
        hindiTitle: f.hindiTitle,
        category: f.category,
        categoryIcon: f.categoryIcon,
        dateStr,
        dayAndMonth,
        year,
        description: f.description,
        importance: f.importance,
        sourceName: f.sourceName,
        isLunarFestival: true,
      });
    }
  });

  return events;
}

// Topic Ranking Algorithm
// Topic Score = Event Proximity + Indian Relevance + Educational Value + Child Suitability + Assembly Relevance
export function rankEventsForDate(currentDateStr: string, year: number = new Date(currentDateStr + 'T00:00:00Z').getFullYear() || 2026) {
  const events = getAllEventsForYear(year);
  const current = new Date(currentDateStr + 'T00:00:00Z');

  // Also calculate upcoming weekend (Saturday / Monday assembly)
  const currentDayOfWeek = current.getUTCDay(); // 0 = Sun, 4 = Thu
  // Days to next Saturday:
  const daysToSaturday = (6 - currentDayOfWeek + 7) % 7 || 7;
  const targetWeekend = new Date(current.getTime() + daysToSaturday * 86400000);

  const scoredEvents = events.map((event) => {
    const eventDate = new Date(event.dateStr + 'T00:00:00Z');
    const diffTime = eventDate.getTime() - current.getTime();
    const diffDays = Math.round(diffTime / 86400000);

    // Difference from upcoming weekend
    const diffFromWeekend = Math.round(
      Math.abs(eventDate.getTime() - targetWeekend.getTime()) / 86400000
    );

    let proximityScore = 0;
    // Window of interest: event happening in next 0-14 days or just observed (1-2 days ago)
    if (diffDays >= 0 && diffDays <= 2) {
      proximityScore = 60; // Next 48 hours / this weekend
    } else if (diffDays >= 3 && diffDays <= 6) {
      proximityScore = 55; // Next 3-6 days
    } else if (diffDays >= 7 && diffDays <= 12) {
      proximityScore = 40;
    } else if (diffDays === -1 || diffDays === -2) {
      proximityScore = 35; // Just observed
    } else if (diffDays > 12 && diffDays <= 25) {
      proximityScore = 20;
    } else if (diffDays > 25 && diffDays <= 60) {
      proximityScore = 5;
    } else {
      proximityScore = 0; // Past events (>2 days ago) or too far ahead
    }

    // Category weighting
    let categoryWeight = 25;
    if (event.category === 'National') categoryWeight = 30;
    if (event.category === 'Science' || event.category === 'Space') categoryWeight = 28;
    if (event.category === 'Festival') categoryWeight = 26;
    if (event.category === 'Personality') categoryWeight = 27;
    if (event.category === 'Education') categoryWeight = 28;

    const totalScore = Math.round(proximityScore + categoryWeight + 20); // base child suitability

    return {
      ...event,
      score: totalScore,
      proximityDays: diffDays,
      isCurrentOrUpcoming: diffDays >= -1 && diffDays <= 14,
    };
  });

  // Sort by score descending, then by closest proximity days
  scoredEvents.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (a.proximityDays ?? 99) - (b.proximityDays ?? 99);
  });

  // Top candidate
  const recommended = scoredEvents[0] || EVERGREEN_TOPICS[0];
  const alternatives = scoredEvents.slice(1, 4);

  return {
    recommended,
    alternatives,
    allScored: scoredEvents,
  };
}
