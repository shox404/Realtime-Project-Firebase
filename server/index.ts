import { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send-message", (message) => {
    console.log("Message:", message);
    io.emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Socket.IO server running on http://localhost:4000");
});

export default (req: VercelRequest, res: VercelResponse) => {
  server.emit("request", req, res);
};
