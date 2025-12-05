import React, { useState, useEffect, useRef } from 'react';

export default function Chat({ loggedIn, username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!loggedIn) return;
    if (ws.current) return;

    let isMounted = true;

    const connectWebSocket = () => {
      const socket = new WebSocket('ws://localhost:4000/ws');
      ws.current = socket;
      socket.onopen = () => {
        console.log('✅ WebSocket connected');
      };
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (!isMounted) return;
          if (data.msg) setMessages((prev) => [...prev, data.msg]);
        } catch (err) {
          console.error('WebSocket parse error:', err);
        }
      };
      socket.onerror = (err) => {
        console.error('❌ WebSocket error:', err);
      };
      socket.onclose = (event) => {
        console.log('🔌 WebSocket disconnected');
        ws.current = null;
      };
    };
    connectWebSocket();
    return () => {
      isMounted = false;
      if (ws.current && (ws.current.readyState === WebSocket.OPEN)) {
        ws.current.close();
      }
      ws.current = null;
    };
  }, [loggedIn]);
  const sendMessage = () => {
    if (!input.trim()) return;
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ username, msg: input }));
      setInput('');
    }
  };

  if (!loggedIn) return null;

  return (
    <div className="chat-container mt-4">
      <h3>Live Chat</h3>
      <div
        className="chat-messages mb-2"
        style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '200px', overflowY: 'auto' }}
      >
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
