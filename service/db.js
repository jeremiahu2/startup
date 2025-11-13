import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, 'dbConfig.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

let db;

export async function connectToDB() {
  await client.connect();
  db = client.db('260Domain');
  console.log("✅ Connected to MongoDB");
}

export function getDB() {
  return db;
}
