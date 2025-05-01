import { LettersWithDiacritics } from './models/LettersWithDiacritics';

// Change type to LettersWithDiacritics[] and map strings to objects
export const sinhalaLettersLevelBasic: LettersWithDiacritics[] = [
  // Vowels
  { key: 'අ' },
  { key: 'ආ' },
  { key: 'ඇ' },
  { key: 'ඉ' },

  // Consonants
  { key: 'ක' },
  { key: 'ග' },
  { key: 'ඟ' },
  { key: 'ජ' },
  { key: 'ට' },
  { key: 'ඩ' },
  { key: 'ත' },
  { key: 'ද' },
  { key: 'න' },
  { key: 'ඳ' },
  { key: 'ප' },
  { key: 'බ' },
  { key: 'ම' },
  { key: 'ඹ' },
  { key: 'ය' },
  { key: 'ර' },
  { key: 'ල' },
  { key: 'ව' },
  { key: 'ෂ' },
  { key: 'ස' },
  { key: 'හ' },
  { key: 'ළ' },
];

export const sinhalaLettersLevelBasicForDiacritics: LettersWithDiacritics[] = [
  // Vowels
  { key: 'අ' },
  { key: 'ආ' },
  { key: 'ඇ' },
  { key: 'ඉ' },

  // Consonants
  { key: 'ක', diacritics: ['කා', 'කැ', 'කෑ', 'කි', 'කී', 'කු', 'කූ', 'කෙ', 'කේ', 'ක්'] }, // Added 'ක්'
  { key: 'ග', diacritics: ['ගා', 'ගැ', 'ගෑ', 'ගි', 'ගී', 'ගු', 'ගූ', 'ගෙ', 'ගේ', 'ග්'] }, // Added 'ග්'
  { key: 'ඟ' }, // Added 'ඟ්'
  { key: 'ජ', diacritics: ['ජා', 'ජැ', 'ජෑ', 'ජි', 'ජී', 'ජු', 'ජූ', 'ජෙ', 'ජේ', 'ජ්'] }, // Added 'ජ්'
  { key: 'ට', diacritics: ['ටා', 'ටැ', 'ටෑ', 'ටි', 'ටී', 'ටු', 'ටූ', 'ටෙ', 'ටේ', 'ට්'] }, // Added 'ට්'
  { key: 'ඩ', diacritics: ['ඩා', 'ඩැ', 'ඩෑ', 'ඩි', 'ඩී', 'ඩු', 'ඩූ', 'ඩෙ', 'ඩේ', 'ඩ්'] }, // Added 'ඩ්'
  { key: 'ත', diacritics: ['තා', 'තැ', 'තෑ', 'ති', 'තී', 'තු', 'තූ', 'තෙ', 'තේ', 'ත්'] }, // 'ත්' already added
  { key: 'ද', diacritics: ['දා', 'දැ', 'දෑ', 'දි', 'දී', 'දු', 'දූ', 'දෙ', 'දේ', 'ද්'] }, // Added 'ද්'
  { key: 'න', diacritics: ['නා', 'නැ', 'නෑ', 'නි', 'නී', 'නු', 'නූ', 'නෙ', 'නේ', 'න්'] }, // Added 'න්'
  { key: 'ඳ' }, // Added 'ඳ්'
  { key: 'ප', diacritics: ['පා', 'පැ', 'පෑ', 'පි', 'පී', 'පු', 'පූ', 'පෙ', 'පේ', 'ප්'] }, // Added 'ප්'
  { key: 'බ', diacritics: ['බා', 'බැ', 'බෑ', 'බි', 'බී', 'බු', 'බූ', 'බෙ', 'බේ', 'බ්'] }, // Added 'බ්'
  { key: 'ම', diacritics: ['මා', 'මැ', 'මෑ', 'මි', 'මී', 'මු', 'මූ', 'මෙ', 'මේ', 'ම්'] }, // Added 'ම්'
  { key: 'ඹ' }, // Added 'ඹ්'
  { key: 'ය', diacritics: ['යා', 'යැ', 'යෑ', 'යි', 'යී', 'යු', 'යූ', 'යෙ', 'යේ', 'ය්'] }, // Added 'ය්'
  { key: 'ර', diacritics: ['රා', 'රැ', 'රෑ', 'රි', 'රී', 'රු', 'රූ', 'රෙ', 'රේ', 'ර්'] }, // Added 'ර්'
  { key: 'ල', diacritics: ['ලා', 'ලැ', 'ලෑ', 'ලි', 'ලී', 'ලු', 'ලූ', 'ලෙ', 'ලේ', 'ල්'] }, // Added 'ල්'
  { key: 'ව', diacritics: ['වා', 'වැ', 'වෑ', 'වි', 'වී', 'වු', 'වූ', 'වෙ', 'වේ', 'ව්'] }, // Added 'ව්'
  { key: 'ෂ', diacritics: ['ෂා', 'ෂැ', 'ෂෑ', 'ෂි', 'ෂී', 'ෂු', 'ෂූ', 'ෂෙ', 'ෂේ', 'ෂ්'] }, // Added 'ෂ්'
  { key: 'ස', diacritics: ['සා', 'සැ', 'සෑ', 'සි', 'සී', 'සු', 'සූ', 'සෙ', 'සේ', 'ස්'] }, // Added 'ස්'
  { key: 'හ', diacritics: ['හා', 'හැ', 'හෑ', 'හි', 'හී', 'හු', 'හූ', 'හෙ', 'හේ', 'හ්'] }, // Added 'හ්'
  { key: 'ළ', diacritics: ['ළා', 'ළැ', 'ළෑ', 'ළි', 'ළී', 'ළු', 'ළූ', 'ළෙ', 'ළේ', 'ළ්'] }, // Added 'ළ්'
];
