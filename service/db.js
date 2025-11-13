import { MongoClient } from 'mongodb';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('dbConfig.json', 'utf8'));
const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

let db;

export async function connectToDB() {
  await client.connect();
  db = client.db('260Domain');
  console.log("Connected to MongoDB");
}

export function getDB() {
  return db;
}
