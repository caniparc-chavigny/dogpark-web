export type Lang = 'fr' | 'en';

export interface Strings {
  chooseLanguage: string;
  continue: string;
  scanTitle: string;
  scanHint: string;
  cameraRequired: string;
  cameraRequiredSub: string;
  allowCamera: string;
  devSkip: string;
  welcome: string;
  visibilityQuestion: string;
  visible: string;
  invisible: string;
  visibleHint: string;
  invisibleHint: string;
  enterPark: string;
  parkClosed: string;
  parkClosedSub: string;
  parkClosedBack: string;
  parkName: string;
  leave: string;
  visitors: (n: number) => string;
  outOfPark: string;
  outOfParkSub: string;
  leaveApp: string;
  gpsRequired: string;
  gpsRequiredSub: string;
  addNote: string;
  editNote: string;
  invisibleNoteHint: string;
  connecting: string;
  serverError: string;
  myNote: string;
  cancel: string;
  save: string;
  noteSlotLabel: (remaining: number, isEditing: boolean) => string;
  signalTitle: string;
  signalText: string;
  characters: (n: number) => string;
  noteRejected: string;
  bannedWord: string;
  deleteNote: string;
  invisibleInfo: string;
  spectate: string;
  spectateHint: string;
  spectatorBanner: string;
  enterAsParticipant: string;
  noOneHere: string;
}

const strings: Record<Lang, Strings> = {
  fr: {
    // Language screen
    chooseLanguage: 'Choisissez votre langue',
    continue: 'Continuer',

    // Scan screen
    scanTitle: 'Scanner le code QR',
    scanHint: "à l'entrée du parc",
    cameraRequired: 'Accès à la caméra requis',
    cameraRequiredSub: 'Pour scanner le code QR à l\'entrée du parc.',
    allowCamera: 'Autoriser la caméra',
    devSkip: '[DEV] Ignorer le scan',

    // Consent screen
    welcome: 'Bienvenue au parc',
    visibilityQuestion: 'Veux-tu être visible sur la carte?',
    visible: '👁  Visible',
    invisible: '🫥  Invisible',
    visibleHint: 'Les autres visiteurs te voient sur la carte. Tu peux laisser des notes.',
    invisibleHint: "Tu vois la carte mais tu n'y apparais pas. Pas de notes en mode invisible.",
    enterPark: 'Entrer dans le parc →',

    // Park closed screen
    parkClosed: 'Parc fermé',
    parkClosedSub: 'Le parc à chiens est ouvert de 7h00 à 21h00.',
    parkClosedBack: 'Revenir demain',

    // Map screen
    parkName: 'Parc de Chavigny',
    leave: '← Partir',
    visitors: (n: number) => `${n} ${n === 1 ? 'visiteur' : 'visiteurs'}`,
    outOfPark: 'Tu as quitté le parc',
    outOfParkSub: 'Reviens dans la zone pour réapparaître sur la carte.',
    leaveApp: "Quitter l'app",
    gpsRequired: 'GPS requis',
    gpsRequiredSub: 'Active la localisation pour apparaître sur la carte.',
    addNote: '📝  Laisser une note',
    editNote: '✏️  Modifier la note',
    invisibleNoteHint: 'Passe en visible pour laisser une note.',
    connecting: 'Connexion au serveur…',
    serverError: 'Serveur introuvable. Vérifie ta connexion.',

    // Note screen
    myNote: 'Ma note',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    noteSlotLabel: (remaining: number, isEditing: boolean) =>
      isEditing
        ? 'Modifier une note ne décompte pas'
        : remaining === 0
          ? 'Plus de notes pour ce séjour'
          : `${remaining} note${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''} ce séjour`,
    signalTitle: '✦ Signal personnel',
    signalText:
      "Ta note n'est pas un message direct. C'est un signal que seul celui qui comprend la référence peut décoder.",
    characters: (n: number) => `${n} caractères`,
    noteRejected: 'Note refusée par le serveur. Modifie le texte.',
    bannedWord: "Ce mot n'est pas autorisé dans le parc.",
    deleteNote: '🗑  Supprimer ma note',
    invisibleInfo:
      "💡 Si tu passes en invisible, ta note disparaît de la carte — mais elle n'est pas consommée. Elle revient quand tu redeviens visible.",
    spectate: '👀  Voir qui est au parc',
    spectateHint: 'Regarde la carte à distance, sans y être. Pratique pour voir si un ami est présent grâce à sa note.',
    spectatorBanner: '👀 Vue à distance · tu n\'apparais pas sur la carte',
    enterAsParticipant: 'Je suis au parc →',
    noOneHere: 'Personne n\'est visible au parc pour le moment.',
  },

  en: {
    chooseLanguage: 'Choose your language',
    continue: 'Continue',

    scanTitle: 'Scan the QR code',
    scanHint: 'at the park entrance',
    cameraRequired: 'Camera access required',
    cameraRequiredSub: 'To scan the QR code at the park entrance.',
    allowCamera: 'Allow camera',
    devSkip: '[DEV] Skip scan',

    welcome: 'Welcome to the park',
    visibilityQuestion: 'Do you want to appear on the map?',
    visible: '👁  Visible',
    invisible: '🫥  Invisible',
    visibleHint: 'Other visitors will see you on the map. You can leave notes.',
    invisibleHint: "You see the map but don't appear on it. Notes require visible mode.",
    enterPark: 'Enter the park →',

    parkClosed: 'Park closed',
    parkClosedSub: 'The dog park is open from 7:00 AM to 9:00 PM.',
    parkClosedBack: 'Come back tomorrow',

    parkName: 'Chavigny Dog Park',
    leave: '← Leave',
    visitors: (n: number) => `${n} ${n === 1 ? 'visitor' : 'visitors'}`,
    outOfPark: 'You left the park',
    outOfParkSub: 'Come back to the zone to reappear on the map.',
    leaveApp: 'Leave app',
    gpsRequired: 'GPS required',
    gpsRequiredSub: 'Enable location to appear on the map.',
    addNote: '📝  Leave a note',
    editNote: '✏️  Edit note',
    invisibleNoteHint: 'Switch to visible to leave a note.',
    connecting: 'Connecting to server…',
    serverError: 'Server unreachable. Check your connection.',

    myNote: 'My note',
    cancel: 'Cancel',
    save: 'Save',
    noteSlotLabel: (remaining: number, isEditing: boolean) =>
      isEditing
        ? 'Editing a note does not count toward your limit'
        : remaining === 0
          ? 'No more notes for this visit'
          : `${remaining} note${remaining > 1 ? 's' : ''} remaining this visit`,
    signalTitle: '✦ Personal signal',
    signalText:
      "Your note isn't a direct message. It's a signal only someone who gets the reference can decode.",
    characters: (n: number) => `${n} characters`,
    noteRejected: 'Note rejected by server. Edit the text.',
    bannedWord: 'That word is not allowed in the park.',
    deleteNote: '🗑  Delete my note',
    invisibleInfo:
      "💡 Going invisible hides your note from the map — but it's not consumed. It comes back when you go visible again.",
    spectate: '👀  See who\'s at the park',
    spectateHint: 'View the map remotely, without being there. Handy to check if a friend is around thanks to their note.',
    spectatorBanner: '👀 Remote view · you don\'t appear on the map',
    enterAsParticipant: 'I\'m at the park →',
    noOneHere: 'No one is visible at the park right now.',
  },
};

export default strings;
