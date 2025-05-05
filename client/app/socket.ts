import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_WEB_TYPE === "production"
    ? "https://realtime-project-firebase-api.vercel.app"
    : "http://localhost:4000"
);

export default socket;
