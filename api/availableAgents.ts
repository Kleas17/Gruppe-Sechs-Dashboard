import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://Admin:150923@gruppesechs.frktaym.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    await client.connect();
    const db = client.db('Gruppe');
    const collection = db.collection('agents');

    // Récupérer tous les agents sans tenir compte de leur disponibilité
    const agents = await collection.find().toArray();

    return response.json(agents);

  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
}