"use client";

import { useEffect, useState } from "react";
import socket from "./socket";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send-message", message);
      setMessage("");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Real-Time Chat</h1>
      <div>
        {chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </main>
  );
}
