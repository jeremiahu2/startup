const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = {};
let sessions = {};

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    res.status(409).send({ msg: 'User already exists' });
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  users[username] = hashed;
  res.send({ msg: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const hashed = users[username];
  if (!hashed || !(await bcrypt.compare(password, hashed))) {
    res.status(401).send({ msg: 'Invalid credentials' });
    return;
  }
  const sessionId = uuidv4();
  sessions[sessionId] = username;
  res.cookie('sessionId', sessionId, { httpOnly: true });
  res.send({ msg: 'Login successful' });
});

app.post('/api/logout', (req, res) => {
  const sessionId = req.cookies.sessionId;
  delete sessions[sessionId];
  res.clearCookie('sessionId');
  res.send({ msg: 'Logged out' });
});

app.get('/api/secret', (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId || !sessions[sessionId]) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  res.send({ msg: `Welcome ${sessions[sessionId]}! You found a secret endpoint.` });
});

app.get('/api/quote', async (req, res) => {
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();
  res.send(data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
