// Client-side pre-filter — le serveur valide aussi avec bannedWords.json
// La normalisation Unicode bloque les variantes avec accents/espaces

const BANNED_FR = [
  'tabarnac', 'tabarnak', 'crisse', 'ostie', 'osti', 'câlice', 'calice',
  'sacrament', 'merde', 'putain', 'connard', 'salope', 'fils de pute',
  'va chier', 'mange', 'cul',
];

const BANNED_EN = [
  'fuck', 'shit', 'bitch', 'cunt', 'nigger', 'faggot', 'asshole',
  'bastard', 'whore', 'slut',
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // enlève les diacritiques
    .replace(/\s+/g, '');            // enlève les espaces (contournements)
}

export function containsBannedWord(text: string): boolean {
  const normalized = normalize(text);
  return [...BANNED_FR, ...BANNED_EN].some(word =>
    normalized.includes(normalize(word))
  );
}
