import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const isLocalhost = isBrowser && window.location.hostname === "localhost";

export const SOCKET_URL = isLocalhost
  ? `http://localhost:4000`
  : "https://realtime-project-firebase-api.vercel.app";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;
