import React, { useState, useEffect, useRef } from 'react';

export default function Home({ loggedIn, setLoggedIn }) {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (loggedIn) {
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      ws.current = new WebSocket(`${protocol}://${window.location.host}/ws`);
      ws.current.onopen = () => console.log('WebSocket connected');
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data.msg]);
      };
      ws.current.onclose = () => console.log('WebSocket disconnected');
      return () => ws.current.close();
    }
  }, [loggedIn]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return alert('Please enter both email and password!');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('email', email);
        setLoggedIn(true);
        alert(`Welcome, ${email}!`);
      } else {
        alert(`Login failed: ${data.msg}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed — check console for details.');
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('email');
    setEmail('');
    setPassword('');
    setLoggedIn(false);
  }

  async function handleRegister() {
    if (!email || !password) return alert('Please enter both email and password!');
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! You can now log in.');
      } else {
        alert(`Registration failed: ${data.msg}`);
      }
    } catch (err) {
      console.error('Register error:', err);
      alert('Registration failed — check console for details.');
    }
  }

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    ws.current.send(JSON.stringify({ username: email, msg: chatInput }));
    setChatInput('');
  };

  return (
    <main className="container text-center">
      <h1 className="mb-3">Welcome to the Pie Vote App</h1>
      <p className="lead mb-4">
        Vote on your favorite pie flavor, see popular flavors, and chat with other pie fans!
      </p>
      {loggedIn ? (
        <>
          <h3>Hi, {email}!</h3>
          <button className="btn btn-secondary mb-3" onClick={handleLogout}>
            Logout
          </button>
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i}>{msg}</div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage} className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="mb-3 input-group">
            <span className="input-group-text">@</span>
            <input
              type="text"
              className="form-control"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text">🔒</span>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button type="button" className="btn btn-success" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
      )}
      <footer className="text-center mt-5 py-3 border-top">
        <span>Created by Jeremiah Barton</span>
        <br />
        <a href="https://github.com/jeremiahu2/startup">GitHub</a>
      </footer>
    </main>
  );
}
