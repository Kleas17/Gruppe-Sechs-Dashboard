const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Admin:150923@gruppesechs.frktaym.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function addAgent(agent) {
  try {
    await client.connect();
    const db = client.db('Gruppe');
    const collection = db.collection('agents');
    const result = await collection.insertOne(agent);
    console.log(`Agent ajouté avec l'ID: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
document.getElementById('addAgentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const agentName = document.getElementById('agentName').value;
  const LundiDebut = document.getElementById('LundiDebut').value;
  const LundiFin = document.getElementById('LundiFin').value;
  
  const agent = {
    name: agentName,
    monday: {
      start: LundiDebut,
      end: LundiFin
    }
  };
  await addAgent(agent);
});
