import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import { connectToDB, getDB } from './db.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 4000;

await connectToDB();
const db = getDB();

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const existing = await db.collection('users').findOne({ username });
  if (existing) {
    res.status(409).send({ msg: 'User already exists' });
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ username, password: hashed });
  res.send({ msg: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).send({ msg: 'Invalid credentials' });
    return;
  }
  const sessionId = uuidv4();
  await db.collection('sessions').insertOne({ sessionId, username });
  res.cookie('sessionId', sessionId, { httpOnly: true });
  res.send({ msg: 'Login successful' });
});

app.post('/api/logout', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  await db.collection('sessions').deleteOne({ sessionId });
  res.clearCookie('sessionId');
  res.send({ msg: 'Logged out' });
});

app.get('/api/secret', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = await db.collection('sessions').findOne({ sessionId });
  if (!session) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  res.send({ msg: `Welcome ${session.username}! You found a secret endpoint.` });
});

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    const quote = data[0]?.q + " — " + data[0]?.a;
    res.send({ content: quote });
  } catch (err) {
    console.error(err);
    res.status(500).send({ content: "Pie is awesome!" });
  }
});

app.listen(port, () => console.log(`✅ Listening on port ${port}`));
