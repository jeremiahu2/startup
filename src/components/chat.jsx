import React, { useEffect, useState, useRef } from "react";

export default function Chat({ loggedIn, username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    if (!loggedIn) return;
    ws.current = new WebSocket("ws://startup.260domain.click/ws"); // use wss:// if HTTPS
    ws.current.onopen = () => {
      console.log("⚡ Connected to WebSocket server");
    };
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data.msg]);
      } catch (err) {
        console.error("Invalid WebSocket message:", event.data);
      }
    };
    ws.current.onclose = () => {
      console.log("🔌 WebSocket disconnected");
    };
    return () => ws.current.close();
  }, [loggedIn]);

  const sendMessage = () => {
    if (input.trim() && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ username, msg: input }));
      setInput("");
    }
  };

  if (!loggedIn) return null;

  return (
    <div className="chat-container mt-4">
      <h3>Live Chat</h3>
      <div
        className="chat-messages mb-2"
        style={{ border: "1px solid #ccc", padding: "10px", maxHeight: "200px", overflowY: "auto" }}
      >
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
