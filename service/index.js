import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import { WebSocketServer } from 'ws';
import { connectToDB, getDB } from './db.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

await connectToDB();
const db = getDB();

async function authenticate(req, res, next) {
  try {
    const session = await db.collection('sessions').findOne({ sessionId: req.cookies.sessionId });
    if (!session) return res.status(401).json({ msg: 'Unauthorized' });
    req.username = session.username;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
}

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: 'Username and password required' });
    const existing = await db.collection('users').findOne({ username });
    if (existing) return res.status(409).json({ msg: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ username, password: hashed });
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.collection('users').findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ msg: 'Invalid credentials' });
    const sessionId = uuidv4();
    await db.collection('sessions').insertOne({ sessionId, username, createdAt: new Date() });
    res.cookie('sessionId', sessionId, { httpOnly: true, sameSite: 'strict' });
    res.json({ msg: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

app.post('/api/logout', async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;
    if (sessionId) await db.collection('sessions').deleteOne({ sessionId });
    res.clearCookie('sessionId');
    res.json({ msg: 'Logged out' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    const quote = data[0]?.q + ' — ' + data[0]?.a;
    res.json({ content: quote });
  } catch (err) {
    console.error('Quote fetch error:', err);
    res.status(500).json({ content: 'Pie is awesome!' });
  }
});

app.post('/api/vote', authenticate, async (req, res) => {
  try {
    const { pieFlavor } = req.body;
    if (!pieFlavor) return res.status(400).json({ msg: 'Pie flavor required' });
    await db.collection('votes').deleteMany({ username: req.username });
    await db.collection('votes').insertOne({ username: req.username, pieFlavor, createdAt: new Date() });
    const allVotes = await db.collection('votes').find({}).toArray();
    const voteCounts = allVotes.reduce((acc, vote) => {
      acc[vote.pieFlavor] = (acc[vote.pieFlavor] || 0) + 1;
      return acc;
    }, {});
    broadcast(JSON.stringify({ type: 'votes', data: voteCounts }));
    res.json({ msg: `Voted for ${pieFlavor}` });
  } catch (err) {
    console.error('Vote error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

app.get('/api/votes', async (req, res) => {
  try {
    const allVotes = await db.collection('votes').find({}).toArray();
    const voteCounts = allVotes.reduce((acc, vote) => {
      acc[vote.pieFlavor] = (acc[vote.pieFlavor] || 0) + 1;
      return acc;
    }, {});
    res.json(voteCounts);
  } catch (err) {
    console.error('Error fetching votes:', err);
    res.status(500).json({});
  }
});

const server = app.listen(port, () => console.log(`🚀 HTTP listening on port ${port}`));
const wss = new WebSocketServer({ noServer: true });
const clients = new Set();

function broadcast(msg) {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  }
}

server.on('upgrade', (request, socket, head) => {
  if (request.url === '/ws') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  clients.add(ws);
  console.log('⚡ WebSocket connected');

  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      if (data.msg && data.username) {
        broadcast(JSON.stringify({ msg: `${data.username}: ${data.msg}` }));
      }
    } catch (err) {
      console.error('WebSocket message error:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('🔌 WebSocket disconnected');
  });
  ws.on('error', (err) => console.error('WebSocket error:', err));
});

setInterval(() => {
  for (const ws of clients) {
    if (!ws.isAlive) {
      clients.delete(ws);
      ws.terminate();
      continue;
    }
    ws.isAlive = false;
    ws.ping();
  }
}, 30000);
