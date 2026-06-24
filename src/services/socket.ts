import { io, Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.DEV
  ? 'http://localhost:3001'
  : import.meta.env.VITE_SERVER_URL ?? 'https://dogpark-server.onrender.com';

let socket: Socket | null = null;

export function connectSocket(): Socket {
  if (socket?.connected) return socket;
  socket = io(SERVER_URL, { transports: ['websocket'] });
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}

export function getSocket(): Socket | null {
  return socket;
}
