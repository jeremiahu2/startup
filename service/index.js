import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const users = {};

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
  res.send({ msg: 'Hello from backend!' });
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ msg: 'Missing email or password' });
  }
  if (users[email]) {
    return res.status(400).send({ msg: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = { password: hashedPassword, token: null };
  res.send({ msg: 'Registered successfully!' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ msg: 'Invalid email or password' });
  }
  const token = uuidv4();
  user.token = token;
  res.cookie('token', token, { httpOnly: true });
  res.send({ msg: 'Login successful!' });
});

app.post('/api/logout', (req, res) => {
  const token = req.cookies.token;
  for (const email in users) {
    if (users[email].token === token) {
      users[email].token = null;
      break;
    }
  }
  res.clearCookie('token');
  res.send({ msg: 'Logged out successfully!' });
});

app.get('/api/secret', (req, res) => {
  const token = req.cookies.token;
  const user = Object.values(users).find(u => u.token === token);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  res.send({ msg: 'You accessed a secret endpoint!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
