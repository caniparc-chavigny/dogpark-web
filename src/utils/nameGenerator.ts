const adjectives = [
  'rapide', 'calme', 'doux', 'vif', 'sage',
  'brun', 'gris', 'bleu', 'vert', 'noir',
  'bold', 'warm', 'cool', 'free', 'kind',
];

const nouns = [
  'chien', 'nuage', 'arbre', 'vent', 'lac',
  'parc', 'herbe', 'bois', 'fleur', 'soleil',
  'cloud', 'river', 'leaf', 'stone', 'bird',
];

// Runs locally — name is NEVER sent to the server
export function generateLocalName(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${adj}${noun}${suffix}`;
}

export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
