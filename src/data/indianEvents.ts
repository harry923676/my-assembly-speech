import { IndianEvent } from '../types.ts';
import { WORKBOOK_EVENT_TEMPLATES } from './workbookEvents.ts';

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
    title: 'National Voters’ Day',
    hindiTitle: 'राष्ट्रीय मतदाता दिवस',
    category: 'Education',
    categoryIcon: '🗳️',
    description: "Encourages every citizen to understand the power of voting, responsibility in democracy, and active participation in public life.",
    importance: 'Teaches civic awareness, rights, and the importance of choosing leaders wisely.',
    sourceName: 'Election Commission of India',
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
    title: 'International Women’s Day',
    hindiTitle: 'अंतर्राष्ट्रीय महिला दिवस',
    category: 'Education',
    categoryIcon: '👩‍🎓',
    description: "Celebrates the achievements of women in all fields and reminds us to support equality, dignity, and equal opportunity for girls and women.",
    importance: 'Teaches respect, fairness, and the idea that every child deserves equal opportunities.',
    sourceName: 'United Nations / Ministry of Women and Child Development',
  },
  {
    title: 'World Radio Day',
    hindiTitle: 'विश्व रेडियो दिवस',
    category: 'Education',
    categoryIcon: '📻',
    description: "Highlights the importance of radio as a powerful medium for education, communication, and connectivity in every community.",
    importance: 'Teaches how information and awareness can reach people quickly and positively.',
    sourceName: 'UNESCO',
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
  {
    title: 'National Engineers’ Day (Sir M. Visvesvaraya)',
    hindiTitle: 'राष्ट्रीय अभियंता दिवस - सर एम. विश्वेश्वरैया',
    category: 'Science',
    categoryIcon: '🔧',
    description: "Celebrates the legacy of Sir M. Visvesvaraya, a visionary engineer whose work transformed infrastructure and public service in India.",
    importance: 'Teaches innovation, problem-solving, and respect for the engineers who build roads, bridges, and cities.',
    sourceName: 'Ministry of Education / Engineering Council of India',
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
  {
    title: 'World Wildlife Day',
    hindiTitle: 'विश्व वन्यजीव दिवस',
    category: 'Environment',
    categoryIcon: '🦉',
    description: "Focuses on the protection of biodiversity and the importance of wildlife conservation for a healthy planet.",
    importance: 'Teaches compassion for animals, biodiversity, and the value of nature.',
    sourceName: 'United Nations',
  },
  {
    title: 'International Day of Happiness',
    hindiTitle: 'अंतर्राष्ट्रीय प्रसन्नता दिवस',
    category: 'Education',
    categoryIcon: '😊',
    description: "Encourages positive thinking, kindness, gratitude, and healthy emotional well-being in daily life.",
    importance: 'Teaches that happiness grows through kindness, gratitude, and good habits.',
    sourceName: 'United Nations',
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
  {
    title: 'World Health Day',
    hindiTitle: 'विश्व स्वास्थ्य दिवस',
    category: 'Education',
    categoryIcon: '🩺',
    description: "Promotes healthy habits, physical fitness, safe living, and awareness about disease prevention.",
    importance: 'Teaches hygiene, healthy food choices, and the importance of caring for our bodies.',
    sourceName: 'World Health Organization',
  },
  {
    title: 'Odisha Day (Utkal Divas)',
    hindiTitle: 'ओड़िशा दिवस (उत्कल दिवस)',
    category: 'Culture',
    categoryIcon: '🎭',
    description: "Celebrates the formation of Odisha as a separate state and honors the rich culture, language, and contributions of the people of Odisha.",
    importance: 'Teaches respect for regional history, language, and the pride of every Indian state.',
    sourceName: 'Government of Odisha',
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
    title: 'Maharashtra Day',
    hindiTitle: 'महाराष्ट्र दिवस',
    category: 'Culture',
    categoryIcon: '🏛',
    description: "Celebrates the formation of Maharashtra and the spirit of progress, culture, and unity among the people of the state.",
    importance: 'Teaches appreciation for regional identity, language, and unity in diversity.',
    sourceName: 'Government of Maharashtra',
  },
  {
    title: 'Gujarat Day',
    hindiTitle: 'गुजरात दिवस',
    category: 'Culture',
    categoryIcon: '🌾',
    description: "Marks the formation of Gujarat and celebrates the state’s vibrant culture, entrepreneurship, and contribution to India.",
    importance: 'Encourages pride in regional heritage and respect for every state’s unique traditions.',
    sourceName: 'Government of Gujarat',
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
    title: 'World Day Against Child Labour',
    hindiTitle: 'बालश्रम विरोधी दिवस',
    category: 'Education',
    categoryIcon: '🚫',
    description: "Raises awareness about child labour and emphasizes that every child deserves education, safety, and a joyful childhood.",
    importance: 'Teaches empathy, justice, and the right to a safe and learning-filled childhood.',
    sourceName: 'International Labour Organization',
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
  {
    title: 'Telangana Formation Day',
    hindiTitle: 'तेलंगाना राज्य स्थापना दिवस',
    category: 'Culture',
    categoryIcon: '🏞',
    description: "Celebrates the formation of Telangana as a separate state and acknowledges the cultural identity and efforts of its people.",
    importance: 'Teaches pride in state development, regional identity, and the importance of unity.',
    sourceName: 'Government of Telangana',
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
  {
    title: 'World Population Day',
    hindiTitle: 'विश्व जनसंख्या दिवस',
    category: 'Education',
    categoryIcon: '📊',
    description: "Raises awareness about family welfare, health, and the importance of balanced population growth for a sustainable future.",
    importance: 'Teaches responsibility, health awareness, and respect for every life.',
    sourceName: 'United Nations Population Fund',
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
    title: 'National Handloom Day',
    hindiTitle: 'राष्ट्रीय हथकरघा दिवस',
    category: 'Culture',
    categoryIcon: '🧵',
    description: "Honors the handloom weavers and artisans who preserve India's traditional textile heritage and craftsmanship.",
    importance: 'Teaches respect for artisans, local crafts, and sustainable handmade clothing.',
    sourceName: 'Ministry of Textiles, Govt of India',
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
    title: 'World Literacy Day',
    hindiTitle: 'विश्व साक्षरता दिवस',
    category: 'Education',
    categoryIcon: '📖',
    description: "Encourages literacy and education for all, especially children and adults who are still learning to read and write.",
    importance: 'Teaches the value of reading, writing, and equal access to learning.',
    sourceName: 'UNESCO / Ministry of Education',
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
    title: 'International Day of Peace',
    hindiTitle: 'अंतर्राष्ट्रीय शांति दिवस',
    category: 'National',
    categoryIcon: '🤝',
    description: "Promotes peace, understanding, and harmony among people, communities, and countries across the world.",
    importance: 'Teaches kindness, problem-solving, and the value of living together peacefully.',
    sourceName: 'United Nations',
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
  {
    title: 'World Mental Health Day',
    hindiTitle: 'विश्व मानसिक स्वास्थ्य दिवस',
    category: 'Education',
    categoryIcon: '🧠',
    description: "Encourages awareness about emotional well-being, kindness, and seeking help when feeling stressed, anxious, or unhappy.",
    importance: 'Teaches empathy, healthy habits, and the importance of speaking gently about feelings.',
    sourceName: 'World Health Organization',
  },
  {
    title: 'World Food Day',
    hindiTitle: 'विश्व खाद्य दिवस',
    category: 'Education',
    categoryIcon: '🍲',
    description: "Highlights the importance of food security, reducing hunger, and appreciating the effort behind every meal we eat.",
    importance: 'Teaches gratitude for farmers, avoiding waste, and caring for all families.',
    sourceName: 'Food and Agriculture Organization',
  },

  // November
  {
    title: 'Birsa Munda Jayanti',
    hindiTitle: 'बिरसा मुंडा जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: "Commemorates Birsa Munda, a revered tribal freedom fighter and leader who inspired people to protect their land, dignity, and culture.",
    importance: 'Teaches courage, self-respect, and standing up for justice and community rights.',
    sourceName: 'Tribal Affairs / Jharkhand State Archives',
  },
  {
    title: 'Jharkhand Foundation Day',
    hindiTitle: 'झारखंड स्थापना दिवस',
    category: 'Culture',
    categoryIcon: '🌿',
    description: "Celebrates the formation of Jharkhand and honors the strength, culture, forests, and traditions of the tribal communities of the region.",
    importance: 'Teaches respect for local heritage, biodiversity, and the diversity of India’s states.',
    sourceName: 'Government of Jharkhand',
  },
  {
    title: 'Karnataka Rajyotsava',
    hindiTitle: 'कर्नाटक राज्योत्सव',
    category: 'Culture',
    categoryIcon: '🧭',
    description: "Marks the formation of Karnataka and celebrates the state’s culture, literature, language, and progress in science and technology.",
    importance: 'Teaches pride in state heritage and the value of cultural diversity.',
    sourceName: 'Government of Karnataka',
  },
  {
    title: 'Kerala Piravi',
    hindiTitle: 'केरल प्रतिवर्ष दिवस',
    category: 'Culture',
    categoryIcon: '🌊',
    description: "Celebrates the formation of the state of Kerala and the remarkable culture, education, and social progress of its people.",
    importance: 'Encourages respect for regional identity, literature, and the unity of India.',
    sourceName: 'Government of Kerala',
  },
  {
    title: 'Tamil Nadu Day',
    hindiTitle: 'तमिलनाडु दिवस',
    category: 'Culture',
    categoryIcon: '🌴',
    description: "Commemorates the formation of Tamil Nadu and honors the language, arts, literature, and values of the Tamil-speaking people.",
    importance: 'Teaches love for language, culture, and the legacy of our great states.',
    sourceName: 'Government of Tamil Nadu',
  },
  {
    title: 'Andhra Pradesh Formation Day',
    hindiTitle: 'आंध्र प्रदेश स्थापना दिवस',
    category: 'Culture',
    categoryIcon: '🌅',
    description: "Celebrates the formation of Andhra Pradesh and the cultural richness, agricultural tradition, and contributions of its people.",
    importance: 'Highlights how each state enriches India with its own traditions and progress.',
    sourceName: 'Government of Andhra Pradesh',
  },
  {
    title: 'Chhattisgarh Foundation Day',
    hindiTitle: 'छत्तीसगढ़ स्थापना दिवस',
    category: 'Culture',
    categoryIcon: '🌄',
    description: "Celebrates the creation of Chhattisgarh and its vibrant tribal heritage, natural beauty, and community spirit.",
    importance: 'Teaches appreciation of India’s tribal culture, landscapes, and regional pride.',
    sourceName: 'Government of Chhattisgarh',
  },
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
  {
    title: 'International Day for the Elimination of Violence Against Women',
    hindiTitle: 'महिलाओं के खिलाफ हिंसा उन्मूलन दिवस',
    category: 'Education',
    categoryIcon: '🚫',
    description: "Calls attention to the need for safety, respect, equality, and dignity for women and girls everywhere.",
    importance: 'Teaches kindness, respect, and the duty to stand up against unfair treatment.',
    sourceName: 'United Nations',
  },
  {
    title: 'World Diabetes Day',
    hindiTitle: 'विश्व मधुमेह दिवस',
    category: 'Education',
    categoryIcon: '🩸',
    description: "Raises awareness about diabetes prevention, healthy choices, and the importance of regular health check-ups.",
    importance: 'Teaches healthy living, balance in food habits, and the importance of caring for the body.',
    sourceName: 'World Health Organization',
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
    title: 'World AIDS Day',
    hindiTitle: 'विश्व एड्स दिवस',
    category: 'Education',
    categoryIcon: '💙',
    description: "Spreads awareness about HIV/AIDS, prevention, compassion for patients, and safe health practices.",
    importance: 'Teaches kindness, medical awareness, and the importance of caring for community well-being.',
    sourceName: 'World Health Organization',
  },
  {
    title: 'Assam Foundation Day',
    hindiTitle: 'असम स्थापना दिवस',
    category: 'Culture',
    categoryIcon: '🌺',
    description: "Celebrates the cultural heritage, natural beauty, and identity of Assam as an important part of India’s Northeast.",
    importance: 'Teaches appreciation for regional diversity, language, and the beauty of our country.',
    sourceName: 'Government of Assam',
  },
  {
    title: 'World Human Rights Day',
    hindiTitle: 'विश्व मानवाधिकार दिवस',
    category: 'Education',
    categoryIcon: '⚖️',
    description: "Affirms the dignity, equality, and rights of every person and reminds us to treat all people with fairness and respect.",
    importance: 'Teaches justice, empathy, and the responsibility to protect every human being’s rights.',
    sourceName: 'United Nations',
  },
  {
    title: 'National Consumer Day',
    hindiTitle: 'राष्ट्रीय उपभोक्ता दिवस',
    category: 'Education',
    categoryIcon: '🛒',
    description: "Promotes awareness about consumer rights, fair trade, quality products, and smart buying decisions.",
    importance: 'Teaches responsible choices, honesty, and respect for consumer rights.',
    sourceName: 'Ministry of Consumer Affairs, Govt of India',
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
  {
    title: 'Savitribai Phule Jayanti',
    hindiTitle: 'सावित्रीबाई फुले जयंती',
    category: 'Personality',
    categoryIcon: '👩‍🏫',
    description: 'Honors India’s first woman teacher and a pioneer who worked for girls’ education, equality, and the dignity of every learner.',
    importance: 'Teaches courage, education for all, and standing against discrimination.',
    sourceName: 'Ministry of Education / Government of Maharashtra',
  },
  {
    title: 'Mahatma Gandhi Martyrdom Day',
    hindiTitle: 'महात्मा गांधी शहीद दिवस',
    category: 'Personality',
    categoryIcon: '🕊️',
    description: 'Remembers Mahatma Gandhi’s commitment to truth, non-violence, simplicity, and peaceful service to the nation.',
    importance: 'Teaches peaceful problem-solving, honesty, and compassion.',
    sourceName: 'National Archives of India',
  },
  {
    title: 'Chhatrapati Shivaji Maharaj Jayanti',
    hindiTitle: 'छत्रपति शिवाजी महाराज जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Celebrates the life of Chhatrapati Shivaji Maharaj, known for courageous leadership, good administration, and respect for people of all faiths.',
    importance: 'Teaches responsible leadership, courage, and respect for diversity.',
    sourceName: 'Government of Maharashtra',
  },
  {
    title: 'Ramakrishna Paramahansa Jayanti',
    hindiTitle: 'रामकृष्ण परमहंस जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Remembers the spiritual teacher whose life emphasized compassion, harmony among faiths, and service to humanity.',
    importance: 'Teaches tolerance, kindness, and respect for different paths of faith.',
    sourceName: 'Ramakrishna Mission',
  },
  {
    title: 'Babu Jagjivan Ram Birth Anniversary',
    hindiTitle: 'बाबू जगजीवन राम जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Honors Babu Jagjivan Ram, a freedom fighter and social justice leader who worked for equality, dignity, and representation for disadvantaged communities.',
    importance: 'Teaches equality, public service, perseverance, and respect for every citizen.',
    sourceName: 'Government of India / Ministry of Social Justice',
  },
  {
    title: 'Jyotirao Phule Jayanti',
    hindiTitle: 'ज्योतिराव फुले जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Remembers Mahatma Jyotirao Phule, a social reformer who fought caste discrimination and promoted education for women and oppressed communities.',
    importance: 'Teaches equality, critical thinking, and education as a path to social progress.',
    sourceName: 'Government of Maharashtra',
  },
  {
    title: 'Raja Ram Mohan Roy Jayanti',
    hindiTitle: 'राजा राममोहन राय जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Celebrates the social reformer who championed modern education, freedom of thought, women’s dignity, and the abolition of harmful customs.',
    importance: 'Teaches rational thinking, reform, and standing up for human dignity.',
    sourceName: 'National Archives of India',
  },
  {
    title: 'Maharana Pratap Jayanti',
    hindiTitle: 'महाराणा प्रताप जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Remembers Maharana Pratap for his courage, independence, resilience, and dedication to protecting his people and homeland.',
    importance: 'Teaches bravery, self-respect, perseverance, and duty.',
    sourceName: 'Government of Rajasthan',
  },
  {
    title: 'Ahilyabai Holkar Jayanti',
    hindiTitle: 'अहिल्याबाई होलकर जयंती',
    category: 'Personality',
    categoryIcon: '👩‍⚖️',
    description: 'Honors the respected queen and administrator who promoted justice, public welfare, temples, roads, and care for ordinary people.',
    importance: 'Teaches compassionate leadership, courage, and service to society.',
    sourceName: 'Government of Madhya Pradesh',
  },
  {
    title: 'Bal Gangadhar Tilak Jayanti',
    hindiTitle: 'बाल गंगाधर तिलक जयंती',
    category: 'Personality',
    categoryIcon: '🇮🇳',
    description: 'Remembers the freedom fighter, educator, and journalist who awakened national pride and popular participation in India’s freedom movement.',
    importance: 'Teaches civic courage, education, and active participation in public life.',
    sourceName: 'National Archives of India',
  },
  {
    title: 'Chandrashekhar Azad Jayanti',
    hindiTitle: 'चंद्रशेखर आजाद जयंती',
    category: 'Personality',
    categoryIcon: '🇮🇳',
    description: 'Pays tribute to the fearless revolutionary Chandrashekhar Azad, who dedicated his life to India’s independence and inspired young patriots.',
    importance: 'Teaches courage, discipline, sacrifice, and love for freedom.',
    sourceName: 'National Archives of India',
  },
  {
    title: 'Quit India Movement Anniversary',
    hindiTitle: 'भारत छोड़ो आंदोलन वर्षगांठ',
    category: 'History',
    categoryIcon: '🇮🇳',
    description: 'Recalls the 1942 movement that united Indians in the call for an end to colonial rule and complete independence.',
    importance: 'Teaches unity, peaceful civic action, and the value of freedom.',
    sourceName: 'National Archives of India',
  },
  {
    title: 'Narayana Guru Jayanti',
    hindiTitle: 'नारायण गुरु जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Honors the philosopher and social reformer who challenged caste discrimination and promoted education, equality, and spiritual unity.',
    importance: 'Teaches human equality, social harmony, and service.',
    sourceName: 'Government of Kerala',
  },
  {
    title: 'Periyar E. V. Ramasamy Birth Anniversary',
    hindiTitle: 'पेरियार ई. वी. रामासामी जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Remembers the social reformer who advocated self-respect, rational thought, women’s rights, and equality.',
    importance: 'Teaches questioning unfairness, equal dignity, and independent thinking.',
    sourceName: 'Government of Tamil Nadu',
  },
  {
    title: 'Ishwar Chandra Vidyasagar Jayanti',
    hindiTitle: 'ईश्वर चंद्र विद्यासागर जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Celebrates the educator and reformer who worked for widow remarriage, women’s education, and accessible learning.',
    importance: 'Teaches empathy, education, and reform through knowledge.',
    sourceName: 'National Archives of India',
  },
  {
    title: 'Rani Lakshmibai Jayanti',
    hindiTitle: 'रानी लक्ष्मीबाई जयंती',
    category: 'Personality',
    categoryIcon: '👩‍✈️',
    description: 'Honors the warrior queen of Jhansi, remembered for extraordinary courage and leadership during India’s 1857 uprising.',
    importance: 'Teaches bravery, determination, leadership, and love for the homeland.',
    sourceName: 'National Archives of India',
  },
  {
    title: 'Dr. Rajendra Prasad Jayanti',
    hindiTitle: 'डॉ. राजेंद्र प्रसाद जयंती',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Remembers India’s first President, freedom fighter, scholar, and a humble public servant who helped shape the Republic.',
    importance: 'Teaches humility, constitutional values, scholarship, and service.',
    sourceName: 'Rashtrapati Bhavan / National Archives of India',
  },
  {
    title: 'Atal Bihari Vajpayee Jayanti (Good Governance Day)',
    hindiTitle: 'अटल बिहारी वाजपेयी जयंती - सुशासन दिवस',
    category: 'Personality',
    categoryIcon: '👤',
    description: 'Celebrates the statesman, poet, and former Prime Minister known for public service, democratic dialogue, and inspiring Hindi poetry.',
    importance: 'Teaches good governance, respectful debate, patriotism, and clear communication.',
    sourceName: 'Government of India',
  },
  {
    title: 'Madan Mohan Malaviya Jayanti',
    hindiTitle: 'मदन मोहन मालवीय जयंती',
    category: 'Personality',
    categoryIcon: '👨‍🏫',
    description: 'Honors the educationist, freedom fighter, and founder of Banaras Hindu University who promoted learning, service, and national development.',
    importance: 'Teaches the power of education, character, and nation-building.',
    sourceName: 'Banaras Hindu University / Government of India',
  },
  {
    title: 'Veer Bal Diwas',
    hindiTitle: 'वीर बाल दिवस',
    category: 'History',
    categoryIcon: '🛡️',
    description: 'Remembers the courage and sacrifice of Sahibzadas Baba Zorawar Singh Ji and Baba Fateh Singh Ji and honors courage in young people.',
    importance: 'Teaches conviction, courage, faith, and standing firmly for what is right.',
    sourceName: 'Government of India',
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
    'Savitribai Phule Jayanti': { month: 1, day: 3 },
    'National Youth Day (Swami Vivekananda Jayanti)': { month: 1, day: 12 },
    'Indian Army Day': { month: 1, day: 15 },
    'Netaji Subhas Chandra Bose Jayanti (Parakram Diwas)': { month: 1, day: 23 },
    'National Girl Child Day': { month: 1, day: 24 },
    'National Voters’ Day': { month: 1, day: 25 },
    'Republic Day of India': { month: 1, day: 26 },
    'Mahatma Gandhi Martyrdom Day': { month: 1, day: 30 },
    'Chhatrapati Shivaji Maharaj Jayanti': { month: 2, day: 19 },
    'Ramakrishna Paramahansa Jayanti': { month: 2, day: 18 },
    'Sarojini Naidu Jayanti (National Women’s Day)': { month: 2, day: 13 },
    'International Women’s Day': { month: 3, day: 8 },
    'World Radio Day': { month: 2, day: 13 },
    'National Science Day': { month: 2, day: 28 },
    'World Wildlife Day': { month: 3, day: 3 },
    'National Engineers’ Day (Sir M. Visvesvaraya)': { month: 9, day: 15 },
    'Shaheed Diwas (Bhagat Singh, Sukhdev & Rajguru)': { month: 3, day: 23 },
    'Babu Jagjivan Ram Birth Anniversary': { month: 4, day: 5 },
    'Jyotirao Phule Jayanti': { month: 4, day: 11 },
    'World Water Day': { month: 3, day: 22 },
    'International Day of Happiness': { month: 3, day: 20 },
    'Dr. B. R. Ambedkar Jayanti (Equality Day)': { month: 4, day: 14 },
    'World Earth Day': { month: 4, day: 22 },
    'World Health Day': { month: 4, day: 7 },
    'Odisha Day (Utkal Divas)': { month: 4, day: 1 },
    'National Technology Day': { month: 5, day: 11 },
    'Maharashtra Day': { month: 5, day: 1 },
    'Gujarat Day': { month: 5, day: 1 },
    'Rabindranath Tagore Jayanti': { month: 5, day: 7 },
    'Raja Ram Mohan Roy Jayanti': { month: 5, day: 22 },
    'Maharana Pratap Jayanti': { month: 5, day: 9 },
    'Ahilyabai Holkar Jayanti': { month: 5, day: 31 },
    'World Day Against Child Labour': { month: 6, day: 12 },
    'World Population Day': { month: 7, day: 11 },
    'World Environment Day': { month: 6, day: 5 },
    'International Day of Yoga': { month: 6, day: 21 },
    'Telangana Formation Day': { month: 6, day: 2 },
    'National Doctors’ Day': { month: 7, day: 1 },
    'Kargil Vijay Diwas': { month: 7, day: 26 },
    'Bal Gangadhar Tilak Jayanti': { month: 7, day: 23 },
    'Chandrashekhar Azad Jayanti': { month: 7, day: 23 },
    'Quit India Movement Anniversary': { month: 8, day: 8 },
    'Independence Day of India': { month: 8, day: 15 },
    'National Handloom Day': { month: 8, day: 7 },
    'National Space Day': { month: 8, day: 23 },
    'National Sports Day (Major Dhyan Chand Jayanti)': { month: 8, day: 29 },
    'Narayana Guru Jayanti': { month: 8, day: 28 },
    'Periyar E. V. Ramasamy Birth Anniversary': { month: 9, day: 17 },
    'National Teachers’ Day': { month: 9, day: 5 },
    'International Day of Peace': { month: 9, day: 21 },
    'World Literacy Day': { month: 9, day: 8 },
    'Hindi Diwas': { month: 9, day: 14 },
    'World Ozone Day & Nature Protection': { month: 9, day: 16 },
    'Bhagat Singh Jayanti': { month: 9, day: 28 },
    'Ishwar Chandra Vidyasagar Jayanti': { month: 9, day: 26 },
    'Mahatma Gandhi Jayanti & Lal Bahadur Shastri Jayanti': { month: 10, day: 2 },
    'World Mental Health Day': { month: 10, day: 10 },
    'World Food Day': { month: 10, day: 16 },
    'Dr. A. P. J. Abdul Kalam Jayanti (World Students’ Day)': { month: 10, day: 15 },
    'National Unity Day (Rashtriya Ekta Diwas - Sardar Patel)': { month: 10, day: 31 },
    'Rani Lakshmibai Jayanti': { month: 11, day: 19 },
    'Birsa Munda Jayanti': { month: 11, day: 15 },
    'Jharkhand Foundation Day': { month: 11, day: 15 },
    'Karnataka Rajyotsava': { month: 11, day: 1 },
    'Kerala Piravi': { month: 11, day: 1 },
    'Tamil Nadu Day': { month: 11, day: 1 },
    'Andhra Pradesh Formation Day': { month: 11, day: 1 },
    'Chhattisgarh Foundation Day': { month: 11, day: 1 },
    'International Day for the Elimination of Violence Against Women': { month: 11, day: 25 },
    'World Diabetes Day': { month: 11, day: 14 },
    'National Education Day (Maulana Abul Kalam Azad)': { month: 11, day: 11 },
    'National Children’s Day (Bal Diwas - Chacha Nehru)': { month: 11, day: 14 },
    'Constitution Day of India (Samvidhan Diwas)': { month: 11, day: 26 },
    'Indian Navy Day': { month: 12, day: 4 },
    'World AIDS Day': { month: 12, day: 1 },
    'Assam Foundation Day': { month: 12, day: 2 },
    'World Human Rights Day': { month: 12, day: 10 },
    'National Consumer Day': { month: 12, day: 24 },
    'National Mathematics Day (Srinivasa Ramanujan)': { month: 12, day: 22 },
    'Kisan Diwas (National Farmers’ Day)': { month: 12, day: 23 },
    'Dr. Rajendra Prasad Jayanti': { month: 12, day: 3 },
    'Atal Bihari Vajpayee Jayanti (Good Governance Day)': { month: 12, day: 25 },
    'Madan Mohan Malaviya Jayanti': { month: 12, day: 25 },
    'Veer Bal Diwas': { month: 12, day: 26 },
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

  // Include every unique annual topic from the master workbook without duplicating richer app entries.
  const existingTitles = new Set(events.map((event) => event.title));
  WORKBOOK_EVENT_TEMPLATES.forEach((item, index) => {
    if (existingTitles.has(item.title)) return;

    const [month, day] = item.dateTemplate.split('-').map(Number);
    const monthStr = String(month).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    events.push({
      id: `workbook-${index}-${dateStr}`,
      title: item.title,
      category: item.category,
      categoryIcon: item.categoryIcon,
      dateStr,
      dayAndMonth: `${day} ${monthNames[month - 1]}`,
      year,
      description: `A school assembly topic about ${item.title} and its importance for students in ${item.region}.`,
      importance: item.importance,
      sourceName: item.source,
      score: 55,
    });
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
    {
      key: 'mahavir_jayanti',
      title: 'Mahavir Jayanti (Message of Non-Violence)',
      hindiTitle: 'महावीर जयंती - अहिंसा और करुणा का संदेश',
      category: 'Festival',
      categoryIcon: '🪔',
      description: 'Remembers the life and teachings of Lord Mahavira, including non-violence, truth, self-discipline, and compassion for every living being.',
      importance: 'Teaches peaceful choices, self-control, and respect for all life.',
      sourceName: 'Ministry of Culture, Govt of India',
    },
    {
      key: 'durga_puja',
      title: 'Durga Puja (Celebration of Courage and Goodness)',
      hindiTitle: 'दुर्गा पूजा - शक्ति और सदाचार का उत्सव',
      category: 'Festival',
      categoryIcon: '🪔',
      description: 'Celebrates the victory of Goddess Durga over evil and the values of courage, justice, devotion, and community celebration.',
      importance: 'Teaches courage, inner strength, and standing up for what is right.',
      sourceName: 'Ministry of Culture, Govt of India',
    },
    {
      key: 'onam',
      title: 'Onam (Festival of Harvest and Togetherness)',
      hindiTitle: 'ओणम - फसल और एकता का पर्व',
      category: 'Festival',
      categoryIcon: '🪔',
      description: 'Celebrates Kerala’s harvest season through gratitude, cultural traditions, hospitality, and joyful community gatherings.',
      importance: 'Teaches gratitude, sharing, equality, and respect for regional traditions.',
      sourceName: 'Kerala Tourism / Ministry of Culture',
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
  let alternatives = scoredEvents.slice(1, 6);

  if (alternatives.length < 5) {
    const fallbackIds = new Set(alternatives.map((item) => item.id));
    for (const evergreen of EVERGREEN_TOPICS) {
      if (alternatives.length >= 5) break;
      if (!fallbackIds.has(evergreen.id)) {
        alternatives.push({
          ...evergreen,
          score: evergreen.score ?? 80,
          proximityDays: 99,
          isCurrentOrUpcoming: true,
        });
        fallbackIds.add(evergreen.id);
      }
    }
  }

  return {
    recommended,
    alternatives,
    allScored: scoredEvents,
  };
}
