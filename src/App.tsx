import { useEffect, useState } from 'react';
import { LanguageProvider, useLang } from './context/LanguageContext';
import { SessionProvider } from './context/SessionContext';
import { ThemeProvider } from './context/ThemeContext';
import LanguageScreen from './screens/LanguageScreen';
import ConsentScreen from './screens/ConsentScreen';
import MapScreen from './screens/MapScreen';
import NoteScreen from './screens/NoteScreen';
import ClosedScreen from './screens/ClosedScreen';

export type Screen = 'language' | 'consent' | 'map' | 'note' | 'closed';

function isParkOpen() {
  const h = new Date().getHours();
  return h >= 7 && h < 21;
}

function Router() {
  const { ready } = useLang();
  const [screen, setScreen] = useState<Screen | null>(null);
  const [spectator, setSpectator] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const lang = localStorage.getItem('dogpark_lang');
    if (!lang) { setScreen('language'); return; }
    if (!isParkOpen()) { setScreen('closed'); return; }
    setScreen('consent');
  }, [ready]);

  const go = (s: Screen) => setScreen(s);

  if (!screen) return <div className="splash" />;

  return (
    <>
      {screen === 'language' && <LanguageScreen onDone={() => go(isParkOpen() ? 'consent' : 'closed')} />}
      {screen === 'closed'   && <ClosedScreen />}
      {screen === 'consent'  && (
        <ConsentScreen
          onEnter={() => { setSpectator(false); go('map'); }}
          onSpectate={() => { setSpectator(true); go('map'); }}
        />
      )}
      {screen === 'map'      && (
        <MapScreen
          spectator={spectator}
          onLeave={() => go('consent')}
          onNote={() => go('note')}
        />
      )}
      {screen === 'note'     && <NoteScreen onBack={() => go('map')} />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SessionProvider>
          <Router />
        </SessionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
