import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://Admin:150923@gruppesechs.frktaym.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "POST") return response.status(404);
  try {
    await client.connect();
    const db = client.db('Gruppe');
  
    const collection = db.collection('agents');
    const result = await collection.insertOne(request.body);
  
    return response.status(200).json(result);
  }
  catch (err) {
    return response.status(500).json({ message: err.message });
  }
}
