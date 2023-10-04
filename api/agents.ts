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
  
    // Gérer la requête POST pour ajouter un agent
    if (request.method === "POST") {
      const result = await collection.insertOne(request.body);
      return response.status(200).json(result);
    }
  
    // Gérer la requête GET pour récupérer tous les agents
    if (request.method === "GET") {
      const agents = await collection.find().toArray();
      return response.status(200).json(agents);
    }

    // Si la méthode n'est ni POST ni GET
    return response.status(405).json({ message: "Method not allowed" });
    
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
}
