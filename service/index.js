import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Placeholder Endpoint
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from your startup backend!' });
});

app.listen(port, () => {
  console.log(`Startup service listening on port ${port}`);
});