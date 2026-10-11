export const I18N = {
  bn: {
    title: 'Learn NL Studio | ফ্রি টিউটোরিয়াল ও গাইড',
    headerTitle: 'লার্ন এনএল স্টুডিও - ফ্রি গাইড হাব',
    headerSub: 'স্টুডিও, ফটো মেকিং ও সকল অনলাইন সেবার কাজ কীভাবে নিজে করবেন তার উন্মুক্ত বাংলা গাইড ও টিউটোরিয়াল।',
    badge: '📖 ১০০% ফ্রি উন্মুক্ত নলেজ বেস',
    searchPlaceholder: 'যেকোনো কাজ বা সমস্যার নাম লিখে খুঁজুন (যেমন: পাসপোর্ট, প্রিন্ট, ফর্ম)...',
    stepsLabel: 'ধাপসমূহ',
    readMoreBtn: 'বিস্তারিত গাইড পড়ুন ➜',
    closeModalBtn: 'বন্ধ করুন',
    footerText: '© ২০২৬ লার্ন এনএল স্টুডিও - সবার জন্য উন্মুক্ত ডিজিটাল শিক্ষা।'
  },
  en: {
    title: 'Learn NL Studio | Free Tutorials & Guides',
    headerTitle: 'Learn NL Studio - Free Guides Hub',
    headerSub: 'Step-by-step guides on how to accomplish digital studio, photo making and online services completely free.',
    badge: '📖 100% Free Open Knowledge Base',
    searchPlaceholder: 'Search topics or tasks (e.g. passport, print, form)...',
    stepsLabel: 'Steps',
    readMoreBtn: 'Read Detailed Guide ➜',
    closeModalBtn: 'Close',
    footerText: '© 2026 Learn NL Studio - Open digital learning for all.'
  }
};

export function getLanguage() {
  return localStorage.getItem('nl_learn_lang') || 'bn';
}

export function setLanguage(lang) {
  localStorage.setItem('nl_learn_lang', lang);
}
