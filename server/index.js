"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const allowedOrigins = [
    "http://localhost:3000",
    "https://realtime-project-firebase-web.vercel.app",
];
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
}));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
exports.default = app;
