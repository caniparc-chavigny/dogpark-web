import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { generateLocalName, generateSessionId } from '../utils/nameGenerator';

export interface Session {
  sessionId: string;
  localName: string;
  visible: boolean;
  note: string | null;
  notesRemaining: number;
  isInPark: boolean;
}

interface SessionContextType {
  session: Session | null;
  startSession: (visible: boolean) => Session;
  setVisible: (v: boolean) => void;
  setNote: (note: string | null) => void;
  setInPark: (inPark: boolean) => void;
  endSession: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  function startSession(visible: boolean): Session {
    const s: Session = {
      sessionId: generateSessionId(),
      localName: generateLocalName(),
      visible,
      note: null,
      notesRemaining: 3,
      isInPark: true,
    };
    setSession(s);
    return s;
  }

  function setVisible(visible: boolean) {
    setSession(prev => (prev ? { ...prev, visible } : prev));
  }

  function setNote(note: string | null) {
    setSession(prev => {
      if (!prev) return prev;
      const isNewNote = prev.note === null && note !== null;
      return {
        ...prev,
        note,
        notesRemaining: isNewNote ? prev.notesRemaining - 1 : prev.notesRemaining,
      };
    });
  }

  function setInPark(isInPark: boolean) {
    setSession(prev => {
      if (!prev) return prev;
      if (!isInPark && prev.isInPark) {
        return {
          ...prev,
          sessionId: generateSessionId(),
          localName: generateLocalName(),
          isInPark: false,
          note: null,
          notesRemaining: 3,
        };
      }
      return { ...prev, isInPark };
    });
  }

  function endSession() { setSession(null); }

  return (
    <SessionContext.Provider value={{ session, startSession, setVisible, setNote, setInPark, endSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be inside SessionProvider');
  return ctx;
}
