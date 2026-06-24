import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Circle, Tooltip, useMap } from 'react-leaflet';
import { useLang } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext';
import { useTheme, MAP_COLORS } from '../context/ThemeContext';
import { connectSocket, disconnectSocket } from '../services/socket';
import { PARK, isInsidePark } from '../utils/geofence';
import s from './screens.module.css';

// Fix icône Leaflet cassée par Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface RemoteUser {
  sessionId: string;
  position: { lat: number; lng: number };
  visible: boolean;
  note: string | null;
}

type SocketStatus = 'connecting' | 'connected' | 'error';

// Recentre la carte sur la position de l'utilisateur à l'entrée
function RecenterOnce({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  const done = useRef(false);
  useEffect(() => {
    if (coords && !done.current) {
      map.flyTo(coords, 19, { duration: 1.5 });
      done.current = true;
    }
  }, [coords]);
  return null;
}

export default function MapScreen({
  spectator = false,
  onLeave,
  onNote,
}: {
  spectator?: boolean;
  onLeave: () => void;
  onNote: () => void;
}) {
  const { t } = useLang();
  const { theme } = useTheme();
  const mc = MAP_COLORS[theme];
  const { session, setVisible, setInPark, endSession } = useSession();
  const [remoteUsers, setRemoteUsers] = useState<RemoteUser[]>([]);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [isOutOfPark, setIsOutOfPark] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const [socketStatus, setSocketStatus] = useState<SocketStatus>('connecting');

  const sessionRef = useRef(session);
  useEffect(() => { sessionRef.current = session; }, [session]);

  useEffect(() => {
    const socket = connectSocket();
    socket.on('connect', () => setSocketStatus('connected'));
    socket.on('connect_error', () => setSocketStatus('error'));
    socket.on('disconnect', () => setSocketStatus('error'));
    socket.on('users', (users: RemoteUser[]) => {
      setRemoteUsers(users.filter(u => u.sessionId !== sessionRef.current?.sessionId));
    });
    socket.on('park_closed', () => {
      endSession();
      onLeave();
    });

    if (!spectator && session) {
      socket.emit('join', { sessionId: session.sessionId, visible: session.visible });
    }

    if (!spectator) startGPS(socket);

    return () => {
      if (sessionRef.current) {
        socket.emit('leave', { sessionId: sessionRef.current.sessionId });
      }
      disconnectSocket();
    };
  }, []);

  function startGPS(socket: ReturnType<typeof connectSocket>) {
    if (!navigator.geolocation) { setLocationDenied(true); return; }

    navigator.geolocation.watchPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        setUserCoords([lat, lng]);

        const inside = isInsidePark(lat, lng);
        setIsOutOfPark(!inside);
        setInPark(inside);

        const s = sessionRef.current;
        if (!s) return;

        if (inside) {
          socket.emit('position', {
            sessionId: s.sessionId,
            position: { lat, lng },
            visible: s.visible,
            note: s.visible ? s.note : null,
          });
        } else {
          socket.emit('leave', { sessionId: s.sessionId });
        }
      },
      () => setLocationDenied(true),
      { enableHighAccuracy: true, maximumAge: 3000 }
    );
  }

  function toggleVisibility() {
    const s = sessionRef.current;
    if (!s) return;
    const newVisible = !s.visible;
    setVisible(newVisible);
    const socket = connectSocket();
    socket.emit('visibility', { sessionId: s.sessionId, visible: newVisible });
    if (!newVisible && s.note) socket.emit('note', { sessionId: s.sessionId, note: null });
    else if (newVisible && s.note) socket.emit('note', { sessionId: s.sessionId, note: s.note });
  }

  function handleLeave() {
    endSession();
    onLeave();
  }

  const isVisible = session?.visible ?? true;
  const note = session?.note ?? null;
  const notesLeft = session?.notesRemaining ?? 3;
  const visibleCount =
    remoteUsers.filter(u => u.visible).length + (isVisible && userCoords ? 1 : 0);

  return (
    <div className={s.mapWrapper}>
      {/* Carte Leaflet satellite */}
      <MapContainer
        center={[PARK.latitude, PARK.longitude]}
        zoom={18}
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}>

        {/* Tuiles satellite Esri — gratuites, pas de clé API */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="© Esri"
          maxZoom={20}
        />

        {/* Recentrer sur l'utilisateur à l'arrivée */}
        <RecenterOnce coords={userCoords} />

        {/* Zone du parc */}
        <Circle
          center={[PARK.latitude, PARK.longitude]}
          radius={PARK.radius}
          pathOptions={{ color: mc.circle, fillColor: mc.circle, fillOpacity: 0.08, weight: 2.5 }}
        />

        {/* Utilisateur courant */}
        {isVisible && userCoords && (
          <CircleMarker
            center={userCoords}
            radius={11}
            pathOptions={{ color: mc.selfStroke, fillColor: mc.selfFill, fillOpacity: 1, weight: 4 }}>
            {note && <Tooltip permanent direction="top" offset={[0, -12]}>{note}</Tooltip>}
          </CircleMarker>
        )}

        {/* Autres visiteurs */}
        {remoteUsers.filter(u => u.visible).map(u => (
          <CircleMarker
            key={u.sessionId}
            center={[u.position.lat, u.position.lng]}
            radius={9}
            pathOptions={{ color: mc.otherStroke, fillColor: mc.otherFill, fillOpacity: 1, weight: 2.5 }}>
            {u.note && (
              <Tooltip permanent direction="top" offset={[0, -10]}>{u.note}</Tooltip>
            )}
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Overlay hors-zone */}
      {!spectator && isOutOfPark && (
        <div className={s.overlay}>
          <span className={s.overlayEmoji}>📍</span>
          <h2 className={s.overlayTitle}>{t.outOfPark}</h2>
          <p className={s.overlaySub}>{t.outOfParkSub}</p>
          <button className={s.outlineBtn} onClick={handleLeave}>{t.leaveApp}</button>
        </div>
      )}

      {!spectator && locationDenied && (
        <div className={s.overlay}>
          <span className={s.overlayEmoji}>🔒</span>
          <h2 className={s.overlayTitle}>{t.gpsRequired}</h2>
          <p className={s.overlaySub}>{t.gpsRequiredSub}</p>
        </div>
      )}

      {/* Header */}
      <div className={s.mapHeader}>
        <button className={s.mapPill} onClick={handleLeave}>{t.leave}</button>

        <div className={s.mapTitleBlock}>
          <span className={s.mapTitle}>{t.parkName}</span>
          {socketStatus === 'connecting' && (
            <span className={s.chipConnecting}>{t.connecting}</span>
          )}
          {socketStatus === 'error' && (
            <span className={s.chipError}>{t.serverError}</span>
          )}
          {socketStatus === 'connected' && visibleCount > 0 && (
            <span className={s.chipCount}>{t.visitors(visibleCount)}</span>
          )}
        </div>

        <div style={{ width: 70 }} />
      </div>

      {/* Footer participant */}
      {!spectator && !isOutOfPark && !locationDenied && (
        <div className={s.mapFooter}>
          <button
            className={`${s.mapToggle} ${isVisible ? s.mapToggleActive : ''}`}
            onClick={toggleVisibility}>
            {isVisible ? t.visible : t.invisible}
          </button>

          {isVisible ? (
            <button
              className={`${s.noteBtn} ${notesLeft === 0 ? s.noteBtnDisabled : ''}`}
              disabled={notesLeft === 0}
              onClick={onNote}>
              {note ? t.editNote : t.addNote}
              <span className={s.badge}>{notesLeft}</span>
            </button>
          ) : (
            <p className={s.invisibleHint}>{t.invisibleNoteHint}</p>
          )}
        </div>
      )}

      {/* Footer spectateur — vue à distance */}
      {spectator && (
        <div className={s.mapFooter}>
          <p className={s.invisibleHint}>{t.spectatorBanner}</p>
          <button className={s.mapToggle} onClick={handleLeave}>
            {t.enterAsParticipant}
          </button>
        </div>
      )}
    </div>
  );
}
