import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const isLocalhost = isBrowser && window.location.hostname === "localhost";

export const SOCKET_URL = isLocalhost
  ? `http://localhost:4000`
  : "https://realtime-project-firebase.onrender.com";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  timeout: 10000,
});

export default socket;
