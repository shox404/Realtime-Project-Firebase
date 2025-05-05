import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const allowedOrigins = [
  "http://localhost:3000",
  "https://realtime-project-firebase-web.vercel.app",
];

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send-message", (message) => {
    console.log("Message received:", message);

    io.emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Socket.IO server running on http://localhost:4000");
});

export default app;
