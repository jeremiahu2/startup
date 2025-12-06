import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import { WebSocketServer } from 'ws';
import { connectToDB, getDB } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

await connectToDB();
const db = getDB();

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const existing = await db.collection('users').findOne({ username });
  if (existing) return res.status(409).send({ msg: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ username, password: hashed });
  res.send({ msg: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).send({ msg: 'Invalid credentials' });

  const sessionId = uuidv4();
  await db.collection('sessions').insertOne({ sessionId, username, createdAt: new Date() });
  res.cookie('sessionId', sessionId, { httpOnly: true, sameSite: 'strict' });
  res.send({ msg: 'Login successful' });
});

app.post('/api/logout', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) await db.collection('sessions').deleteOne({ sessionId });
  res.clearCookie('sessionId');
  res.send({ msg: 'Logged out' });
});

async function authenticate(req, res, next) {
  const session = await db.collection('sessions').findOne({ sessionId: req.cookies.sessionId });
  if (!session) return res.status(401).send({ msg: 'Unauthorized' });
  req.username = session.username;
  next();
}

app.get('/api/secret', authenticate, (req, res) => {
  res.send({ msg: `Welcome ${req.username}! This is a secret endpoint.` });
});

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    const quote = data[0]?.q + ' — ' + data[0]?.a;
    res.send({ content: quote });
  } catch {
    res.status(500).send({ content: "Pie is awesome!" });
  }
});

app.get('/api/votes', async (req, res) => {
  let votes = await db.collection('votes').findOne({ _id: 'pieVotes' });
  if (!votes) {
    votes = { _id: 'pieVotes', apple: 0, pumpkin: 0, cherry: 0, peach: 0 };
    await db.collection('votes').insertOne(votes);
  }
  res.send({
    apple: votes.apple,
    pumpkin: votes.pumpkin,
    cherry: votes.cherry,
    peach: votes.peach
  });
});

app.post('/api/vote', async (req, res) => {
  const { pieFlavor } = req.body;
  if (!['apple', 'pumpkin', 'cherry', 'peach'].includes(pieFlavor))
    return res.status(400).send({ msg: 'Invalid pie flavor' });

  await db.collection('votes').updateOne(
    { _id: 'pieVotes' },
    { $inc: { [pieFlavor]: 1 } },
    { upsert: true }
  );
  const votes = await db.collection('votes').findOne({ _id: 'pieVotes' });
  broadcast({ type: 'votes', data: votes });
  res.send({ msg: `Your vote for ${pieFlavor} has been counted!` });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.status(404).send({ msg: 'API endpoint not found' });
  }
});

const server = app.listen(port, () => console.log(`🚀 HTTP on ${port}`));
const wss = new WebSocketServer({ noServer: true });
const clients = new Set();

function broadcast(msgObj) {
  const msgStr = JSON.stringify(msgObj);
  clients.forEach(client => {
    if (client.readyState === client.OPEN) client.send(msgStr);
  });
}

server.on('upgrade', (request, socket, head) => {
  if (request.url.startsWith('/ws')) {
    wss.handleUpgrade(request, socket, head, ws => wss.emit('connection', ws, request));
  } else {
    socket.destroy();
  }
});

wss.on('connection', ws => {
  clients.add(ws);
  ws.send(JSON.stringify({ msg: 'Hello from the startup server!' }));
  ws.on('message', data => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.username && parsed.msg) broadcast({ username: parsed.username, msg: parsed.msg });
    } catch {}
  });
  ws.on('close', () => clients.delete(ws));
});
