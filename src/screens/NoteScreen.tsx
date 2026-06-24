import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext';
import { connectSocket } from '../services/socket';
import { containsBannedWord } from '../utils/wordFilter';
import SakuraPetals from '../components/SakuraPetals';
import s from './screens.module.css';

const MAX_CHARS = 80;

const PLACEHOLDERS: Record<string, string[]> = {
  fr: [
    'ex: labrador brun aux yeux verts',
    'ex: angel',
    'ex: qui a le golden retriever?',
    'ex: beau berger australien blanc',
  ],
  en: [
    'ex: brown lab with green eyes',
    'ex: angel',
    'ex: who has the golden retriever?',
    'ex: beautiful white aussie shepherd',
  ],
};

export default function NoteScreen({ onBack }: { onBack: () => void }) {
  const { t, lang } = useLang();
  const { session, setNote } = useSession();
  const [text, setText] = useState(session?.note ?? '');
  const [error, setError] = useState('');
  const placeholder = useRef(
    PLACEHOLDERS[lang][Math.floor(Math.random() * PLACEHOLDERS[lang].length)]
  ).current;

  useEffect(() => {
    const socket = connectSocket();
    socket.on('note_rejected', () => {
      setNote(session?.note ?? null);
      setError(t.noteRejected);
    });
    return () => { socket.off('note_rejected'); };
  }, []);

  function handleSave() {
    const trimmed = text.trim();
    if (!trimmed) { handleDelete(); return; }
    if (containsBannedWord(trimmed)) { setError(t.bannedWord); return; }
    setNote(trimmed);
    const socket = connectSocket();
    if (session) socket.emit('note', { sessionId: session.sessionId, note: trimmed });
    onBack();
  }

  function handleDelete() {
    setNote(null);
    const socket = connectSocket();
    if (session) socket.emit('note', { sessionId: session.sessionId, note: null });
    onBack();
  }

  const remaining = MAX_CHARS - text.length;
  const notesLeft = session?.notesRemaining ?? 0;
  const isEditing = session?.note != null;
  const slotsUsed = 3 - notesLeft;

  return (
    <div className={s.screen}>
      <SakuraPetals count={8} />
      <div className={s.noteInner}>

        <div className={s.noteHeader}>
          <button className={s.textBtn} onClick={onBack}>{t.cancel}</button>
          <span className={s.noteTitle}>{t.myNote}</span>
          <button className={s.textBtnGreen} onClick={handleSave}>{t.save}</button>
        </div>

        {/* Slots visuels */}
        <div className={s.slotsRow}>
          {[0, 1, 2].map(i => (
            <div key={i} className={`${s.slot} ${i < slotsUsed ? s.slotUsed : s.slotFree}`} />
          ))}
          <span className={s.slotsLabel}>{t.noteSlotLabel(notesLeft, isEditing)}</span>
        </div>

        {/* Concept stéganographie */}
        <div className={s.conceptBox}>
          <span className={s.conceptTitle}>{t.signalTitle}</span>
          <p className={s.conceptText}>{t.signalText}</p>
        </div>

        <textarea
          className={`${s.noteInput} ${error ? s.noteInputError : ''}`}
          value={text}
          onChange={e => { setText(e.target.value.slice(0, MAX_CHARS)); setError(''); }}
          placeholder={placeholder}
          autoFocus
          maxLength={MAX_CHARS}
        />

        <div className={s.noteFooter}>
          <span className={`${s.charCount} ${remaining <= 10 ? s.charCountWarn : ''}`}>
            {t.characters(remaining)}
          </span>
          {error && <span className={s.noteError}>{error}</span>}
        </div>

        {session?.note && (
          <button className={s.deleteBtn} onClick={handleDelete}>{t.deleteNote}</button>
        )}

        <div className={s.infoBox}>
          <p className={s.infoTxt}>{t.invisibleInfo}</p>
        </div>
      </div>
    </div>
  );
}
